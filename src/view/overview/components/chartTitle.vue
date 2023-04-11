<script lang="ts">
export default{
  name: 'chartTitle'
}
</script>
<script setup lang="ts">
  interface titleProps {
    title: string
  }

  const props = defineProps<titleProps>()
</script>

<template>
  <div class="chart-header">
    <img src="../../../assets/img/tag.svg" />
    {{props.title}}
    <BaseLine class="line" />
  </div>
</template>

<style scoped lang="scss">
  .chart-header {
    background: rgba(0,0,0, 0.4);
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    position: relative;
    margin-bottom: 10px;
    
    img{
      vertical-align: bottom;
      display: inline-block;
      height: 44px;
    }

    .line{
      position: absolute;
      left: 12px;
      bottom: 0;
    }
   
  }
</style>