<template>
<div class="me">
  <top-header></top-header>  
  <top-tab></top-tab>   
  <!-- {{user}} -->
  <div class="profile-card card">
    <div class="avatar-card border-1px border-bottom-1px" v-ripple>
      <a class="card-avatar">
        <img :src="'/users/' + user.avatar">
      </a>
      <a class="avatar-card-content txt-cut">
        <h3 class="txt-s mct-a txt-cut">
            {{user.username}}
          <section class="vip-icon-block">
          <i class="iconfont icon-crown"></i>
          <i class="iconfont icon-right-arrow"></i>
        </section>
        </h3>
        <p class="sub-text txt-s mct-d txt-cut">简介:{{user.motto}}</p>
      </a>
      <span class="plus-content">
          <i class="iconfont icon-right-arrow"></i>
      </span>
    </div>
    <footer class="avatar-card-footer no-text-select ">
      <a class="box-col able-to-active">
        <p>{{user.article_count}}</p>
        <p>微博</p>
      </a>
      <i class="separate-line"></i>
      <a class="box-col able-to-active">
        <router-link to="/guan">
        <p>{{user.follows_user.length}}</p>
        <p>关注</p>
        </router-link>
      </a>
      <i class="separate-line"></i>
      <a class="box-col able-to-active">
        <router-link to="/fen">
        <p>{{user.be_followed_user.length}}</p>
        <p>粉丝</p>
        </router-link>
      </a>
    </footer>
  </div>
  <div class="card-line-group">
    <section class="card-line card-4" v-ripple>
      <router-link to="/newUser">
        <i class="iconfont icon-friends"></i>
        <div class="content">新的好友</div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>
  </div>
  <div class="card-line-group">
    <section class="card-line card-4" v-ripple>
      <router-link to="">
        <i class="iconfont icon-level"></i>
        <div class="content">微博等级<span class="mct-b txt-xs">Lv9</span></div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>
  </div>
  <div class="card-line-group">
    <section class="card-line card-4" v-ripple>
      <router-link to="">
        <i class="iconfont icon-album"></i>
        <div class="content">我的相册<span class="mct-b txt-xs">( {{user.photo}} )</span></div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>
    <section class="card-line card-4" v-ripple>
      <router-link to="/collect">
        <i class="iconfont icon-collect"></i>
        <div class="content">我的收藏<span class="mct-b txt-xs"></span></div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>
    <section class="card-line card-4" v-ripple>
      <router-link to="">
        <i class="iconfont icon-like"></i>
        <div class="content">赞<span class="mct-b txt-xs">( {{user.praise}} )</span></div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>
  </div>
  <div class="card-line-group">
    <section class="card-line card-4" v-ripple>
        <router-link to="/install" >
          <i class="iconfont icon-gear"></i>
          <div class="content">设置</div>
          <i class="iconfont icon-right-arrow"></i>
        </router-link>
    </section>
  </div>
</div>
</template>

<script>
import header from '../../components/header/header.vue'
import tab from '../../components/tab/tab'
 import {mapState} from "vuex";
export default{
    data(){
      return {

      }
    },
    computed: {
          ...mapState([
         'user'
    ]),
    },   
      components: {
    'top-header': header,        
      'top-tab': tab,
    },   
}
</script>

<style scoped lang="stylus">
.card a
  color #333

.avatar-card
  line-height: 1.125rem
  .card-avatar
    margin .625rem 0 .625rem .75rem
    img
      width:3.125rem
.vip-icon-block
  vertical-align: bottom
  overflow: hidden
  display: inline-block
  width 2.25rem
  height 1.125rem
  text-align center
  background-color rgba(223,223,223,.7)
  border-radius 3px
  margin-left .375rem
  .iconfont
    color #a2a2a2
    font-size: 12px
    line-height:1rem
  .icon-crown
    font-size: 14px


.avatar-card-footer
  display: flex
  .separate-line
    height 2.5rem
  .box-col
    font-size: .8125rem
    flex 1
    text-align center
    padding: .4375rem 0
    p
      height .75rem
    p:nth-child(2)
      margin-top .25rem

.icon-friends,.icon-level,.icon-collect
  background-color #FF8C16
.icon-album,.icon-gear
  background-color #35B87C
.icon-like
  background-color #F2695F
.rout
  padding 0
</style>
