<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:54:15
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-06 10:08:30
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
    tableData: ()=>[]
  }

  const props = withDefaults(defineProps<costProps>(), {
    tableData: [],
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
    <chartTitle :title="'即將到廠物料'" />
    <div id="container">
      <!-- <div class="table-header">
        <span class="no">序号</span>
        <span>貨櫃號</span>
        <span>PO</span>
        <span>料號</span>
        <span>布種</span>
        <span>顏色</span>
        <span>總碼數</span>
        <span>預計到場日期</span>
      </div> -->
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: 'rgba(250, 250, 250, 0.3)', color: '#fff' }">
        <el-table-column prop="cntrNo" label="柜号" width="69" />
        <el-table-column prop="po" label="PO" width="114" />
        <el-table-column prop="matNo" label="料號" />
        <el-table-column prop="fabrics" label="布種" />
        <el-table-column prop="colorName" label="顏色" />
        <el-table-column prop="qty" label="總碼數" />
        <el-table-column prop="planArriveDate" label="預計到場日期" />
      </el-table>
    </div>
  </div>
  
</template>



<style scoped lang="scss">
  :deep(.chart-header){
    margin-bottom: 0;
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