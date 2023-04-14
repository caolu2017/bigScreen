<script lang="ts">
  export default {
    name: 'industryOverview'
  }
</script>
<script setup lang="ts">
	import { computed, initCustomFormatter, onMounted, onUnmounted, ref,  } from 'vue'
  import Profit from './components/profit.vue'
	import Revenue from './components/revenue.vue'
	import Cost from './components/cost.vue'
	import Liabilities from './components/liabilities.vue'
  import axios from 'axios'
  import { dataFormatter } from './utils'
  import { pxtorem } from './utils'
import { GetCpcShipRateOfMonth, GetShipRateOfWeek, GetCpcWarehouseRateOfMonth, GetShipDiffDetailOfWeek } from '../../../api/index'

  const card = ref(null)
  const height = ref(0)
  const fabu = ref([])
  const tableData = ref([])
  const Lingliao = ref([])
  const profit = ref([])

  let intervalID = null


  onMounted(()=>{
    height.value = card.value.$el.clientHeight -40

    _GetCpcShipRateOfMonth()
    _GetShipRateOfWeek()
    _GetCpcWarehouseRateOfMonth()
    _GetShipDiffDetailOfWeek()

    intervalID = setInterval(function(){
      _GetCpcShipRateOfMonth()
      _GetShipRateOfWeek()
      _GetCpcWarehouseRateOfMonth()
      _GetShipDiffDetailOfWeek()
    }, 120000)
  })

  onUnmounted(()=>{
    clearInterval(intervalID)
    intervalID = null
  })




  const _GetCpcShipRateOfMonth=()=> {
    GetCpcShipRateOfMonth().then(res=>{
      console.log('resss', res)
      const arr = []
      
      res.forEach((i, wk)=>{
        arr.push(
          {
          ...i, 
          rate: 100, 
          type: 'a', 
          },
          {...i,type:'b' ,rate:Number(i.rate), sumRate: Number(i.sumRate)},
          
        )
      })

      fabu.value = arr

    })
  }

  const _GetShipRateOfWeek =()=>{
    GetShipRateOfWeek().then(res=>{
      console.log('ccc', res)
      Lingliao.value = res
    })
  }
  const _GetCpcWarehouseRateOfMonth =()=>{
    GetCpcWarehouseRateOfMonth().then(res=>{
      const arr = []
      
      res.forEach((i, wk)=>{
        arr.push(
          {
          ...i, 
          rate: 100, 
          type: 'a', 
          },
          {...i,type:'b' ,rate:Number(i.rate)},
          
        )
      })
      profit.value = arr
    })
  }
  const _GetShipDiffDetailOfWeek =()=>{
    GetShipDiffDetailOfWeek().then(res=>{
      console.log('ggg', res)
      tableData.value = res.concat([{},{},{},{},{},{}]).slice(0,6)
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