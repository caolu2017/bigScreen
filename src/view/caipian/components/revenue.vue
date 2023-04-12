<script lang="ts">
export default {
  name: "Revenue",
};
</script>
<script setup lang="ts">
import { computed, onMounted, watch, ref, toRefs } from "vue";
import { Chart } from "@antv/g2";
import chartTitle from "./chartTitle.vue";

interface costProps {
  height: number;
  fabu: () => {};
}

const props = withDefaults(defineProps<costProps>(), {
  height: 320,
});

const propsHeight = ref(0);

let chart = null;

watch(
  () => [props.height, props.fabu],
  (newValue, oldValue) => {
    propsHeight.value = newValue[0];

    console.log("ssss", props.height, newValue[0]);
    if (!newValue || props.fabu.length == 0) return;

    if (chart) {
      chart.changeData(props.fabu);
      return;
    }

    chart = new Chart({
      container: "revenue",
      autoFit: true,
      height: props.height - 80,
    });

    console.log("ssssfabu", props.fabu);
    chart.data(props.fabu);
    chart.tooltip(false);
    chart.coordinate("theta", {
      radius: 1,
    });

    chart
      .interval()
      .adjust("stack")
      .position("value")
      .color("city", ["#039EC8", "#EBAF00", "#FF7500", "#C8033E"])
      .label("value", (val, t) => {
        return {
          offset: -30,
          content: (val * 100).toFixed() + "%",
          style: {
            fontSize: 20,
            fontWeight: 500,
            fill: "#fff",
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)",
          },
        };
      });

    chart.legend("city", {
      position: "right",
      // offsetX: -80,
      // offsetY: 16,
      itemName: {
        style: (item, index: number, items) => {
          return {
            fill: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 20,
          };
        },
      },
    });
    chart.removeInteraction("active-region");
    chart.render();
  }
);

onMounted(() => {});
</script>

<template>
  <div>
    <chartTitle :title="'物流运送效率'" />
    <div class="tabs-box">
      <div class="tabs">
        <p>{{ "< 10 minute:" }} <span>{{props.fabu.lessthanten}}次</span></p>
        <p>{{ "> 10 minute:" }} <span>{{ props.fabu.graterthanten }}次</span></p>
        <p>{{ "< 10 minute:" }} <span>100次</span></p>
        <p>{{ "< 10 minute:" }} <span>100次</span></p>
      </div>
      <div id="revenue"></div>
    </div>
  </div>
</template>



<style scoped lang="scss">
.tabs-box {
  display: flex;
  align-items: flex-start;
  padding: 32px 32px;
}

#revenue {
  flex: 1;
  position: relative;
  left: -80px;
}
.tabs {
  background: #003246;
  border-radius: 12px;
  padding: 24px 30px;
  width: 266px;
  color: #fff;
  box-sizing: border-box;

  p {
    justify-content: space-between;
  }

  p:not(:last-child) {
    margin-bottom: 18px;
    display: flex;
  }
  // position: relative;
  // top: 40px;
  // left: 20px;
}
</style>