import { defineStore } from 'pinia'
import routes from '@/router/routes.js'
import axios from 'axios'
import Cookies from 'js-cookie'
import { getUserRoleByCode } from '@/api/base.js'
import { useRouter } from 'vue-router'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      // 用户Info
      userInfo: {}
    }
  },
  getters: {
    // 用户可以访问的路由
    userAuthRoutes(state) {
      let userAuthRoutes = routes.filter(el => {
        if (el.meta) {
          if (el.meta.pageCode) {
            return state.userPageCodeList.includes(el.meta.pageCode)
          } else {
            return true
          }
        } else {
          return true
        }
      })

      return userAuthRoutes
    }
  },
  actions: {
    
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ['userInfo']
      }
    ]
  }
})
