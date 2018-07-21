import Vue from 'vue'
import Router from 'vue-router'
import echo from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: echo
    }
  ]
})
