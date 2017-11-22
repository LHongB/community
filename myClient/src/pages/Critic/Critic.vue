<template>  
  <div  class="cat">
      <div class="head">
         <div @click="goBack" class="header-close" >
                <svg viewBox="0 0 46 72" style="display: inline-block; fill: currentcolor; height: 100%; width: 100%; position: relative; user-select: none; vertical-align: text-bottom;"><g><path d="M40 33H15.243l7.878-7.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0l-13 13a2.998 2.998 0 0 0 0 4.242l13 13c.585.586 1.353.879 2.121.879s1.536-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L15.243 39H40a3 3 0 1 0 0-6z"></path></g></svg>
            </div> 
      <p>评论我的人</p>
      <div class="right"><i class="fa fa-ellipsis-h"></i></div>
   </div>
   <!-- {{msg[0]}} -->
   <div v-show="msg.length <= 0"><h2>暂时无人评论 {{msg.length}}</h2></div>
     <div  v-show="msg.length > 0" class="card" v-for="(item,index) in msg">
               <header class="card-header">
        <a class="avatar" href="/">
          <div class="avatar-wrapper border-around-1px">
            <img class="avatar-img" :src="'/users/' + item.author_id.avatar">          
          </div>
        </a>
        <div class="user-info">
          <a href="/" class="user-name txt-l txt-cut">{{item.author_id.username}}</a>
          <div class="publish-data txt-xs">
            <span class="publish-created-at">{{formatTime(item.create_time)}}</span>
          </div>
        </div>
        <a class="card-operate">
          <i class="iconfont icon-down-arrow"></i>
        </a>
      </header>
      <section class="card-body">
        <p class="default-content" v-if="!item.article_id" style="color:red">文章已被删除</p>
        <div class="default-content" v-if="item.article_id">
          <h5>对此文章进行了评论</h5>
        <router-link :to="'/article/'+ item.article_id._id " >
          <div class="old">
            <div class="retweet">
            <div  class="single-pic">
              <img :src="'/users/' + item.article_id.pics[0]">
            </div>
            <div class="single-cont">
            <p>
              <router-link to="">@{{item.target_id.username}}</router-link>
            </p>
            <h4 class="m-text-cut-2">
                {{item.article_id.content}}
                ​​​</h4>
            </div>
            </div> 
          </div>           
        </router-link>  
        </div>
      </section> 
    </div>
  </div>
</template>

<script>
// import {mapState} from "vuex";
 import * as DateUtils from '../../utils/date-utils'
export default {
 data(){
    return{
        msg:[]
    }
 },
 methods:{
      formatTime(time) {
         return DateUtils.format(time);
      },
      goBack() {
         this.$router.go(-1)
      },
 },
//      computed:{
//     ...mapState([
//          'msg'
//     ]),    
//   },
 mounted:function(){
     var that = this
     this.$axios('users/critic').then(function(res){
         console.log(res.data.msg[3].article_id);
        that.msg = res.data.msg
         that.$store.commit("criMsg",res.data.msg);
     })
     this.$axios('users/upCri').then((res)=>{
       console.log(res);
     })     
 }
}
</script>

<style lang="stylus" scoped>
 @import '../Article-detail/Article-detail.styl';
   .old{
    margin: 20px 10px;
    background: white;
}
.single-pic{
    width: 5.25rem;
    height: 5.25;
    margin: 0;
    display: inline-block;
}
.single-pic img{
    width: 100%;
    height: 100%;
    /* vertical-align: top; */
    object-fit: cover;
}
.single-cont{
    display: inline-block;
    margin:  0 10px;
    vertical-align: top;
   padding-top: 20px;
    /* flex-direction: column; */
        /* display: flex;
            justify-content: center; */
}
.single-cont p,.single-cont h4{
    margin: 10px 0;
}
.single-cont h4{
color: gray;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>

