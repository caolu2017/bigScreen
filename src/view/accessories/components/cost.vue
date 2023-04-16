<script lang="ts">
export default{
  name: 'Cost'
}
</script>
<script setup lang="ts">
	import { computed, onMounted, watch, ref, toRefs } from 'vue'
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

  let chart =null

 
  watch(() => [props.height, props.Lingliao], (newValue, oldValue) => {
    if(!props.height||props.Lingliao.length==0) return
    
    if(chart){
      chart.changeData(props.Lingliao)
      return
    }
    
    chart = new Chart({
      container: 'cost',
      autoFit: true,
      height: props.height,
    });


    console.log('props.Lingliao', props.Lingliao)
    chart.data(props.Lingliao)
    chart.scale('days', {
      min: 0,
      max: 5,
    });

    chart.appendPadding = 20
    chart.tooltip(false);

    chart.axis('days', {
      label: {
        formatter: text => {
          console.log('text', text)
          if(text==3||text==5){
            return text
          }
          return '';
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
            stroke: '#fff',
            opacity: 0.5,
            lineWidth: 0.5,
            lineDash: [5, 5, 5]
          }
        }
      }
    })
    chart.legend(false)
    chart.axis('lineName', {
      label: {
        style: {
          fill: '#FFFFFF',
          opacity: 1,
          fontSize:16,
          fontWeight:700,
          fontFamily: 'D-DIN',
        }
      },
    })
    
    chart.interval()
    .position('lineName*days')
    .color('days', v => {
      if(Number(v[1])<=3){
        return '#C8033E';
      }else{
        return '#039EC8';
      }
      
    })
    .adjust('stack')
    .label('styleNo', (val, a) => {
    const color = 'white';
    return {
      position: 'middle',
      content: val,
      autoRotate: false,
      rotate: 45,
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
  }),

  onMounted(()=>{
   
  })
</script>

<template>
  <div>
    <chartTitle :title="'配套低于3天线别'" />
    <div id="cost"></div>
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
    font-weight: bold;
    font-size: 16px;
    color: #fff;
  }

  #container{
    width: 100%;
    overflow: auto;

    .table-header{
      background: rgba(250, 250, 250, 0.3);
      height: 47px;
      display: flex;
      align-items: center;

      span{
        font-weight: bold;
        font-size: 20px;
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
    font-weight: bold;
        font-size: 16px;
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