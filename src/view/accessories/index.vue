<script lang="ts">
  export default {
    name: 'industryOverview'
  }
</script>
<script setup lang="ts">
	import { computed, initCustomFormatter, onMounted, watch, ref, onUnmounted } from 'vue'
  import Profit from './components/profit.vue'
	import Revenue from './components/revenue.vue'
	import Cost from './components/cost.vue'
	import Liabilities from './components/liabilities.vue'
  import axios from 'axios'
  import { pxtorem } from '../utils'
import { GetPgFinish, GetFlPgLessthan3dByLine, GetFlFaliaoProgress, GetFlMaterialPlan } from '../../../api/index'

  const card = ref(null)
  const height = ref(0)
  const fabu = ref([])
  const tableData = ref([])
  const Lingliao = ref([])
  const profit = ref([])
let intervalID = null

  onMounted(()=>{
    height.value = card.value.$el.clientHeight - pxtorem(54)
     _GetPgFinish()
    _GetFlPgLessthan3dByLine()
    _GetFlFaliaoProgress()
    _GetFlMaterialPlan()

    intervalID = setInterval(function(){
        _GetPgFinish()
    _GetFlPgLessthan3dByLine()
    _GetFlFaliaoProgress()
    _GetFlMaterialPlan()
      }, 120000)

   
  })

 onUnmounted(()=>{
  clearInterval(intervalID)
  intervalID = null
  })
  const filterDay=(str)=>{
    const now = new Date()
    const m = now.getMonth()+1
    const d = now.getDate()
    if(str=='zeroDays'){
      return ' 当天'
    }else if(str=='oneDays'){
      return `+1天`
    }else if(str=='twoDays'){
      return `+2天`
    }else if(str=='threeDays'){
      return `+3天`
    }else if(str=='fourDays'){
      return `+4天`
    }else if(str=='fiveDays'){
      return `+5天`
    }
  }

  const _GetPgFinish=()=> {
    GetPgFinish().then(res=>{
      console.log('res', res)
      // res.oneDays = '0.2'
      // res.twoDays = '0.3'
      // res.threeDays = '0.4'
      // res.zeroDays = '0.1'
      const arr = []
      for(let key  in res){
        arr.push({'city': filterDay(key), 'value': Number(res[key])})
      }

      console.log('arrarr', arr)
      
      fabu.value = arr
    })
  }

  const _GetFlPgLessthan3dByLine =()=>{
    GetFlPgLessthan3dByLine().then(res=>{
      // console.log('ccc', res)
      Lingliao.value = res
      // Lingliao.value = [
      // {
      //   lineName:'1',
      //   days: 2,
      // },
      // {
      //   lineName:'3',
      //   days: 3,
      // },
      // {
      //   lineName:'2',
      //   days: 5,
      // }
      // ]
    })
  }
  const _GetFlFaliaoProgress =()=>{
    GetFlFaliaoProgress().then(res=>{
      
      profit.value = res.map(r=>{
        console.log('ddfdf', r)
        const p = Number(r.progress)
        let c = ''
        if(p>=90){
          c= '#039EC8';
        }else if(p>=80&&p<90){
          c= '#EBAF00';
        }else if(p>=65&&p<80){
          c= '#FF7500';
        }else {
          c= '#C8033E';
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