import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=>import('../views/Login')
  },
  {
    path: '/stuLogin',
    name: 'stuLogin',
    component: ()=>import('../views/StuLogin')
  },
  {
    path: '/smallLogin',
    name: 'smallLogin',
    component: ()=>import('../views/smallLogin')
  },
  {
    path: '/',
    name: 'smallAdmin',
    meta: {
      requireAuth: true,
    },
    beforeEnter: (to,from,next)=>{
      const token = localStorage.getItem('token')
      if(to.name !== 'smallLogin' && !token)next({name: 'smallLogin'})
      else next()
    },
    component: () => import('../views/MainSmall'),
    children: [
      {
        path: '',
        redirect: '/small',
      },
      {
        path: '/small',
        name: 'SmallHome',
        meta: {
          requireAuth: true
        },
        beforeEnter: (to,from,next)=>{
          const token = localStorage.getItem('token')
          if(to.name !== 'smallLogin' && !token)next({name: 'smallLogin'})
          else next()
        },
        component: ()=>import('../views/smallHome')
      },
      {
        path: '/smallInfo',
        name: 'smallStuInfo',
        meta: {
          requireAuth: true
        },
        beforeEnter: (to,from,next)=>{
          const token = localStorage.getItem('token')
          if(to.name !== 'smallLogin' && !token)next({name: 'smallLogin'})
          else next()
        },
        component: ()=>import('../views/smallStuInfo')
      },
    ]
  },
  {
    path: '/',
    name: "admin",
    meta: {
      requireAuth: true
    },
    beforeEnter: (to,from,next)=>{
      const token = localStorage.getItem('token')
      if(to.name !== 'Login' && !token)next({name: 'Login'})
      else next()
    },
    component: ()=>import('../views/MainAdmin'),
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'AdminHome',
        meta: {
          requireAuth: true
        },
        component: ()=>import('../views/AdminHome'),
        beforeEnter: (to,from,next)=>{
          const token = localStorage.getItem('token')
          if(to.name !== 'Login' && !token)next({name: 'Login'})
          else next()
        },
      },
      {
        path: '/info',
        name: 'AdminStuInfo',
        meta: {
          requireAuth: true
        },
        beforeEnter: (to,from,next)=>{
          const token = localStorage.getItem('token')
          if(to.name !== 'Login' && !token)next({name: 'Login'})
          else next()
        },
        component: ()=>import('../views/AdminStuInfo')
      },
      {
        path: '/apply',
        name: 'AdminStuApply',
        meta: {
          requireAuth: true
        },
        beforeEnter: (to,from,next)=>{
          const token = localStorage.getItem('token')
          if(to.name !== 'Login' && !token)next({name: 'Login'})
          else next()
        },
        component: ()=>import('../views/AdminStuApply')
      },
      {
        path: '/setting',
        name: 'AdminMajorSet',
        meta: {
          requireAuth: true
        },
        beforeEnter: (to,from,next)=>{
          const token = localStorage.getItem('token')
          if(to.name !== 'Login' && !token)next({name: 'Login'})
          else next()
        },
        component: ()=>import('../views/AdminMajorSet')
      },
      {
        path: '/result',
        name: 'AdminMajorRes',
        meta: {
          requireAuth: true
        },
        beforeEnter: (to,from,next)=>{
          const token = localStorage.getItem('token')
          if(to.name !== 'Login' && !token)next({name: 'Login'})
          else next()
        },
        component: ()=>import('../views/AdminMajorRes')
      },
      {
        path: '/change',
        name: 'AdminChange',
        meta: {
          requireAuth: true
        },
        beforeEnter: (to,from,next)=>{
          const token = localStorage.getItem('token')
          if(to.name !== 'Login' && !token)next({name: 'Login'})
          else next()
        },
        component: ()=>import('../views/AdminChange')
      }
    ]
  },
  {
    path: '/',
    name: 'student',
    meta: {
      requireAuth: true
    },
    component: ()=>import('../views/MainStu'),
    children: [
      {
        path: '',
        redirect: '/index'
      },
      {
        path: '/index',
        name: 'StudentIndex',
        beforeEnter: (to,from,next)=>{
          const token = localStorage.getItem('token')
          if(to.name !== 'stuLogin' && !token)next({name: 'stuLogin'})
          else next()
        },
        meta: {
          requireAuth: true
        },
        component: ()=>import('../views/StudentIndex')
      },
      {
        path: '/wish',
        name: 'StudentWish',
        meta: {
          requireAuth: true
        },
        beforeEnter: (to,from,next)=>{
          const token = localStorage.getItem('token')
          if(to.name !== 'stuLogin' && !token)next({name: 'stuLogin'})
          else next()
        },
        component: ()=>import('../views/StudentWish')
      }
    ]
  },

]
const router = new VueRouter({
  routes,
  mode: "history"
})


export default router