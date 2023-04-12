<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:54:15
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-12 14:05:29
 * @Description: 营业总收入
-->
<script lang="ts">
export default{
  name: 'Cost'
}
</script>
<script setup lang="ts">
	import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
	import chartTitle from './chartTitle.vue'
  	import { Chart } from '@antv/g2'



  interface costProps {
    Lingliao: ()=>[],
    height: number
  }

  const props = withDefaults(defineProps<costProps>(), {
    Lingliao: [],
    height: 320,
  })

  let chart = null

//  var data = [{
//     country: '巴西',
//     population: 18203
//   }, {
//     country: '印尼',
//     population: 23489
//   }, {
//     country: '美国',
//     population: 29034
//   }, {
//     country: '印度',
//     population: 104970
//   }, {
//     country: '中国',
//     population: 131744
//   }];

  watch(() => [props.height, props.Lingliao], (newValue, oldValue) => {
    if(props.Lingliao.length==0)return

    if(chart){
      chart.changeData(props.Lingliao)
      return
    }

    console.log('dddd', props.Lingliao)

    chart = new Chart({
      container: 'container',
      autoFit: true,
      height: props.height,
    });

    chart.source(props.Lingliao);

    chart.scale('rate', {
      min: 0,
      max: 100,
    });
    chart.tooltip(false);
  chart.axis('shipNo', {
    tickLine: null,
  line: null,
    label: {
      formatter: text => {
        return '';
      }
    },
  });
  chart.appendPadding = [20,160,20,20]
  chart.axis('rate', {
    tickLine: null,
  line: null,
    label: {
      formatter: text => {
        return text+'%';
      },
       style: {
      fill: '#FFFFFF',
      fontFamily: 'D-DIN',
      fontSize:16,
      fontWeight:700,
    }
    },
    grid: {
      line: {
        style: {
          stroke: '#C8033E',
          opacity: 1,
          lineWidth: 2,
          lineDash: [5, 5, 5]
        }
      }
    },
  });
  
  chart.coord().transpose();
  chart.interval()
  .position('shipNo*rate')
  .label('rate*shipNo', (val, a) => {
    return {
      position: 'right',
      content: val+'%   ('+a+')',
      autoRotate: false,
      style: {
        fontSize: 14,
        fontWeight: 700,
        fill: '#fff',
        lineWidth: 0,
        stroke: null,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      },
    };
  });
  chart.render();
  })
  onMounted(()=>{
   
    })

    
</script>

<template>
  <div>
    <chartTitle :title="'本周出货订单，入库数达成率'" />
    <div id="container">
      
    </div>
  </div>
  
</template>



<style scoped lang="scss">
.progress{
  height: 100%;
  background: #039EC8;
  padding-left: 10px;
  border-bottom: 1px solid #fff;
}

  :deep(.chart-header){
    margin-bottom: 0;
  }
  :deep(thead th ){
    border-bottom: 0!important;
  }

  :deep(tbody .el-table_1_column_3 .cell){
    padding: 0!important;
  }

  :deep(.el-table tr){
    background-color: transparent!important;
    padding: 0;
    box-sizing: border-box;
  }
  :deep(.el-table tbody tr){
    height: 47px;
    line-height: 47px;
    padding: 0;
    box-sizing: border-box;
  }
  :deep(.el-table tbody td){
    padding: 0!important;
  }

  :deep(tbody .el-table_1_column_4){
    border:0;
  }
  :deep(tbody .el-table_1_column_4 .cell){
    padding: 0!important;
  }
  :deep(.el-table tbody .cell){
    // height: 100%;
    line-height: inherit;
    border-right: 1px solid #fff;
  }

  :deep(.el-table tbody .el-table__cell:last-child .cell){
    // height: 100%;
    // line-height: inherit;
    border-right: 1px solid transparent;
    
  }


  // :deep(.el-table tbody .el-table__cell:not(:last-childs)){
  //   // height: 100%;
  //   // line-height: inherit;
  //   border-right: 1px solid #fff;
    
  // }
  :deep(.el-table thead .cell){
    font-size: 18px;
  }
  :deep(.el-table){
    background-color: transparent!important;
  }

  :deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell){
      background-color: transparent!important;
  }

  :deep(.el-table thead th:not(:last-child) .cell){
    border-right:1px solid #fff;
  }




  :deep(.el-table .el-table__cell){
    font-weight: bolder!important;;
    font-size: 16px;
    color: #fff;
  }

  #container{
    width: 100%;
    overflow: hidden;

    .table-header{
      background: rgba(250, 250, 250, 0.3);
      height: 47px;
      display: flex;
      align-items: center;

      span{
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        padding-left: 8px;
        box-sizing: border-box;

        &.no{
          width: 69px;
        }

      }
    }
  }

  :deep(.el-progress__text span){
    color: #fff;
  }

  div::-webkit-scrollbar {
    width: 4px;
  }
  div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    opacity: 0.2;
    background: fade(#039EC8, 60%);
  }
  div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    border-radius: 0;
    background: fade(#039EC8, 30%);
  }
</style>