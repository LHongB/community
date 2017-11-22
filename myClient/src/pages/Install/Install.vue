<template>
  <div class="install">
   <div class="head">
         <div @click="goBack" class="header-close" >
          <i class="el-icon-back"></i>
            </div> 
      <p>设置</p>
      <div class="right"><i class="fa fa-ellipsis-h"></i></div>
   </div>
    <div class="card-line-group">
    <section class="card-line card-4" v-ripple>
      <router-link to="">
        <div class="content">个人资料</div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>
  </div>
  <div class="card-line-group">
     <section class="card-line card-4" v-ripple>
      <router-link to="">
        <div class="content">隐私设置</div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>  
     <section class="card-line card-4" v-ripple>
      <router-link to="">
        <div class="content">屏蔽设置</div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>
     <section class="card-line card-4" v-ripple>
      <router-link to="">
        <div class="content">悄悄关注</div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>          
  </div>
  <div class="card-line-group">
     <section class="card-line card-4" v-ripple>
      <router-link to="">
        <div class="content">账号安全</div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>     
  </div>
  <div class="card-line-group">
     <section class="card-line card-4" v-ripple>
      <router-link to="">
        <div class="content">版本切换</div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>  
    <section class="card-line card-4" v-ripple>
      <router-link to="">
        <div class="content">意见反馈</div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </section>    
  </div>  
  <div class="card-line-group">
    <section class="card-line card-4"  v-ripple>
      <router-link to="" class="tui" @click="tui()">
            退出当前账号
      </router-link>
    </section> 
  </div>
  </div>
</template>

<script>
export default {
    methods:{
       goBack() {
            this.$router.go(-1)
        },  
        tui(){
            this.$axios('/users/logout').then((result)=>{
                console.log(result)
                if( result.data.error == 0 ){
                    location.href = '/home'   
                }
            }) 
        }      
    }
}
</script>

<style lang="stylus" scoped>
.head {
    color: #333333;
    width: 100%;
    max-width: 100%;
    margin-bottom: 10px;
    text-align: center;
    background-color:white;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 1);
    box-shadow: 0 0 0 rgba(0, 0, 0, 1);
    display: -wbekit-flex;
    display: flex;
    /* flex-flow nowrap row */
    z-index: 1;
    overflow: hidden;
    margin-bottom : 10px;
    padding: 0;
}

p {
    width: 100px;
    font-size: 20px;
    padding: 12px 0;
    margin: 0 auto;
}

.header-close {
    float: left;
    text-align: center;
    font-size: 25px;
    width: 1.5rem;
    height: 2rem;
    margin: 0.6rem 0 0 0.6rem;
}

.right {
    float: right;
    padding: 12px;
}
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
.tui
//   display inline-block
  color red
  text-align center
  font-size 15px
  margin-left 35%
</style>
