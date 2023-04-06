<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-09 16:13:50
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-01-12 09:05:42
 * @Description: 基础线
-->

<script lang="ts">
export default{
  name: 'BaseLine'
}
</script>
<template>
   <div class="base-line">
      <img class="bigDiamond" src="../assets/img/bigDiamond.svg" alt="">
      <div class="line" />
      <img class="diamond" src="../assets/img/diamond.svg" alt="">
    </div>
</template>

<style lang="scss" scoped>
 .base-line{
    display: flex;
    right: 12px;
    align-items: baseline;

    .line{
      flex: 1;
      height: 1px;
      background:#19fcde;
      opacity: 0.2;
      margin: 0 2px;
    }
  }
</style>