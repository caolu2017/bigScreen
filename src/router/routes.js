const routes = [
  {
    path: '/',
    name: 'industryOverview',
    title: '',
    component: () => import('@/view/overview/index.vue')
  },
  // {
  //   path: '/industryBenchmarking',
  //   name: 'industryBenchmarking',
  //   title: '行业对标',
  //   component: () => import('@/view/industryBenchmarking.vue')
  // },
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
