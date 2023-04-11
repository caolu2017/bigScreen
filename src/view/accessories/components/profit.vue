<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:53:19
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-11 15:38:06
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

  let chart =null

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
    
    chart.data(props.tableData)
    chart.scale('actualQty', {
        min: 0,
        max: props.tableData[0].qty,
    });
    chart.scale('qty', {
        min: 0,
        max: props.tableData[0].qty,
    });
    chart.appendPadding = 20
    chart.tooltip(false);

    console.log('fffaaa', props.tableData[0].qty)

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
            lineWidth: 0.5,
          }
        }
      }
    })
    chart.legend(false)
    chart.axis('qty', {
      label: {
        formatter: text => {
          return '';
        }
      },
      grid: {
        line: {
          style: {
            opacity: 0,
          }
        }
      }
    })

    chart.axis('lineName', {
      label: {
        style: {
          fill: '#FFFFFF',
          opacity: 1,
          fontSize:16,
          fontWeight: 700,
          fontFamily: 'D-DIN',
        }
      },
    })
    
    chart.interval()
    .position('lineName*actualQty')

    .color('color', v => {
      return v;
    })
    .adjust('stack')
    .label('styleNo', (val, a) => {
    const color = 'white';
    return {
      position: 'middle',
      // offset: 0,
      content: val,
      autoRotate: false,
      rotate: 45,
      style: {
        fontSize: 14,
        fontWeight: 700,
        fill: color,
        lineWidth: 0,
        stroke: null,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
      },
    };

    
  });

    chart.removeInteraction('active-region')


    props.tableData.forEach((item) => {
      const t= ((item.actualQty*100)/item.qty).toFixed()+'%'
      chart
        .annotation()
        .text({
          position: [item.lineName, item.actualQty],
          content: t,
          style: {
            textAlign: 'center',
            fontSize: 14,
            stroke: '#fff',
            fontWeight: 700,
            fill: '#fff'
          },
          offsetY: -10,
        })
    });


    chart.render();
  }),

  onMounted(()=>{
   
  })


</script>

<template>
  <div style="position: relative;" >
    <chartTitle :title="'已派工，尚未完成清单与进度'" />
    <div class="line">100%</div>
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