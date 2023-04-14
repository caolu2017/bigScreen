<script lang="ts">
export default {
  name: "Cost",
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
      container: "cost",
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
        if (Number(v[1]) < 3) {
          return "#C8033E";
        } else {
          return "#EBAF00";
        }
      })
      .adjust("stack")
      .label("styleNo", (val, a) => {
        const color = "white";
        return {
          position: "middle",
          content: val,
          autoRotate: false,
          rotate: 45,
          style: {
            fontSize: 12,
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
  <div>
    <chartTitle :title="'配套低于3天线别'" />
    <div id="cost"></div>
  </div>
</template>




