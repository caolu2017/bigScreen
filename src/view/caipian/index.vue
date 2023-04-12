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
const profit = ref([]);
let intervalID = null;

onMounted(() => {
  height.value = card.value.$el.clientHeight - 40;
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
    fabu.value = res;
  });
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
            <Liabilities class="item" :tableData="fabu" />

            <Cost class="item table" :Lingliao="Lingliao" :height="height" />
          </div>

          <div class="row">
            <Profit
              class="item canvas"
              :height="height"
              :tableData="tableData"
            />
            <Revenue
              ref="card"
              :height="height"
              class="item table"
              :fabu="fabu"
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