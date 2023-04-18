<script lang="ts">
export default {
  name: "Revenue",
};
</script>
<script setup lang="ts">
import { computed, onMounted, watch, ref, toRefs } from "vue";
import chartTitle from "./chartTitle.vue";
import { Chart } from "@antv/g2";

interface costProps {
  Lingliao: () => [];
  height: number;
}

const props = withDefaults(defineProps<costProps>(), {
  Lingliao: [],
  height: 320,
});

let chart = null;

watch(
  () => [props.height, props.Lingliao],
  (newValue, oldValue) => {
    if (!props.height || props.Lingliao.length == 0) return;

    if (chart) {
      chart.changeData(props.Lingliao);
      return;
    }

    chart = new Chart({
      container: "revenue",
      autoFit: true,
      height: props.height,
    });

    console.log("props.Lingliao", props.Lingliao);
    chart.data(props.Lingliao);
    chart.scale("days", {
      min: 0,
      max: 5,
    });

    chart.appendPadding = 20;
    chart.tooltip(false);

    chart.axis("days", {
      label: {
        formatter: (text) => {
          console.log("text", text);
          if (text == 3 || text == 5) {
            return text;
          }
          return "";
        },
        style: {
          fill: "#FFFFFF",
          fontFamily: "D-DIN",
          fontSize: 16,
          fontWeight: 700,
        },
      },
      grid: {
        line: {
          style: {
            stroke: "#fff",
            opacity: 0.5,
            lineWidth: 0.5,
            lineDash: [5, 5, 5],
          },
        },
      },
    });
    chart.legend(false);
    chart.axis("lineName", {
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

    chart
      .interval()
      .position("lineName*days")
      .color("days", (v) => {
        if (Number(v[1]) >3) {
          return "#C8033E";
        } else {
          return "#039EC8";
        }
      })
      .adjust("stack")
      .label("days", (val, a) => {
        const color = "white";
        return {
          position: 'top',
      content: val,
      offsetY: 10,
      style: {
        fontSize:16,
          fontWeight: 700,
          fontFamily: 'D-DIN',
        fill: color,
      },
        };
      });

    chart.removeInteraction("active-region");

    chart.render();
  }
),
  onMounted(() => {});
</script>

<template>
  <div>
    <chartTitle :title="'库存天数'" />
    <div id="revenue"></div>
  </div>
</template>




