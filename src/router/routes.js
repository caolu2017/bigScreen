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
  {
    path: '/caipian',
    name: 'caipian',
    title: '',
    component: () => import('@/view/caipian/index.vue'),
  },
  {
    path: '/caijian',
    name: 'caijian',
    title: '',
    component: () => import('@/view/caijian/index.vue'),
  }
]
export default routes
