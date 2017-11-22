import Vue from 'vue'
import Router from 'vue-router'
//引入主要页面。'@'的路径设置，见build/webpack.base.conf.js
// import Login from '@/pages/Login/Login.vue'
import Home from '@/pages/Home/Home.vue'
import Register from '@/pages/Register/Register.vue'
import Login from '@/pages/Login/Login.vue'
import Article from '@/pages/Article/Article.vue'
import ArticleDetail from '@/pages/Article-detail/Article-detail.vue'
import Reply from '@/pages/Reply/Reply.vue'
import Comment from '@/pages/Comment/Comment.vue'
import Mult from '@/pages/Mult/Mult.vue'
import Message from '@/pages/Message/Message.vue'
import At      from '@/pages/At/At.vue'
import Critic      from '@/pages/Critic/Critic.vue'
import Zan     from '@/pages/Zan/Zan.vue'
import Ward    from '@/pages/Ward/Ward.vue'
import Discovery from '@/pages/Discovery/Discovery.vue'
import Me from '@/pages/Me/Me.vue'
import Install from '@/pages/Install/Install.vue'
import Search  from '@/pages/Search/Search.vue'
import Collect from '@/pages/Collect/Collect.vue'
import NewUser from '@/pages/NewUser/NewUser.vue'
import Guan from '@/pages/Guan/Guan.vue'
import Fen from '@/pages/Fen/Fen.vue'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: '', //2.5.0+新增的一个类，暂时设为空，详见：http://router.vuejs.org/en/api/router-link.html
  linkActiveClass: 'active-tab',
  mode: 'history',
  saveScrollPosition: true,
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path:'/article/:id',
      name:'ArticleDetail',
      component:ArticleDetail
    },
    {
      path:'/reply/:id',
      name:'Reply',
      component:Reply
    },
    {
      path:'/comment/:id',
      name:Comment,
      component:Comment
    },
    {
      path:'/mult/:id',
      component:Mult
    },
    {
       path:'/at',
       component:At
    },
    {
      path:'/ping',
      component:Critic
    },
    {
      path:'/zan',
      component:Zan
    },
    // 转发
    {
      path:'/ward/:id',
      component:Ward
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/discovery',
      name: 'Discovery',
      component: Discovery
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    },
    {
      path:'/install',
      component:Install
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/collect',
      component:Collect
    },
    {
      path:'/newUser',
      component:NewUser    
    },
    {
      path:'/guan',
      component:Guan    
    },
    {
      path:'/fen',
      component:Fen   
    }
  ]
})
