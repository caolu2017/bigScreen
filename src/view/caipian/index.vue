<script lang="ts">
export default {
  name: "industryOverview",
};
</script>
<script setup lang="ts">
import {
  computed,
  initCustomFormatter,
  onMounted,
  watch,
  ref,
  onUnmounted,
} from "vue";
import Profit from "./components/profit.vue";
import Revenue from "./components/revenue.vue";
import Cost from "./components/cost.vue";
import Liabilities from "./components/liabilities.vue";
import axios from "axios";
import { dataFormatter } from "./utils";
import { pxtorem } from "./utils";
import {
  GetWlTask,
  GetWlInv,
  GetLessthan3d,
  GetEffCounts,
} from "../../../api/index";

const card = ref(null);
const height = ref(0);
const fabu = ref([]);
const tableData = ref([]);
const Lingliao = ref([]);
const revenue = ref([]);
const revenueList = ref([]);
let intervalID = null;

onMounted(() => {
  height.value = card.value.$el.clientHeight - 40;
  console.log('card', card.value.$el.clientHeight)
  _GetWlTask();
  _GetLessthan3d();
  _GetWlInv();
  _GetEffCounts();

  intervalID = setInterval(function () {
    _GetWlTask();
    _GetLessthan3d();
    _GetWlInv();
    _GetEffCounts();
  }, 120000);
});

onUnmounted(() => {
  clearInterval(intervalID);
  intervalID = null;
});

const _GetWlTask = () => {
  GetWlTask().then((res) => {
    fabu.value = res.concat([{}, {}, {}, {}, {}, {}]).slice(0, 6);
  });
};

const _GetLessthan3d = () => {
  GetLessthan3d().then((res) => {
    Lingliao.value = res;
  });
};
const _GetWlInv = () => {
  GetWlInv().then((res) => {
    tableData.value = res.concat([{}, {}, {}, {}, {}, {}]).slice(0, 6);
  });
};
const _GetEffCounts = () => {
  GetEffCounts().then((res) => {
    revenue.value = res;
    const arr = [];
    for (let i in res) {
      arr.push({ value: res[i], city: getfilter(i, res) });
    }
    revenueList.value = arr;
    console.log("bbbbbbbbb", revenue.value, arr);
  });
};

const getfilter = (i, res) => {
  console.log("haha", i, res);
  if (i == "lessthanten") {
    return "< 10 分钟";
  } else if (i == "graterthanten") {
    return "> 10 分钟";
  } else if (i == "granterthan60") {
    return "> 60 分钟";
  } else if (i == "granterthan30") {
    return "> 30 分钟";
  }
};
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="inner" ref="inner">
        <div ref="top">
          <div class="top">
            <div class="part">
              <!-- <div class="cn">SAC DASHBOARD</div> -->
            </div>
          </div>
          <!-- <img class="top-img" src="@/assets/img/sss.svg" alt=""> -->
        </div>

        <div class="charts-part">
          <div class="row">
            <Liabilities class="item" :tableData="fabu" :height="height" />
            <Cost ref="card" class="item table" :Lingliao="Lingliao" :height="height" />
          </div>

          <div class="row">
            <Profit
              class="item canvas"
              :height="height"
              :tableData="tableData"
            />
            <Revenue
              :height="height"
              class="item table"
              :fabu="revenue"
              :revenueList="revenueList"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./index";
</style>