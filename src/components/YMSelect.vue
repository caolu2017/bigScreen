<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-11 10:00:20
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-01-11 16:27:32
 * @Description: 年累月度下拉选择
-->
<script lang="ts">
export default{
  name: 'Y&MSelect'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

  interface selectProps {
    active: string
  }
  const props = defineProps<selectProps>()
  const router = useRouter()
 
  const isDown = ref(false)
  const options = ['年累', '月度']

  const jumpView = (url) => {
    router.push(url);
  }
  const visibleChange = (v) => {
    isDown.value = v

    console.log(isDown.value, 'sxs')
  }
</script>

<template>
  <el-dropdown trigger="click" :popper-class="'select-down YM-select'" :placement="'bottom-end'" @visible-change="visibleChange">
    <span class="el-dropdown-link">
      <span class="active-view">{{active}}</span>
      <img :class="`down-icon ${isDown?'down':'up'}`" src="@/assets/img/down.svg" alt="">
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item 
        v-for="title in options" 
        :key="title" 
        @click="jumpView(url)">
          <p :class="title==active?'active-item':''">{{title}}</p>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.el-dropdown-link{
  height: 40px;
  line-height: 40px;
  display: block;
  padding: 0 12px;
  background: rgba(25,252,222,0.40);
}

.down-icon{
  vertical-align: sub;
  margin-left: 12px;
  width: 20px;
  height: 20px;

  &.down{
    transform: rotate(-180deg);
  }
}

.active-view {
  font-size: 20px;
  color: #FFFFFF;
  font-weight: 500;
  padding-top: 4px;
}

</style>

<style lang="scss">
.el-dropdown__popper.el-popper.YM-select {
  width: 100px!important;
  &:hover{
      background: transparent;
    }

  p{
    font-size: 20px;
  }
}
</style>
