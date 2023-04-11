<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:53:19
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-11 14:57:42
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

  let chart = null

  watch(() => [props.height, props.tableData], (newValue, oldValue) => {
    if(!props.height||props.tableData.length==0) return

     if(chart){
      chart.changeData(props.tableData)
      return
    }
    
     chart = new Chart({
      container: 'profit',
      autoFit: true,
      height: props.height,
    });

    chart.appendPadding = 20
    chart.scale('sumRate', {
      min: 0,
      max: 1,
    });
    chart.scale('rate', {
      min: 0,
      max: 100,
    });

    chart.data(props.tableData);
    chart.axis('rate', false);
    chart.axis('sumRate', false);
    chart.axis('wk', {
      label: {
        style: {
          fill: '#FFFFFF',
          opacity: 1,
          fontSize:16,
          fontWeight: 700,
          fontFamily: 'D-DIN',
        }
      }
    });
    chart.legend({
      position: 'right-top',
      offsetY: 20,
      custom: true,
      items: [{id:0, name:'当周达成率',marker:{symbol:'square', style:{fill: '#039EC8'}}},
      {id:1, name:'累積件數達成率',marker:{symbol:'square', style:{fill: '#fff'}}}],
      itemName: {
        style: (item, index: number, items)=>{
          return {
            fill: '#fff',
            fontWeight: 700,
            cursor:'pointer',
            fontSize:  14,
          }

        }
      },
    })
    chart.tooltip({
      shared: true,
      showMarkers: false,
    });
  chart
  .interval()
  .position('wk*rate')
  .color('type', (t)=>{
    if(t=='b'){
      return '#039EC8'
    }else{
      return '#FFD9BF'
    }
  })
  // .color('type', ['#039EC8', '#FFD9BF'])
  
  .label('rate', (val) => {
    return {
      position: 'middle',
      offset: 0,
      content: (originData) => {
        return originData.type=='b'?originData.rate + '%':'';
      },
      style: {
        fill: '#fff',
        fontSize: 16,
        fontWeight: 500,
      }
    };
  });

  chart.line()
  .position('wk*sumRate')
  .color('#FF7500')
  .label('rate', (val) => {
    return {
      position: 'middle',
      offset: 0,
      content: (originData) => {
        return originData.type=='b'?(originData.sumRate*100) + '%':'';
      },
      style: {
        fill: '#fff',
        fontSize: 16,
        fontWeight: 500,
      }
    };
  });
  chart.removeInteraction('active-region')

  chart.render();
  }),

  onMounted(()=>{
   
  })


</script>

<template>
  <div style="position: relative;" >
    <chartTitle :title="'本月入库数累积达成率（By Week）'" />
    <div id="profit"></div>
  </div>
</template>



<style scoped>

.line{
  height: 1px;
  border-bottom: 1px dotted red;
  color: red;
  position: absolute;
  top: 75px;
  left: 30px;
  right: 20px;
  line-height: 5px;
}
  
</style>