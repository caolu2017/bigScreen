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
  import { pxtorem } from '../utils'
import { GetLessthan3d, GetCjPgdetail, GetWeekRate, GetCjbp, GetCjPlan } from '../../../api/index'

  const card = ref(null)
  const height = ref(0)
  const fabu = ref([])
  const tableData = ref([])
  const Lingliao = ref([])
  const profit = ref([])
  const badrate = ref([])
  let intervalID = null


  onMounted(()=>{
    height.value = card.value.$el.clientHeight - pxtorem(54)
    _GetLessthan3d()
    // _GetCjPgdetail()
        // _GetWeekRate()
        _GetCjPlan()
        // _GetCjBadrate()

     intervalID = setInterval(function(){
      _GetLessthan3d()
    // _GetCjPgdetail()
        // _GetWeekRate()
        _GetCjPlan()
        // _GetCjBadrate()
      }, 120000)

   
  })

 onUnmounted(()=>{
  clearInterval(intervalID)
  intervalID = null
 })


  const _GetLessthan3d=()=> {
    GetLessthan3d().then(res=>{
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
  const _GetCjPlan =()=>{
    GetCjPlan().then(res=>{
      tableData.value = res.concat([{},{},{},{},{},{},{},{},{},{}]).slice(0, 6)
    })
  }
  const _GetCjBadrate =()=>{
    GetCjBadrate().then(res=>{
      let obj = {}
      // 根据id重复去重
      res = res.reduce(function (item, next) {
          obj[next.fabrics] ? '' : obj[next.fabrics] = true && item.push(next)
          return item
      }, [])
      badrate.value = res.sort(function(a,b){return a.rate-b.rate})
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
          class="item table line"
          :Lingliao="fabu"  />
          <!-- <Cost class="item table line" :Lingliao="Lingliao" :height="height" /> -->
        </div>
        
        <div class="row">
          <!-- <Profit class="item canvas" :height="height" :tableData="profit"/> -->
          <!-- <div class="btnCrad table"> -->
            <Liabilities class="item table line" :tableData="tableData"  />
            <!-- <Liab class="items liab" :tableData="badrate"  :height="height" /> -->
          <!-- </div> -->
         
        </div>
      </div>
    </div>

  </div>
  </div>
 

	
</template>

<style scoped lang="scss">
  @import "./index";

  .btnCrad{
  }

  .left{
    width: 68%;
  }
  
</style>