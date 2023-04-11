<script lang="ts">
export default{
    name: 'Revenue'
}
</script>
<script setup lang="ts">
	import { computed, onMounted, watch, ref, toRefs } from 'vue'
  import { Chart } from '@antv/g2';
  import chartTitle from './chartTitle.vue'

  interface costProps {
    height: number,
    fabu: ()=>[]
  }

  const props = withDefaults(defineProps<costProps>(), {
    height: 320,
  })

  const propsHeight = ref(0)

  watch(() => [props.height, props.fabu], (newValue, oldValue) => {
    propsHeight.value = newValue[0]

    console.log('ssss', props.height, props.fabu)
    if(!newValue||props.fabu.length==0) return 

    const chart = new Chart({
      container: 'revenue',
      autoFit: true,
      height: newValue[0],
    });
    chart.data(props.fabu);
    
    chart.scale('rate',{
        min: 0,
        max: 100,
        formatter(val) {
          return '';
        },
    });

    chart
    .interval()
    .position('wk*rate')
    // .color('country')
    .adjust('stack');
      chart.render();
    });

  onMounted(()=>{
   
  })


</script>

<template>
  <div>
    <chartTitle :title="'本月出貨累積達成率(By Week)'" />
    <div id="revenue" :style="{'height':height-20+'px'}"></div>
  </div>
</template>



<style scoped lang="scss">

</style>