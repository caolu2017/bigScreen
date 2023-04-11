<script lang="ts">
export default{
    name: 'Revenue'
}
</script>
<script setup lang="ts">
	import { computed, onMounted, watch, ref, toRefs } from 'vue'
  import { Pie } from '@antv/g2plot';
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

    const chart = new Pie('revenue', {
      data: props.fabu,
      angleField: 'value',
      radius: 0.8,
      label: {
        type: 'inner',
        offset: '-50%',
        formatter: ({value}) => (value*100).toFixed()+'%',
        style: {
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 500,
          color: '#fff'
        },
      },
      colorField: 'city', // 部分图表使用 seriesField
      color: ({ city }) => {
        if(city == ' 当天'){
          return '#039EC8';
        }else if(city == '+1天'){
          return '#EBAF00';
        }else if(city == '+2天'){
          return '#FF7500';
        }else if(city == '+3天'){
          return '#C8033E';
        }
      },
      legend: {
        position: 'right',
        offsetX: -80,
        itemName: {
          style: {
            fontSize:  20,
            fill: '#fff',
            fontWeight: 700,
          },
          
        }
      },
      tooltip: false,
      pieStyle: {
        lineWidth: 0,
      },
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          content: 'AntV\nG2Plot',
        },
      },
    });

    chart.render();
  });

  onMounted(()=>{
   
  })


</script>

<template>
  <div>
    <chartTitle :title="'已派工，配套完成情況'" />
    <div id="revenue" :style="{'height':height-20+'px'}"></div>
  </div>
</template>



<style scoped lang="scss">

</style>