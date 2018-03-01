import Vue from 'vue'
import Router from 'vue-router'
import FirstSample from '@/components/FirstSample'
import SecondSample from '@/components/SecondSample'
import ThirdSample from '@/components/ThirdSample'
import ForthSample from '@/components/ForthSample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/1',
      name: 'FirstSample',
      component: FirstSample
    },
    {
      path: '/2',
      name: 'SecondSample',
      component: SecondSample
    },
    {
      path: '/3',
      name: 'ThirdSample',
      component: ThirdSample
    },
    {
      path: '/4',
      name: 'ForthSample',
      component: ForthSample
    }
  ]
})
