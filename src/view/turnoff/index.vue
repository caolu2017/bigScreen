<script lang="ts">
  export default {
    name: 'industryOverview'
  }
</script>
<script setup lang="ts">
	import { computed, initCustomFormatter, onMounted, watch, ref,  } from 'vue'
  import Profit from './components/profit.vue'
	import Revenue from './components/revenue.vue'
	import Cost from './components/cost.vue'
	import Liabilities from './components/liabilities.vue'
  import axios from 'axios'
  import { dataFormatter } from './utils'
  import { pxtorem } from './utils'
import { GetCpcShipRateOfMonth, GetFlPgLessthan3dByLine, GetFlFaliaoProgress, GetFlMaterialPlan } from '../../../api/index'

  const card = ref(null)
  const height = ref(0)
  const fabu = ref([])
  const tableData = ref([])
  const Lingliao = ref([])
  const profit = ref([])


  onMounted(()=>{
    height.value = card.value.$el.clientHeight -40

    _GetCpcShipRateOfMonth()
    // _GetFlPgLessthan3dByLine()
    // _GetFlFaliaoProgress()
    // _GetFlMaterialPlan()
  })

  const _GetCpcShipRateOfMonth=()=> {
    GetCpcShipRateOfMonth().then(res=>{
      console.log('resss', res)
      fabu.value = res
    })
  }

  const _GetFlPgLessthan3dByLine =()=>{
    GetFlPgLessthan3dByLine().then(res=>{
      console.log('ccc', res)
      Lingliao.value = res
    })
  }
  const _GetFlFaliaoProgress =()=>{
    GetFlFaliaoProgress().then(res=>{
      
      profit.value = res.map(r=>{
        console.log('ddfdf', r)
        const v = ((r.actualQty*100)/r.qty).toFixed()
        let c = ''
        if (v-80<=0) {
          c= '#C8033E';
        }else if(v-90>=0){
          c= '#039EC8';
        }else {
          c= '#EBAF00';
        }

        return{
        ...r, 
        color: c
      }})
    })
  }
  const _GetFlMaterialPlan =()=>{
    GetFlMaterialPlan().then(res=>{
      console.log('ggg', res)
      tableData.value = res
    })
  }

</script>

<template>
  <div class="wrapper">
    <div class="container">
    <div class="inner" ref='inner'>
      <div ref="top">
        <div class="top">
          <div class="part">
            <!-- <div class="cn">SAC DASHBOARD</div> -->
          </div>
        </div>
        <!-- <img class="top-img" src="@/assets/img/sss.svg" alt=""> -->
      </div>
      

      <div class="charts-part" >
        <div class="row">
          <Revenue 
          ref="card"
          :height="height"
          class="item canvas"
          :fabu="fabu"  />
          <Cost class="item table" :Lingliao="Lingliao" :height="height" />
        </div>
        
        <div class="row">
          <Profit class="item canvas" :height="height" :tableData="profit"/>
          <Liabilities class="item table" :tableData="tableData"  />
        </div>
      </div>
    </div>

  </div>
  </div>
 

	
</template>

<style scoped lang="scss">
  @import "./index";
  
</style>