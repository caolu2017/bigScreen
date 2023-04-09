<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:53:19
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-06 17:30:24
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
      position: 'top',
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
        return '#039EC8';
      }else {
        return '#002231';
      }
    })
    .label('value*type', (val, t) => {
    const color = t === '首都人口' ? 'white' : 'transparent';
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
    chart.render();
  });

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