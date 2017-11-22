<template>
  <div class="tabs">
      <div v-show="userShow" class="tab-group">
        <el-badge  class="item">
            <router-link to="/home" class="a">首页</router-link>   
        </el-badge>         
        <!-- <router-link to="/home" class="tab">首页</router-link> -->
        <el-badge  :value="count" class="item">
                 <router-link to="/message" class="a" >消息</router-link>      
        </el-badge>    
        <router-link to="/discovery" class="tab">发现</router-link>
        <router-link to="/me" class="tab">我</router-link>
      </div>
  </div>
</template>

<script>
 import {mapState} from "vuex";
export default {
    name: 'tabs',
    computed: {
          ...mapState([
         'user','userShow','count'
    ]), 
    }
}
</script>

<style lang="stylus" scoped>
  .item {
    padding :0 20px;
    margin-top: 10px;
    margin-right: 40px;
  }
  .a
        color: #5d5d5d
        font-size: .875rem
        font-weight:700      
 .tab-group
    width 100%
    max-width 100%
    margin-bottom 10px
    background-color #f5f5f5
    -webkit-box-shadow 0 1px 2px rgba(0,0,0,.15)
    box-shadow 0 1px 2px rgba(0,0,0,.15)
    display -wbekit-flex
    display flex
    /*flex-flow nowrap row*/
    z-index 1
    overflow hidden
    .tab
      flex 1
      display: block
      font-size: .875rem
      font-weight:700
      text-align center
      line-height: 40px
      color: #5d5d5d
      position: relative

    .active-tab
      color #ff8200
      font-size: .9275rem
      &:before
        content ' '
        width 100%
        height 2px
        background-color: #ff8200;
        position: absolute
        bottom 0
        left 0
        z-index 2
</style>
