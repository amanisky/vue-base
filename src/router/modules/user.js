export default [
  {
    name: 'user',
    path: '/user',
    component: resolve => require(['@/pages/user'], resolve),
    // component: () => import('@/pages/user'),
    children: [
      { path: 'list', name: 'user.list', component: resolve => require(['@/pages/test'], resolve) }
    ]
  }
]
