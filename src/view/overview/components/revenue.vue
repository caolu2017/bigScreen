<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:53:19
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-05 22:27:51
 * @Description: 营业总成本
-->
<script lang="ts">
export default{
    name: 'Revenue'
}
</script>
<script setup lang="ts">
	import { computed, onMounted, watch, ref, toRefs } from 'vue'
	import { Chart } from '@antv/g2'
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

    console.log('ssss', props.height, newValue[0])
    if(!newValue||props.fabu.length==0) return 

    const chart = new Chart({
    container: 'revenue',
    autoFit: true,
    height: props.height,
  });

  console.log('ssss', props.fabu)
    chart.data(props.fabu)
    chart.scale('sales', {
      nice: true,
    });

    chart.appendPadding = 20

    chart.tooltip(false);
    chart.axis('city', {
      label: {
        style: {
          fill: '#FFFFFF',
          opacity: 0.8,
          fontFamily: 'D-DIN',
        }
      },
      grid: {
        line: {
          style: {
            stroke: '#fff',
            opacity: 0,
            lineWidth: 0.5
          }
        }
      },
      tickLine: null,
      line: null,
    });

    chart.axis('value', {
      label: {
        formatter: text => {
          return '';
        }
      },
      grid: {
        line: {
          style: {
            stroke: '#fff',
            opacity: 0,
            lineWidth: 0.5
          }
        }
      }
    })

    chart.legend('type', false);
    chart.coordinate('rect').transpose();
    chart.interaction('active-region');

    chart.interval()
    .adjust('stack')
    .position('city*value')
    .color('type', (v) => {
      if (v === '首都人口') {
        return '#5B8FF9';
      }else {
        return '#5AD8A6';
      }
    })
    .label('value*type', (val, t) => {
    const color = t === '首都人口' ? 'white' : '#47494b';
    // if (val < 0.05) {
    //   return null;
    // }
    return {
      position: 'middle',
      offset: 0,
      content: val*100 + '%',
      style: {
        fontSize: 12,
        fill: color,
        lineWidth: 0,
        stroke: null,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
      },
    };
  });
  chart.removeInteraction('active-region')
    // chart.interaction('active-region');
    chart.render();
  });

	
  const fruits = [
    { name: '去年同期', year: '2022.05', value: 260 },
    { name: '营业总收入', year: '2022.05', value: 100 },
    { name: '去年同期', year: '2022.06', value: 260 },
    { name: '营业总收入', year: '2022.06', value: 100 },
    { name: '去年同期', year: '2022.07', value: 260 },
    { name: '营业总收入', year: '2022.07', value: 100 },
    { name: '去年同期', year: '2022.08', value: 210 },
    { name: '营业总收入', year: '2022.08', value: 150 },
  ];

  const data = [
  { city: 'threeDays', type: '城市人口', value: 0.5 },
  { city: 'threeDays', type: '首都人口', value: 0.83 },
  { city: 'twoDays', type: '首都人口', value: 0.01 },
  { city: 'twoDays', type: '城市人口', value: 0.8 },
  { city: 'oneDays', type: '首都人口', value: 0.02 },
  { city: 'oneDays', type: '城市人口', value: 0.3 },
  { city: 'zeroDays', type: '首都人口', value: 0.08 },
  { city: 'zeroDays', type: '城市人口', value: 0.66 },
];

  onMounted(()=>{
   
  })


</script>

<template>
  <div>
    <chartTitle :title="'派工單完成情況(周)'" />
    <div id="revenue"></div>
  </div>
</template>



<style scoped lang="scss">

</style>