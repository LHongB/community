<template>
  <div class="header">
    <el-dropdown @command="handleCommand" v-show="pageName=='Home'"  class="user-and-group">
       <p class="el-dropdown-link">{{user.username}}
         <i class="iconfont icon-down-arrow"></i></p>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="tui" >退出</el-dropdown-item>
      </el-dropdown-menu>           
    </el-dropdown>
    <div v-show="pageName=='index'" class="user-and-group common-header">
      <h1 style="padding-left:40px;font-size:25px;">微博</h1>
    </div>
    <div v-show="pageName!=='Home'" class="common-header">
      <h1>{{processPageName}}</h1>
    </div>
    <div v-show="userShow" class="icon-group">
      <a class="iconfont icon-compose" href="/article"></a>
      <a class="iconfont icon-search"></a>
      <a v-show="pageName==='Home'" class="iconfont icon-refresh" @click.prevent="updateContent()"></a>
      <a v-show="pageName==='Message'" class="iconfont icon-msg"></a>
      <a v-show="pageName==='Me'" class="iconfont icon-gear"></a>
    </div>
    <div  v-show= "!userShow" class="icon-group out">
     <a href="/register">注册</a> / <a href="/login">登录</a>
    </div>
  </div>
</template>

<script>
 import {mapState} from "vuex";
  export default{
    name: 'header',
    methods: {
      updateContent() {
        //子组件向父组件发射自定义事件，用于向父组件传递更新的消息。
        this.$emit('toUpdateWeibo')
//        console.log('emit toUpdateWeibo')
      },
      handleCommand(){   
        console.log('点击')
        this.$axios.get('/users/logout').then(function(result){
          console.log(result)
          if( result.data.error == 0 ){
            location.href = '/home'   
          }
        })              
      }
    },
    computed: {
          ...mapState([
         'user','userShow'
    ]),  
      //值须为函数
      pageName() {
//        console.log('current route name is : ', this.$route.name)
        return this.$route.name
        //不需要vuex了...
        //return this.$store.state.pageName
      },
      processPageName() {
        let ret = this.$route.name
        switch (ret) {
          case 'Message':
            ret = '消息'
            break;
          case 'Discovery':
            ret = '发现'
            break;
          case 'Me':
            ret = '我'
            break;
        }
        return ret
      }
    },   
  }
</script>

<style lang="stylus" scoped>
  .header
    width:100%
    height 44px
    line-height 44px
    color #333
    background-color #fff
    overflow hidden
    .common-header
      display: inline-block
      color #5d5d5d
      background-image url("../../../static/img/favicon.png")
      background-repeat no-repeat
      background-size 29px auto
      background-position 12px 9px
      padding-left 50px

    .user-and-group
      max-width 40%
      position relative
      float: left
      padding 0 12px

      .user-title
        font-size 1.125rem

      .icon-down-arrow
        font-size: .8215rem
        color: #f07c10;
        position absolute
        top 0
        right -8px
     .out
       padding 0 20px
     .out a
      color red;
    .icon-group
      float: right;
      /*padding 0 12px*/
      a.iconfont
        vertical-align: top
        display inline-block
        width: 46px
        font-size: 22px
        height: 44px
        line-height: 44px
        color: #444
        text-align: center
        &:active
          background-color #ebebeb
</style>
