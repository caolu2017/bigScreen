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
    <chartTitle :title="'发料计划'" />
    <div id="container">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: 'rgba(250, 250, 250, 0.3)', color: '#fff' }">
        <el-table-column prop="groupname" label="组别">
          <template #default="scope">
            <div>{{ scope.row['groupname']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="monthbuy" label="月BUY">
          <template #default="scope">
            <div>{{ scope.row['monthbuy']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="styleNo" label="款号">
          <template #default="scope">
            <div >{{ scope.row['styleNo']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="odQty" label="订单数量">
          <template #default="scope">
            <div>{{ scope.row['odQty']||'-' }}</div>
          </template>
        </el-table-column>
       

        <el-table-column prop="clrNo" label="色组">
          <template #default="scope">
            <div>{{ scope.row['clrNo']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="vendor" label="厂商">
          <template #default="scope">
            <div>{{ scope.row['vendor']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="partNo" label="料号">
          <template #default="scope">
            <div>{{ scope.row['partNo']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="colorNo" label="色号">
          <template #default="scope">
            <div>{{ scope.row['colorNo']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="units" label="用量单位">
          <template #default="scope">
            <div>{{ scope.row['units']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="sizeCode" label="尺寸">
          <template #default="scope">
            <div>{{ scope.row['sizeCode']||'-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="qty" label="数量">
          <template #default="scope">
            <div>{{ scope.row['qty']||'-' }}</div>
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

  :deep(thead .el-table_1_column_4){
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