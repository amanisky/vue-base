import Layout from '@/pages/layout'

export default [
  {
    name: 'home',
    path: '',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: resolve => require(['@/pages/home'], resolve)
      }
    ]
  }
]
