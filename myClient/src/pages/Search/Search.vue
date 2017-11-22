<template>
  <div class="search">
     <com-tab></com-tab>
         <div  class="card" v-for="(item,index) in weiboContent">
      <header class="card-header">
        <a class="avatar" href="/">
          <div class="avatar-wrapper border-around-1px">
            <img class="avatar-img" :src="'/users/' + item.author.avatar">
            <i class="iconfont" :class="calculateVerifiedClass(item.author.verified)"></i>
          </div>
        </a>
        <div class="user-info">
          <a href="/" class="user-name txt-l txt-cut">{{item.author.username}}</a>
          <div class="publish-data txt-xs">
            <span class="publish-created-at">{{formatTime(item.create_time)}}</span>
          </div>
        </div>
        <!-- <a > -->
          <el-dropdown size="small" class="card-operate">
          <span class="el-dropdown-link">
                      <i class="iconfont icon-down-arrow"></i>
          </span>            
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item ><a @click.prevent="collect(item)"><span v-show="item.collect===false">收藏</span><span v-show="item.collect===true">取消收藏</span></a></el-dropdown-item>
              <el-dropdown-item v-if="user.username == item.author.username"><a @click.prevent="deleted(item)">删除</a></el-dropdown-item>
              <el-dropdown-item v-if="user.username !== item.author.username">屏蔽</el-dropdown-item>
              <el-dropdown-item v-if="user.username !== item.author.username">举报</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>          
        <!-- </a> -->
      </header>
      <section class="card-body">
        <p class="default-content" v-html="formatContent(item.content)"></p>
        <div v-if="item.pics.length===1" class="single-pic">
          <img :src="item.pics[0].url">
        </div>
        <ul v-if="item.pics.length>=2" class="pic-list">
          <li v-for="(eachPic,index) in item.pics" @click="openPicViewer(eachPic)"><img :src="'/users/'+ eachPic"></li>
        </ul>
        <div class="retweet" v-if="item.retweeted_status!==undefined">
          <p>
            <a :href="item.retweeted_status.author"
               class="retweet-user">@{{item.retweeted_status.author.username}}</a>：{{item.retweeted_status.content}}
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
        <a class="comment" :href="'/article/'+ item._id ">
          <i class="iconfont icon-comment"></i>
          {{item.reply_num}}
        </a>
        <i class="separate-line"></i>
        <a class="like" @click.prevent="likeIt($event, item)" :class="{'liked': item.favorited===true}">
          <i class="iconfont icon-like"></i>
          {{item.likes_num}}
        </a>
      </footer>
    </div>
  </div>
</template>

<script>
import comTab from '../../components/comTab/comTab'
 import * as DateUtils from '../../utils/date-utils'
 import * as StringUtils from '../../utils/string-utils'
import {mapState} from "vuex"
export default {
    data(){
      return{
      }
    },
    computed: {
          ...mapState([
         'weiboContent','user'
    ]),
    },
    components:{
        'com-tab':comTab
    },
    methods:{
              formatTime(time) {
            return DateUtils.format(time);
        },
      formatContent(content) {
            return StringUtils.formatContent(content)
        },
      collect(item){
          let id = item._id;
          if (item.collect === false) {
          this.$axios('/users/collect/' + item._id).then((res)=>{
            console.log(res);
          })
             this.$set(item, 'collect', true)
        } else {
          this.$axios('/users/collectOff/' + item._id).then((res)=>{
            console.log(res);
          })
          this.$set(item, 'collect', false)
        }
      },
      deleted(item){
        console.log(item);
        let id = item._id;
        console.log(this);
        this.$axios('/users/deletedY/' + id).then((res)=>{
          console.log(res);
          if(res.data.error == 0){
            // this.$router.push({path:'/home'})
              // this.$router.go(0) 
                   location.reload()
          }
        })
      },
      calculateVerifiedClass: function (verifiedType) {
        let tempOutcome = ''
        switch (verifiedType) {
          case -1:
            tempOutcome = 'no-verified'
            break
          case 0:
            tempOutcome = 'icon-yellow-v'
            break
          case 1:
            tempOutcome = 'icon-blue-v'
            break
        }
        //console.log('verifiedType : ' + tempOutcome)
        return tempOutcome
      },
      openPicViewer(eachPic) {
//        console.log('targetPicUrl = ' + targetPicUrl)
//        console.log('openPicViewer in Home.')
            let targetPicUrl = '/users/'+ eachPic
        this.$store.commit('openPicViewer', {targetPicUrl: targetPicUrl})
      },
      addScrollEvent() {
        /*可以通过以下两句分别对比使用事件防抖前后的效果：*/
//      window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('scroll', this.myDebounce(this.handleScroll, 500))
        console.log('Scroll event added!')
      },
      handleScroll() {
        let pageHeight = Math.max(
          document.documentElement.clientHeight,
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight)
        let windowScrollHeight = window.scrollY || window.pageYOffset
        if (windowScrollHeight + window.innerHeight > pageHeight - 100) {
          this.hideAppAddTip()
          console.log('To push content')
          this.getContent()
        }
      },
      getContent() {
        let nextCursor = this.weiboContent.next_cursor
        if (nextCursor !== -1) {
          let targetUrl = '/apis/weibo-content' + '?targetCursor=' + nextCursor
          this.$http.get(targetUrl).then((res) => {
//            console.log('targetUrl = ' + targetUrl)
            if (res.body.errorNum === 0) {
//              console.log('res.data.data.card_group = ', res.data.data.card_group)
              //把已有的微博和加载的旧微博合并
              this.weiboContent.card_group = this.weiboContent.card_group.concat(res.data.data.card_group)
              //只更新下一个目标的指向，避免影响前一个目标的加载
              this.weiboContent.next_cursor = res.data.data.next_cursor
            } else {
              console.log('Get data error!')
            }
          })
        } else {
          console.log('targetCursor === -1 ,No new content.')
          this.bottomIsLoading = false
          this.noMore = true
        }
      },
      updateContent() {
        this.hideAppAddTip()
        this.scrollToTop()
        let previousCursor = this.weiboContent.previous_cursor
        this.topIsLoading = true
        if (previousCursor !== -1) {
          let targetUrl = '/apis/weibo-content' + '?targetCursor=' + previousCursor
          this.$http.get(targetUrl).then((res) => {
//          console.log('targetUrl = ' + targetUrl)
            if (res.body.errorNum === 0) {
              console.log('res.data.data.card_group = ', res.data.data.card_group)
              //把新的微博和已有的微博合并
              let _this = this
              this.weiboContent.card_group = res.data.data.card_group.concat(_this.weiboContent.card_group)
              //只更新前一个目标的指向，避免影响下一个目标的加载
              this.weiboContent.previous_cursor = res.data.data.previous_cursor
              //故意延迟消失，以显示效果
              setTimeout(() => {
                this.topIsLoading = false
              }, 500)
            } else {
              console.log('Get data error!')
            }
          })
        } else {
          console.log('targetCursor === -1 ,No new content.')
          setTimeout(() => {
            this.topIsLoading = false
            this.noNew = true
          }, 500)
          //3s后，隐藏没有新微博的提示
          setTimeout(() => {
            this.noNew = false
          }, 3000)
        }
      },
      scrollToTop() {
        window.scrollTo(0, 0)
      },
      myDebounce(func, wait) {
//        console.log('set my debounce')
        let timeout;
        return function () {
          clearTimeout(timeout)
          timeout = setTimeout(func, wait)
          /*一个事件发生wait毫秒后，不再触发该事件，才执行相应的处理函数。*/
        }
      },
      word(e,item){
        this.$axios('/users/word' + item._id).then((res)=>{
          console.log(res);
        })
      },
      likeIt(e, item) {
        //获取点击位置，用于设置动画的起始位置：
        console.log('clickedLikeBtnPos = ', e)
        this.clickedLikeBtnPos.pageX = e.pageX - parseInt(window.scrollX)
        this.clickedLikeBtnPos.pageY = e.pageY - parseInt(window.scrollY)
        console.log('this.clickedLikeBtnPos.pageY = ', this.clickedLikeBtnPos.pageY)
        console.log(item.favorited)
        console.log(item._id);
        if (item.favorited === false) {
          //显示点赞动画：
          this.showLikeAnimationWrapper = true
          this.$set(item, 'likes_num', item.likes_num + 1)
          this.$axios('/users/likesAdd/' + item._id).then((res)=>{
            console.log(11111);
            console.log(res);
            // console.log(res.data.data.likes_user);
          })
             this.$set(item, 'favorited', true)
        } else {
          this.$set(item, 'likes_num', item.likes_num- 1)
          this.$axios('/users/likesCut/' + item._id).then((res)=>{
            console.log(22222);
            console.log(res);
          })
          this.$set(item, 'favorited', false)
        }
      },
      beforeLikeEnter(el) {
        /*在动画块呈现之前，，将其位置设置到点赞的位置上：*/
        el.style.transform = 'scale(0.1)'
        el.style.top = this.clickedLikeBtnPos.pageY + 'px'
        el.style.left = this.clickedLikeBtnPos.pageX + 'px'
        console.log('beforeLikeEnter : this.clickedLikeBtnPos.pageY = ', this.clickedLikeBtnPos.pageY)
      },
      likeEnter(el, done) {
        /* eslint-disable no-unused-vars*/
        /*很神奇！必须要触发一次重绘才能实现位置移动的过渡效果？？？
        * 正在查资料搞清楚这个问题！*/
        let rf = el.offsetHeight
        el.style.transform = 'scale(1)'
        el.style.top = '190px'
        el.style.left = '50%'
        done()
      },
      afterLikeEnter(el) {
        //动画结束后，隐藏该动画块（需要enter钩子中调用done()）：
        /*一个坑：enter钩子中调用了done()的话，动画效果就没有了？？？
        * 这和css中动画声明的class有关。*/
        this.showLikeAnimationWrapper = false
        console.log('动画结束后，隐藏该动画块.')
      },
      hideAppAddTip() {
        this.$emit('hideAppAddTip')
//        alert('emit hideAppAddTip')
      }
    }

}
</script>

<style scoped lang="stylus">
.top-tip
  width 100%
  background-color #fed
  .to-top-tip
    height 2.75em
    display: flex
    align-items: center
    padding-left .75rem
    .icon-hot
      color: #ff8200
      margin-top -5px
      font-size: 22px
    .top-tip-content
      font-size: .875rem
      color: #FF8200;
      padding 0 .6875rem
      line-height: 1.5rem
      .iconfont
        margin-left: .5rem
        font-size: 0.775rem

//iconfont没选好，文字对不齐

// BUG!!会和footer的active覆盖！
/*.card:active*/
  /*background-color #ebebeb*/

.card-header
  display: flex
  .header-bg
    background-image url("../../../static/img/card-header-bg-headline.png")
    width: 100%
    height: 60px
    background-repeat: no-repeat
    background-position: top right
    background-size: 100% auto
    position: absolute
    top -4px
    left 0
  .avatar
    margin .75rem 0 .5rem .75rem
    display flex
    position relative
    .avatar-img
      width 2.125rem
      height 2.125rem
      border-radius 50%
      vertical-align top
      display block
    .no-verified
      display none
    .icon-yellow-v,.icon-blue-v
      position: absolute
      right: -.125rem
      bottom: -.125rem

.user-info
  max-width 16rem /*避免名字过长*/
  display: flex
  justify-content center
  flex-direction column
  padding: .6875rem .6875rem 0
  line-height: 1rem
  .user-name
    color #333
  .publish-data
    color #929292
    .publish-source
      padding-left .5rem

.card-operate
  position: absolute
  top: 0
  right: 0
  width: 3.75rem
  // height: 3.375rem
  &:active
    background-color #ebebeb
  .icon-down-arrow
    position: absolute
    top .5rem
    right .5rem


.card-body
  padding: .25rem .75rem .625rem
  line-height 1.35rem
.pic-list
  margin-top .4375rem
  width: 15.5rem
  overflow hidden
  & li
    float: left
  & img
    width 4.75rem
    height 4.75rem
    margin-right .25rem

.single-pic
  margin-top .3125rem
  max-height 12.5rem
  overflow hidden
  text-align left
  & img
    width: 11.25rem
    vertical-align top

.retweet
  padding: .625rem
  margin .4375rem -.75rem -.75rem
  background-color #f7f7f7

.card-footer
  width: 100%
  display: flex
  align-items center
  background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0%,#dadada),color-stop(50%,#dadada),color-stop(50%,rgba(0, 0, 0, 0)))
  background-image: -webkit-linear-gradient(top,#dadada 0,#dadada 50%,rgba(0, 0, 0, 0) 50%)
  background-image: linear-gradient(to bottom, #dadada 0, #dadada 50%, rgba(0, 0, 0, 0) 50%)
  /*从上到下，在1px的高度之中，从#dadada开始，直到0.5px时，将剩余的下半部分0.5px设置为透明，
  从而实现视觉上的0.5px。*/
  -webkit-background-size: 100% 1px
  background-size: 100% 1px
  background-repeat: no-repeat
  background-position: top
  & > a
    color #929292
    flex:1
    text-align center
    padding: .375rem 0
    display: inline-block
    height: 1.5rem
    line-height: 1.5rem
    &:active
      background-color #ebebeb


.liked
  color red !important

.like-animation-wrapper
  width: 50px
  height 50px
  line-height 50px
  text-align center
  color: #ff8200
  background-color: #f5f5f5
  border: 1px solid #eee
  border-radius 50%
  position: fixed
  /*top 90px*/
  /*left 50%*/
  /*水平居中成问题啊！*/
  transition all .3s linear
  margin-left -25px
  .icon-like
    font-size 32px

.content-tip
  width 100%
  text-align center
  min-height 50px
  margin-bottom .5625rem
  &:active
    background-color #ebebeb
  span
    display inline-block
    font-size .75rem
    line-height 19px
    color #7c7c7c
    margin 14px 0

.like-enter-to
  animation: like .8s .4s
/*动画性能有待优化，看起来帧数有些低？！*/

/*.like-enter-active*/
/*animation: like .4s .4s*/

@keyframes like {
  0% {
    transform: rotate(30deg)
  }
  20% {
    transform: rotate(-30deg)
  }
  40% {
    transform: rotate(30deg)
  }
  60% {
    transform: rotate(0deg)
  }
}
</style>
