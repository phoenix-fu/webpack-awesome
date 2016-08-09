export default {
  component: resolve => require(['components/layout/simple.vue'], resolve),
  subRoutes: {
    '/': {
      component: resolve => require(['components/Hello.vue'], resolve)
    },
    '/page/1': {
      component: resolve => require(['components/example/page1.vue'], resolve)
    },
    '/page/2': {
      component: resolve => require(['components/example/page2.vue'], resolve)
    },
    '/page/3': {
      component: resolve => require(['components/example/page3.vue'], resolve)
    }
  }
}
