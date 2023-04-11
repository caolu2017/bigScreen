const routes = [
  {
    path: '/',
    name: 'industryOverview',
    title: '',
    component: () => import('@/view/overview/index.vue')
  },
  {
    path: '/accessories',
    name: 'accessories',
    title: '',
    component: () => import('@/view/accessories/index.vue')
  },
  {
    path: '/turnoff',
    name: 'turnoff',
    title: '',
    component: () => import('@/view/turnoff/index.vue')
  },
  // {
  //   path: '/industryOverview',
  //   name: 'industryOverview',
  //   title: '财务总览',
  //   component: () => import('@/view/overview/index.vue'),
  // },

  // // TODO: 修改
  // {
  //   path: '/overview',
  //   name: 'indicatorOverview',
  //   title: '财务总览',
  //   component: () => import('@/view/overview/child.vue'),
  // }
]
export default routes
