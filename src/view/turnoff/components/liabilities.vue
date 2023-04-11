<script lang="ts">
export default{
  name: 'Liabilities'
}
</script>
<script setup lang="ts">
	import { onMounted } from 'vue'
	import chartTitle from './chartTitle.vue'


  interface costProps {
    tableData: ()=>[]
  }

  const props = withDefaults(defineProps<costProps>(), {
    tableData: [],
  })

  onMounted(()=>{
   
    })
</script>

<template>
  <div>
    <chartTitle :title="'最近到廠輔料信息'" />
    <div id="container">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: 'rgba(250, 250, 250, 0.3)', color: '#fff' }">
        <el-table-column prop="cntrNo" label="貨櫃號" width="120">
          <template #default="scope">
            <div>{{ scope.row['cntrNo']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="matNo" label="料號">
          <template #default="scope">
            <div>{{ scope.row['matNo']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="specification" label="規格">
          <template #default="scope">
            <div>{{ scope.row['specification']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名稱">
          <template #default="scope">
            <div >{{ scope.row['name']||'-' }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="qty" label="數量">
          <template #default="scope">
            <div>{{ scope.row['qty']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="planArriveDate" label="預計到廠日期">
          <template #default="scope">
            <div>{{ scope.row['planArriveDate']||'-' }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>



<style scoped lang="scss">
  :deep(.chart-header){
    margin-bottom: 0;
  }

  :deep(thead th ){
    border-bottom: 0!important;
  }

  :deep(.el-table tr){
    background-color: transparent!important;
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
  :deep(.el-table tbody tr){
    height: 47px;
    line-height: 47px;
    padding: 0;
    box-sizing: border-box;
  }


  :deep(.el-table .el-table__cell){
    font-weight: 400;
    font-size: 14px;
    color: #ffffffe0;
  }

  #container{
    width: 100%;

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
</style>