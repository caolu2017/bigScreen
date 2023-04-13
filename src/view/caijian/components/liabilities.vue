<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:54:15
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-13 15:14:50
 * @Description: 营业总收入
-->
<script lang="ts">
export default{
  name: 'Liabilities'
}
</script>
<script setup lang="ts">
	import { computed, onMounted, reactive, ref, toRefs } from 'vue'
	import chartTitle from './chartTitle.vue'


  interface costProps {
    tableData: ()=>[],
    height: number
  }

  const props = withDefaults(defineProps<costProps>(), {
    tableData: [],
    height: 320
  })
  // const tableData =  [{
  //           date: '2016-05-02',
  //           name: '王小虎',
  //           address: '上海市普陀'
  //         }, {
  //           date: '2016-05-04',
  //           name: '王小虎',
  //           address: '上海市普陀区金'
  //         }, {
  //           date: '2016-05-01',
  //           name: '王小虎',
  //           address: '上海市普陀区金沙江'
  //         }, {
  //           date: '2016-05-03',
  //           name: '王小虎',
  //           address: '上海市普陀区金'
  //         },{
  //           date: '2016-05-01',
  //           name: '王小虎',
  //           address: '上海市普陀区金沙江'
  //         },{
  //           date: '2016-05-01',
  //           name: '王小虎',
  //           address: '上海市普陀区'
  //         },];

  onMounted(()=>{
   
    })
</script>

<template>
    <div>
      <chartTitle :title="'待补片明细'" />
      <el-table :data="tableData" style="flex: 1" :header-cell-style="{ background: 'rgba(250, 250, 250, 0.3)', color: '#fff' }">
        <el-table-column prop="woNo" label="工单号" >
          <template #default="scope">
            <div class="txt">{{ scope.row['woNo']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="fabrics" label="布种" width="60">
          <template #default="scope">
            <div class="txt">{{ scope.row['fabrics']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="pcs" label="数量" width="80">
          <template #default="scope">
            <div class="txt">{{ scope.row['pcs']||'-' }}</div>
          </template>
          </el-table-column>
        <el-table-column prop="sizeCode" label="尺寸" width="60">
          <template #default="scope">
            <div class="txt">{{ scope.row['sizeCode']||'-' }}</div>
          </template>
          </el-table-column>
        <el-table-column prop="clrNo" label="颜色" width="60">
          <template #default="scope">
            <div class="txt">{{ scope.row['clrNo']||'-' }}</div>
          </template>
          </el-table-column>
        <el-table-column prop="bpDate" label="补片日">
          <template #default="scope">
            <div class="txt">{{ scope.row['bpDate']||'-' }}</div>
          </template>
          </el-table-column>
        <el-table-column prop="finishDate" label="完成日">
          <template #default="scope">
            <div class="txt">{{ scope.row['finishDate']||'-' }}</div>
          </template>
          </el-table-column>
      </el-table>
    </div>
  
</template>



<style scoped lang="scss">
.right{
  width: 228px;
  margin-left: 20px;
}
.txt{
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
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