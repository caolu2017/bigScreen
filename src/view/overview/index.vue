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
import { getFabu, GetLingliao, GetFaliao, GetMaterialPlan } from '../../../api/index'

  const card = ref(null)
  const height = ref(0)
  const fabu = ref([])
  const tableData = ref([])
  const Lingliao = ref([])
  const profit = ref([])


  onMounted(()=>{
    height.value = card.value.$el.clientHeight -40

    _getFabu()
    _GetLingliao()
    _GetFaliao()
    _GetMaterialPlan()
  })

  const filterDay=(str)=>{
    const now = new Date()
    const m = now.getMonth()+1
    const d = now.getDate()
    if(str=='zeroDays'){
      return '當天'
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

  const _getFabu=()=> {
    getFabu().then(res=>{
      console.log('res', res)
      const arr = []
      for(let key  in res){
        arr.unshift({'city': filterDay(key), 'value': 1-res[key], type: '城市人口'})
        arr.unshift({'city': filterDay(key), 'value': Number(res[key]), type: '首都人口'})
        console.log(key + '---' + res[key], arr)
      }
      
      fabu.value = arr
    })
  }

  const _GetLingliao =()=>{
    GetLingliao().then(res=>{
      console.log('ccc', res)
      Lingliao.value = res
    })
  }
  const _GetFaliao =()=>{
    GetFaliao().then(res=>{
      
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
  const _GetMaterialPlan =()=>{
    GetMaterialPlan().then(res=>{
      console.log('ggg', res)
      tableData.value = res
      
      // .map(r=>{
      //   const v = ((r.actualQty*100)/r.qty).toFixed()
      //   let c = ''
      //   if (v-80<=0) {
      //     c= '#C8033E';
      //   }else if(v-90>=0){
      //     c= '#039EC8';
      //   }else {
      //     c= '#EBAF00';
      //   }

      //   return{
      //   ...ref, 
      //   color: c
      // }})
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
            <div class="en">主料倉</div>
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