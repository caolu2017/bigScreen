<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:53:19
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-12 16:34:25
 * @Description: 利润总额
-->
<script lang="ts">
export default {
  name: "Profit",
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

const fruits = [
  { year: "2022.05", value: 260 },
  { year: "2022.06", value: 210 },
  { year: "2022.07", value: 160 },
  { year: "2022.08", value: 60 },
  { year: "2022.09", value: 160 },
];

let chart = null;

watch(
  () => [props.height, props.tableData],
  (newValue, oldValue) => {
    if (!props.height || props.tableData.length == 0) return;

    if (chart) {
      chart.changeData(props.tableData);
      return;
    }

    chart = new Chart({
      container: "profit",
      autoFit: true,
      height: props.height,
    });
    chart.data(props.tableData);
    chart.scale("actualQty", {
      min: 0,
      max: props.tableData[0].qty,
    });
    chart.scale("qty", {
      min: 0,
      max: props.tableData[0].qty,
    });
    chart.appendPadding = 20;
    chart.tooltip(false);

    chart.axis("actualQty", {
      label: {
        formatter: (text) => {
          return "";
        },
      },
      grid: {
        line: {
          style: {
            stroke: "#fff",
            lineWidth: 0.5,
          },
        },
      },
    });
    chart.legend(false);
    chart.axis("qty", {
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
      .line()
      .position("lineName*actualQty")

      .color("#18BF3B")
      .adjust("stack")
      .label("actualQty", (val, a) => {
        const color = "white";
        return {
          position: "top",
          content: val,
          autoRotate: false,
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

    chart.removeInteraction("active-region");

    chart.render();
  }
),
  onMounted(() => {});
</script>

<template>
  <div style="position: relative">
    <chartTitle :title="'已派工，尚未完成清单与进度'" />
    <div id="profit"></div>
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