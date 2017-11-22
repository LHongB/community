<template>
  <div class="message">
  <top-header></top-header>     
   <top-tab></top-tab> 
   <router-link to="/at" class="item" v-ripple>
      <div class="icon"><i class="fa fa-at"></i></div>
      <div class="icon"><span  class="text"  >@我的</span></div>
      <div class="icon"><i class="el-icon-arrow-right right" style="left:48px;"></i></div>
   </router-link>
      <router-link to="/ping"  class="item" v-ripple>
      <div class="icon"><i class="fa fa-commenting-o" style="background:#35b87f;"></i></div>
      <div class="icon"><span class="text" >评论</span></div>
      <div class="icon"><i class="el-icon-arrow-right right" style="left:63px;"></i></div>
   </router-link>
      <router-link to="/zan" class="item" v-ripple>
      <div class="icon"><i class="fa fa-thumbs-o-up" style="background:#ffa200;"></i></div>
      <div class="icon"><span class="text">赞</span></div>
      <div class="icon"><i class="el-icon-arrow-right right" style="left:80px;"></i></div>
  </router-link>
  <router-link to="/stanger"  class="item" v-ripple>
      <div class="icon"><i class="fa fa-bullhorn" style="background:#5b99ee;"></i></div>
      <div class="icon"><span class="text">未关注人私信</span></div>
      <div class="icon"><i class="el-icon-arrow-right right"></i></div>
   </router-link>
  </div>
</template>

<script>
import header from '../../components/header/header.vue'
import tab from '../../components/tab/tab'
  export default {
    name: 'message',
    data() {
      return {
      }
    },
    components: {
    'top-header': header,           
      'top-tab': tab,
    },
  }
</script>

<style scoped >
   .item{
     width: 400px;
     display: block;
     background: white;
     padding: 5px;
     border-bottom: solid 1px #9999;
   }
   .icon{
      display: inline-block;
   }
   .fa{
         display: table-cell;
    vertical-align: middle;
    text-align: center;
     width: 50px;
     height: 50px;   
     background:#5bb4da; 
     font-size: 40px;
     color: white;
   }
   .text{
     position: relative;
     bottom: 20px;
     color: #333;
     margin-left: 10px;
   }
   .right{
     position: relative;
     bottom: 20px;
     margin-left: 170px;
      color: #999;
   }
</style>
