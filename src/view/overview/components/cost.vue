<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:54:15
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-15 18:24:18
 * @Description: 营业总收入
-->
<script lang="ts">
export default{
  name: 'Cost'
}
</script>
<script setup lang="ts">
	import { computed, onMounted, reactive, ref, toRefs } from 'vue'
	import chartTitle from './chartTitle.vue'


  interface costProps {
    Lingliao: ()=>[],
    height: number
  }

  const props = withDefaults(defineProps<costProps>(), {
    Lingliao: [],
    height: 320,
  })


  onMounted(()=>{
   
    })

  const  getColor = (p)=>{
    if(p>=90){
      return'#039EC8';
    }else if(p>=80&&p<90){
      return '#EBAF00';
    }else if(p>=65&&p<80){
      return '#FF7500';
    }else {
      return '#C8033E';
    }
  }
</script>

<template>
  <div>
    <chartTitle :title="'当天领布清单与配布完成进度'" />
    <div id="container" :style="{'height':height-10+'px'}">
      <el-table :data="Lingliao" style="width: 100%" :header-cell-style="{ background: 'rgba(250, 250, 250, 0.3)', color: '#fff' }">
        <el-table-column prop="woNo" label="工单号" width="180" />
        <el-table-column prop="styleNo" label="款号" width="120" />
        
        <el-table-column prop="progress" class="process" label="进度">
          <template #default="scope">
            <div v-if="scope.row['progress']" class="progress" :style="{'width':scope.row['progress']+'%', background:getColor(scope.row['progress'])  }">{{ scope.row['progress'] }}%</div>
            <div v-else>-</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  
</template>



<style scoped lang="scss">
.progress{
  height: 100%;
  background: #039EC8;
  padding-left: 10px;
  border-bottom: 1px solid #fff;
}

  :deep(.chart-header){
    margin-bottom: 0;
  }
  :deep(thead th ){
    border-bottom: 0!important;
  }

  :deep(tbody .el-table_1_column_3 .cell){
    padding: 0!important;
  }

  :deep(.el-table tr){
    background-color: transparent!important;
    padding: 0;
    box-sizing: border-box;
  }
  :deep(.el-table tbody tr){
    height: 47px;
    line-height: 47px;
    padding: 0;
    box-sizing: border-box;
  }
  :deep(.el-table tbody td){
    padding: 0!important;
  }

  :deep(tbody .el-table_1_column_4){
    border:0;
  }
  :deep(tbody .el-table_1_column_4 .cell){
    padding: 0!important;
  }
  :deep(.el-table tbody .cell){
    // height: 100%;
    line-height: inherit;
    border-right: 1px solid #fff;
  }

  :deep(.el-table tbody .el-table__cell:last-child .cell){
    // height: 100%;
    // line-height: inherit;
    border-right: 1px solid transparent;
    
  }


  // :deep(.el-table tbody .el-table__cell:not(:last-childs)){
  //   // height: 100%;
  //   // line-height: inherit;
  //   border-right: 1px solid #fff;
    
  // }
  :deep(.el-table thead .cell){
    font-size: 18px;
  }
  :deep(.el-table){
    background-color: transparent!important;
  }

  :deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell){
      background-color: transparent!important;
  }

  :deep(.el-table thead th:not(:last-child) .cell){
    border-right:1px solid #fff;
  }




  :deep(.el-table .el-table__cell){
    font-weight: bolder!important;;
    font-size: 16px;
    color: #fff;
  }

  #container{
    width: 100%;
    overflow: hidden;

    .table-header{
      background: rgba(250, 250, 250, 0.3);
      height: 47px;
      display: flex;
      align-items: center;

      span{
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        padding-left: 8px;
        box-sizing: border-box;

        &.no{
          width: 69px;
        }

      }
    }
  }

  :deep(.el-progress__text span){
    color: #fff;
  }

  div::-webkit-scrollbar {
    width: 4px;
  }
  div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    opacity: 0.2;
    background: fade(#039EC8, 60%);
  }
  div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    border-radius: 0;
    background: fade(#039EC8, 30%);
  }
</style>