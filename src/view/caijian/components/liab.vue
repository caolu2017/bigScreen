<script lang="ts">
export default {
  name: "Lib",
};
</script>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import chartTitle from "./chartTitle.vue";
import { Chart } from "@antv/g2";

interface costProps {
  height: number;
  tableData: () => [];
}

const props = withDefaults(defineProps<costProps>(), {
  height: 320,
});

let chart = null;

watch(
  () => [props.height, props.tableData],
  (newValue, oldValue) => {
    if (!props.height || props.tableData.length == 0) return;

    chart&&chart.destroy()

    chart = new Chart({
      container: "liab",
      autoFit: true,
      height: props.height,
    });

    chart.data(props.tableData);
    chart.scale("rate", {
      min: 0,
      max: props.tableData[props.tableData.length-1].rate,
    });
    
    chart.appendPadding = [10, 30, 10, 10];
    chart.tooltip(false);

    chart.axis("rate", {
       tickLine: null,
  line: null,
      label: {
        formatter: (text) => {
          return "";
        },
      },
      grid: {
        line: {
          style: {
            stroke: "#fff",
            lineWidth: 0,
          },
        },
      },
    });
    chart.legend(false);
    chart.axis("fabrics", {
       tickLine: null,
  line: null,
      label: {
        formatter: (text) => {
          return "";
        },
      },
      grid: {
        line: {
          style: {
            opacity: 0,
          },
        },
      },
    });

    chart.axis("wk", {
      label: {
        style: {
          fill: "#FFFFFF",
          opacity: 1,
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "D-DIN",
        },
      },
    });

      chart.coordinate().transpose()
      chart.interval().position("fabrics*rate")
      .color("#C8033E")
      .label("fabrics", (val, a) => {
        const color = "white";
        return {
          position: "middle",
          content: val,
          style: {
            fontSize: 14,
            fontWeight: 700,
            fill: color,
            lineWidth: 0,
            stroke: null,
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)",
          },
        };
      });

    props.tableData.forEach((item) => {
      const t= item.rate +'%'
      chart
        .annotation()
        .text({
          position: [item.fabrics, item.rate],
          content: t,
          style: {
            textAlign: 'center',
            fontSize: 14,
            stroke: '#fff',
            fontWeight: 700,
            fill: '#fff'
          },
          offsetX: 15,
        })
    });

    chart.removeInteraction("active-region");

    chart.render();
  }
),
  onMounted(() => {});
</script>

<template>
  <div style="position: relative">
    <chartTitle :title="'布种不良率'" />
    <div id="liab"></div>
  </div>
</template>



<style scoped>
.line {
  height: 1px;
  border-bottom: 1px dotted red;
  color: red;
  position: absolute;
  top: 75px;
  left: 30px;
  right: 20px;
  line-height: 5px;
}
</style>