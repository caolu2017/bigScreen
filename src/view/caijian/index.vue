<script lang="ts">
  export default {
    name: 'industryOverview'
  }
</script>
<script setup lang="ts">
	import { computed, initCustomFormatter, onMounted, watch, ref, onUnmounted  } from 'vue'
  import Profit from './components/profit.vue'
	import Revenue from './components/revenue.vue'
	import Cost from './components/cost.vue'
	import Liabilities from './components/liabilities.vue'
	import Liab from './components/liab.vue'
  import axios from 'axios'
  import { dataFormatter } from './utils'
  import { pxtorem } from './utils'
import { GetDayRate, GetCjPgdetail, GetWeekRate, GetCjbp } from '../../../api/index'

  const card = ref(null)
  const height = ref(0)
  const fabu = ref([])
  const tableData = ref([])
  const Lingliao = ref([])
  const profit = ref([])
  let intervalID = null


  onMounted(()=>{
    height.value = card.value.$el.clientHeight -40
    _GetDayRate()
    _GetCjPgdetail()
        _GetWeekRate()
        _GetCjbp()

     intervalID = setInterval(function(){
      _GetDayRate()
    _GetCjPgdetail()
        _GetWeekRate()
        _GetCjbp()
      }, 120000)

   
  })

 onUnmounted(()=>{
  clearInterval(intervalID)
  intervalID = null
 })


  const _GetDayRate=()=> {
    GetDayRate().then(res=>{
      console.log('res', res)
      fabu.value = res
    })
  }

  const _GetCjPgdetail =()=>{
    GetCjPgdetail().then(res=>{
      Lingliao.value = res.slice(0, 6)
    })
  }
  const _GetWeekRate =()=>{
    GetWeekRate().then(res=>{
      
      profit.value = res
    })
  }
  const _GetCjbp =()=>{
    GetCjbp().then(res=>{
      tableData.value = res.concat([{},{},{},{},{},{},{},{},{},{}]).slice(0, 6)
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
          <div>
            <Liabilities class="item table" :tableData="tableData"  />
            <Liab class="item" :tableData="tableData"  />
          </div>
         
        </div>
      </div>
    </div>

  </div>
  </div>
 

	
</template>

<style scoped lang="scss">
  @import "./index";
  
</style>