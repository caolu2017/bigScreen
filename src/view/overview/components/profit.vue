<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:53:19
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-06 11:00:25
 * @Description: 利润总额
-->
<script lang="ts">
  export default{
    name: 'Profit'
  }
</script>
<script setup lang="ts">
	import { computed, onMounted, reactive, ref, watch } from 'vue'
	import chartTitle from './chartTitle.vue'
	import { Chart } from '@antv/g2'

	interface costProps {
    height: number,
    tableData: ()=>[]
  }

  const props = withDefaults(defineProps<costProps>(), {
    height: 320,
  })

  const fruits = [
    {year: '2022.05', value: 260 },
    { year: '2022.06', value: 210 },
    { year: '2022.07', value: 160 },
    { year: '2022.08', value: 60 },
    {  year: '2022.09', value: 160 },
  ];

  watch(() => [props.height, props.tableData], (newValue, oldValue) => {
    if(!props.height||props.tableData.length==0) return
    const chart = new Chart({
      container: 'profit',
      autoFit: true,
      height: props.height,
    });
    chart.data(props.tableData)
    chart.scale('sales', {
      nice: true,
    });
    chart.appendPadding = 20
    chart.tooltip(false);

    // chart.legend('name', false)

    chart.axis('actualQty', {
      label: {
        formatter: text => {
          return '';
        }
      },
      grid: {
        line: {
          style: {
            stroke: '#fff',
            opacity: 0.5,
            lineWidth: 0.5
          }
        }
      }
    })

    chart.axis('lineName', {
      label: {
        style: {
          fill: '#FFFFFF',
          opacity: 0.8,
          fontFamily: 'D-DIN',
        }
      },
    })

    chart.interval()
    .position('styleNo*actualQty')
    .color('#5AD8A6')
    .adjust([
      {
        type: 'dodge',
        marginRatio: 0.05,
      },
    ])
    .label('actualQty*styleNo', (val, t) => {
    const color = 'white';
    return {
      position: 'top',
      offset: 0,
      content: val,
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

//   chart.tooltip({
//                 showCrosshairs: true, // 展示 Tooltip 辅助线
//                 shared: true,
//                 showMarkers: true,
//                 itemTpl: `
//                     <div style="margin-bottom: 10px;list-style:none;">
//                     <span style="background-color:{color};" class="g2-tooltip-marker"></span>
//                     進度: {value}
//                     </div>
//                 ` // 自定义 toolTip 样式
// });
    // chart.interaction('active-region');
    chart.removeInteraction('active-region')
    chart.render();
  }),

  onMounted(()=>{
   
  })


</script>

<template>
  <div>
    <chartTitle :title="'已派工，尚未完成清單與進度'" />
    <div id="profit"></div>
  </div>
</template>



<style scoped>
  
</style>