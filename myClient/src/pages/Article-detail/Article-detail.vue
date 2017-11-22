<template>
<div class="detail">
   <div class="head">
         <div @click="goBack" class="header-close" >
                <svg viewBox="0 0 46 72" style="display: inline-block; fill: currentcolor; height: 100%; width: 100%; position: relative; user-select: none; vertical-align: text-bottom;"><g><path d="M40 33H15.243l7.878-7.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0l-13 13a2.998 2.998 0 0 0 0 4.242l13 13c.585.586 1.353.879 2.121.879s1.536-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L15.243 39H40a3 3 0 1 0 0-6z"></path></g></svg>
            </div> 
      <p>微博正文</p>
      <div class="right"><i class="fa fa-ellipsis-h"></i></div>
   </div>
     <div  class="card">
      <header class="card-header">
        <a class="avatar" href="/">
          <div class="avatar-wrapper border-around-1px">
            <img class="avatar-img" :src="'/users/' + item.author.avatar">          
          </div>
        </a>
        <div class="user-info">
          <a href="/" class="user-name txt-l txt-cut">{{item.author.username}}</a>
          <div class="publish-data txt-xs">
            <span class="publish-created-at">{{formatTime(item.create_time)}}</span>
          </div>
        </div>
        <a class="card-operate">
          <i class="iconfont icon-down-arrow"></i>
        </a>
      </header>
      <section class="card-body">
        <p class="default-content" v-html="formatContent(item.content)"></p>
        <div v-if="item.pics.length===1" class="single-pic">
          <img :src="item.pics[0].url">
        </div>
        <ul v-if="item.pics.length>=2" class="pic-list">
          <li v-for="(eachPic,index) in item.pics" @click="openPicViewer(eachPic)"><img :src="'/users/' + eachPic"></li>
        </ul>
        <div class="retweet" v-if="item.retweeted_status!==undefined">
          <p class="retweet-user">
            <a :href="item.retweeted_status.author"
               >@{{item.retweeted_status.author.username}}</a>：{{item.retweeted_status.content}}
          </p>
          <div v-if="item.retweeted_status.pics.length===1" class="single-pic">
            <img :src="'/users/' + item.retweeted_status.pics[0]"
                 @click="openPicViewer(item.retweeted_status.pics[0])">
          </div>
          <ul v-if="item.retweeted_status.pics.length>=2" class="pic-list">
            <li v-for="(eachPic,index) in item.retweeted_status.pics"><img :src="'/users/'+ eachPic"></li>
          </ul>
        
        </div>
      </section>
      <footer class="card-footer border-1px border-top-1px txt-s no-text-select">
        <a class="forward" :href="'/ward/' + item._id">
          <i class="iconfont icon-forward"></i>
          {{item.reposts_count}}
        </a>
        <i class="separate-line"></i>
        <a class="comment" :href="'/reply/'+ item._id ">
          <i class="iconfont icon-comment"></i>
          {{item.reply_num}}
        </a>
        <i class="separate-line"></i>
        <a class="like" @click.prevent="likes($event, item)" :class="{'liked': item.favorited===true}">
          <i class="iconfont icon-like"></i>
          {{item.likes_num}}
        </a>
      </footer>
    </div> 
    <!-- @tab-click="handleClick" -->
    <el-tabs   style="padding:0 20px;">
        <el-tab-pane label="转发" name="first">
            <div v-for="(item,index) in ward">
                   <div  class="card">
      <header class="card-header">
        <a class="avatar" href="/">
          <div class="avatar-wrapper border-around-1px">
            <img class="avatar-img" :src="'/users/' + item.author.avatar">          
          </div>
        </a>
        <div class="user-info">
          <a href="/" class="user-name txt-l txt-cut">{{item.author.username}}</a>
          <div class="publish-data txt-xs">
            <span class="publish-created-at">{{formatTime(item.create_time)}}</span>
          </div>
        </div>
        <a class="card-operate">
          <i class="iconfont icon-down-arrow"></i>
        </a>
      </header>
      <section class="card-body">
        <p class="default-content" v-html="formatContent(item.content)"></p>
      </section>
    </div> 
            </div>
        </el-tab-pane>
        <el-tab-pane label="评论"  name="second">
          <el-collapse  accordion="" >
            <div class="item" v-for="(item,index) in replys">
              <div class="card-header" >
              <a class="avatar" href="/">
                <div class="avatar-wrapper border-around-1px">
                  <img class="avatar-img" :src="'/users/' + item.author.avatar">          
                </div>
              </a>
            <div class="user-info">
          <a href="/" class="user-name txt-l txt-cut">{{item.author.username}}</a>
          <div class="publish-data txt-xs">
            <span class="publish-created-at">{{formatTime(item.create_time)}}</span>
          </div>
        </div>
        <span class style="color:gray; margin:20px 10px 0 140px;">
          <el-dropdown size="mini"  >
          <i class="iconfont icon-comment"></i> {{item.comment_num}}
            <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link :to="'/comment/' + item._id" >回复</router-link></el-dropdown-item>
          <el-dropdown-item>举报</el-dropdown-item>
           </el-dropdown-menu>
          </el-dropdown>
        </span>
        <a class="like" style="color:gray; margin-top:20px;" @click.prevent="likes($event, item)" :class="{'liked': item.favorited===true}">
          <i class="iconfont icon-like"></i>{{item.likes_num}}
        </a>
              </div>
        <section class="card-body">
        <p class="default-content" >
          {{item.content}}
          <el-collapse-item @click.native="gain(item)"  style="background-color: #f7f7f7;">
          <template slot="title">共{{comments.length}}条回复....</template>
            <div class="item" v-for="(item,index) in comments">
              <div class="card-header">
              <a class="avatar" href="/">
                <div class="avatar-wrapper border-around-1px">
                  <img class="avatar-img" :src="'/users/' + item.author.avatar">          
                </div>
              </a>
                <div class="user-info">
              <a href="/" class="user-name txt-l txt-cut">{{item.author.username}}</a>
              <div class="publish-data txt-xs">
                <span class="publish-created-at">{{formatTime(item.create_time)}}</span>
              </div>
            </div>
                     <span class style="color:gray; margin:20px 10px 0 140px;">
          <el-dropdown size="mini" >
          <i class="iconfont icon-comment"></i>
         
            <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link :to="'/mult/'+ item._id " >回复</router-link></el-dropdown-item>
          <el-dropdown-item>举报</el-dropdown-item>
           </el-dropdown-menu>
          </el-dropdown>
        </span>
        <a class="like" style="color:gray; margin-top:20px;" @click.prevent="likes($event, item)" :class="{'liked': item.favorited===true}">
          <i class="iconfont icon-like"></i>{{item.likes_num}}
        </a>                     
              </div>
          <section class="card-body">
              <a>{{item.author.username}}</a>回复:<a v-show="item.oldauthor">{{item.oldauthor}}</a>
               <p class="default-content">{{item.content}}</p>
          </section>
            </div>
          </el-collapse-item>  
          </p>

      </section>     
            </div>
      </el-collapse>      
        </el-tab-pane>
        <el-tab-pane label="赞" name="third">
            <div v-for="(item,index) in users">
              <header class="card-header zan">
                <a class="avatar" href="/">
                  <div class="avatar-wrapper border-around-1px">
                    <img class="avatar-img" :src="'/users/' + item.avatar">          
                  </div>
                </a>
                <div class="user-info">
                  <a href="/" class="user-name txt-l txt-cut">{{item.username}}</a>
                </div>
              </header>         
            </div>
        </el-tab-pane>
    </el-tabs>        
</div>
</template>

<script>
 import * as DateUtils from '../../utils/date-utils'
 import * as StringUtils from '../../utils/string-utils'
export default {
  data() {
    return {
      item: {author:''},
      replys:'',
      ward:'',
      id:this.$route.params.id,
      comments:'',
      users:''
    };
  },
  mounted() {
    var that = this;
    var id = this.$route.params.id;
    // console.log(id);
    this.$axios.post("/users/article/" + id, { id }).then(function(res) {
      console.log(res);
      if (res.data.error !== 0) {
        console.log("Get data error!");
        return;
      }
      that.item = res.data.data;
      that.replys = res.data.replys;
      that.users = res.data.users;
    });
    this.$axios("/users/wardArt/" + id).then((res)=>{
      console.log(res);
      that.ward = res.data.data;
    });
  },
  methods: {

      formatTime(time) {
            return DateUtils.format(time);
        },
      formatContent(content) {
            return StringUtils.formatContent(content)
        },
       goBack() {
     this.$router.go(-1)
   },
      likes(e, item) {     
        console.log(item.favorited);
        //获取点击位置，用于设置动画的起始位置：
        if (item.favorited === false) {
          // console.log(22222);
          //显示点赞动画：
          this.$set(item, 'likes_num', item.likes_num + 1)
          this.$axios('/users/likesAdd/' + item._id).then((res)=>{
            // console.log(res);
            // console.log(res.data.data.likes_user);
          })
             this.$set(item, 'favorited', true)
            //  console.log(item.favorited);
        } else {
          // console.log(3333);
          this.$set(item, 'likes_num', item.likes_num - 1)
          this.$axios('/users/likesCut/' + item._id).then((res)=>{ 
            console.log(res);
          })
          this.$set(item, 'favorited', false)
          console.log(item.favorited);
        }
      },   
   gain(item){
      //  console.log(item._id);
       let id = item._id;
       this.$axios.post("/users/Comments/" + id,{id}).then((res)=>{
         console.log(res)
        //  console.log(res.data.comments[1].oldauthor.loadName);
         this.comments = res.data.comments
       })
   },
      // handleClick(tab, event) {
      //    var id = this.$route.params.id; 
      //   console.log( event.target.id);
      //   if(event.target.id == 'tab-second'){
                    
      //   }
      // },
    openPicViewer(targetPicUrl) {
      //        console.log('targetPicUrl = ' + targetPicUrl)
      //        console.log('openPicViewer in Home.')
      this.$store.commit("openPicViewer", { targetPicUrl: targetPicUrl });
    },    
  }
};
</script>

<style lang="stylus" scoped>
  @import 'Article-detail.styl';
</style>
