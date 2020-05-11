import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './homepage'
import User from './userpage'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: "/",
  //   redirect: "/login",
  // },
  {
    path: "/login",
    component: () => import("@pages/login"),
    name: "login",
    meta: {
        title: "登陆",
        tabBarFlag: false,
        requiredAuth: false
    }
  },
  Home,
  User,
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  var ismobile = localStorage.getItem('ismobile');
  
    if(ismobile == null){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  
      ismobile = flag ? 1 : 0
    }
    // 电脑
    if (ismobile == 0) {
      if (to.path == '/') {
          next('/login')
          localStorage.removeItem('ismobile');
      } else {
          next();
          localStorage.removeItem('ismobile');
      }
    }
    // 手机
    if (ismobile == 1) {
      if (to.path == '/') {
          next('/user')
          localStorage.removeItem('ismobile');
      } else {
          next();
          localStorage.removeItem('ismobile');
      }
    }
  })

router.beforeEach((to,from,next)=>{
  document.title = to.meta.title;
  if(to.path =="/user/mine" ){
      if(sessionStorage.getItem("userid")){
          next()
      }else{
          next({name:"register",params:{path:to.path}})
      }
  }else{
      next();
  }
}) 
export default router
