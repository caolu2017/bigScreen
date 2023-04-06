<!--
 * @Author: caolu 64294@yangzijiang.com
 * @Date: 2023-01-10 14:12:31
 * @LastEditors: caolu 64294@yangzijiang.com
 * @LastEditTime: 2023-01-11 16:56:10
 * @Description: 下拉选择器，切换页面
-->
<script lang="ts">
export default{
  name: 'SelectView'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import {views} from '@/utils/index.ts'
import { useRouter } from 'vue-router'

  interface selectProps {
    active: string
  }
  const props = defineProps<selectProps>()
  const router = useRouter()
 
  const isDown = ref(false)

  const jumpView = (path, title) => {
    console.log('url', path, title)
    router.replace(path)
  }
  const visibleChange = (v) => {
    isDown.value = v
  }
</script>

<template>
  <div class="chart-header">
    <el-dropdown trigger="click" :popper-class="'select-down'" :placement="'bottom-end'" @visible-change="visibleChange">
      <span class="el-dropdown-link">
        <span class="active-view">{{active}}</span>
        <img :class="`down-icon ${isDown?'down':'up'}`" src="@/assets/img/down.svg" alt="">
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item 
          v-for="{title, path} in views" 
          :key="title" 
          @click="jumpView(path, title)">
            <p :class="title==active?'active-item':''">{{title}}</p>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown>
      <span class="research">投研报告</span>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.el-dropdown-link::after{
  content:'';
  display: block;
  width: 118px;
  height: 2px;
  background-image: url('.././assets/img/select_active_tag.svg');
  background-size: 100% 100%;
  margin-top: 10px;
}

.down-icon{
  vertical-align: top;
  margin-left: 12px;

  &.down{
    transform: rotate(-180deg);
    // animation: down 0.1s;
    // animation-fill-mode:forwards;
  }
}

@keyframes down {
0%{
  transform: rotate(0);
}

100%{
  transform: rotate(-180deg);
}

}

.chart-header {
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  padding-top: 4px;
}
.active-view {
  font-size: 32px;
  color: #FFFFFF;
  font-weight: 500;
  padding-top: 4px;
  cursor: default;
}

.research {
  font-size: 32px;
  color: #FFFFFF;
  opacity: 0.8;
  margin-left: 66px;
}



</style>

<style lang="scss">
.el-dropdown__popper.el-popper.select-down {
  width: 188px;
  background: rgba(0,0,0,1);
  font-size: 28px;
  font-weight: 500;
  border-radius: 3px;
  border: 0;

  .el-popper__arrow{
    display: none;
  }

  ul{
    background: rgba(0,0,0,0.6);
    backrop-filter: blur(10px);
    
  }

  .el-dropdown-menu__item{
    color: rgba(255, 255, 255, 0.8);
    font-size: 28px;
    padding: 24px 0;

    &:hover{
      background: transparent;
    }

    p{
      text-align: center;
      width: 100%;

      &.active-item{
        color: rgba(255, 255, 255, 1);

        &::after{
          content:'';
          display: block;
          width: 100%;
          height: 2px;
          background-image: url('.././assets/img/select_active_tag.svg');
          background-size: 100% 100%;
          position: relative;
          bottom: -16px;
        }
      } 
    }
  }
}
</style>