<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-06 13:54:15
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-04-06 11:29:30
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
</script>

<template>
  <div>
    <chartTitle :title="'當天領布清單與配布完成進度'" />
    <div id="container" :style="{'height':height-20+'px'}">
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
      <el-table :data="Lingliao" style="width: 100%" :header-cell-style="{ background: 'rgba(250, 250, 250, 0.3)', color: '#fff' }">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="woNo" label="工單號" width="120" />
        <el-table-column prop="styleNo" label="款號" width="120" />
        
        <el-table-column prop="progress" label="進度">
          <template #default="scope">
            <!-- <span>{{ scope.row['progress'] }}</span> -->
            <el-progress :percentage="scope.row['progress']" />
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
    overflow: auto;

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
</style>