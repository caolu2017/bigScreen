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

  let chart = null


  watch(() => [props.height, props.fabu], (newValue, oldValue) => {
    propsHeight.value = newValue[0]

    console.log('ssssprops.fabu', props.fabu)
    if(!newValue||props.fabu.length==0) return 

    if(chart){
      chart.changeData(props.fabu)
      return
    }
    
     chart = new Chart({
      container: 'revenue',
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

    chart.data(props.fabu);
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
      {id:1, name:'累积件数达成率',marker:{symbol:'square', style:{fill: '#FF7500'}}}],
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
        return originData.type=='b'?originData.rate?(originData.rate + '%'):'':'';
      },
      style: {
        fill: '#fff',
        fontSize: 16,
        fontWeight: 500,
      }
    };
  });

  const ds = props.fabu.filter(i=>i.type=='b')

const view2 = chart.createView();
view2.axis(false);
view2.data(ds);
view2.line()
  .position('wk*sumRate')
  .color('#FF7500')
  .label('rate', (val) => {
    return {
      position: 'top',
      offsetY: -10,
      content: (originData) => {
        return originData.type=='b'?(originData.sumRate?(originData.sumRate*100) + '%':''):'';
      },
      style: {
        fill: '#fff',
        fontSize: 16,
        fontWeight: 500,
      }
    };
  });
  view2.legend(false)
  chart.tooltip(false);
  chart.removeInteraction('active-region')

  chart.render();
  });

  onMounted(()=>{
   
  })


</script>

<template>
  <div>
    <chartTitle :title="'本月出货累积达成率（By Week）'" />
    <div id="revenue"></div>
  </div>
</template>



<style scoped lang="scss">

</style>