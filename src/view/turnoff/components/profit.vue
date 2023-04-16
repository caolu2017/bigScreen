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

  let chart = null
  let view2 = null

  watch(() => [props.height, props.tableData], (newValue, oldValue) => {
    if(!props.height||props.tableData.length==0) return
    const ds = props.tableData.filter(i=>i.type!='a').map(i=>({...i, rate: i.rate==0?null:i.rate}))
    chart&&chart.destroy()
    
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
    chart.legend(false)
   
    chart.tooltip({
      shared: true,
      showMarkers: false,
    });
  chart
  .interval()
  .position('wk*rate')
  .color('type', (t)=>{
    if(t=='a'){
      return '#052735'
    }else{
      return t
    }
  })
  // .color('type', ['#039EC8', '#FFD9BF'])
  
  .label('rate', (val) => {
    return {
      position: 'middle',
      offset: 0,
      content: (originData) => {
        return originData.type!='a'?(originData.rate? originData.rate+ '%':''):'';
      },
      style: {
        fill: '#fff',
        fontSize: 16,
        fontWeight: 500,
      }
    };
  });

 

  view2 = chart.createView();
  view2.axis(false);
  view2.data(ds);
  view2
    .line()
    .position('wk*rate')
    .style({
      stroke: '#fff',
    })

  chart.tooltip(false);
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