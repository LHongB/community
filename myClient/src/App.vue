<template>
  <div id="app">
    <div class="main-body" v-show="!switchPicViewer">
      <transition :name="transitionName">
        <router-view ref="home" @hideAppAddTip="hideAddTip()"></router-view>
      </transition>
    </div>
    <picture-viewer v-show="switchPicViewer"></picture-viewer>
    <div v-show="showAddTip" class="addToHomeTip txt-cut">
      <i class="close-add-tip-icon" @click.prevent="hideAddTip()">x</i>
      <section class="icon-block"></section>
      <span>添加到主屏幕，不会迷路哦~</span></div>
  </div>
</template>

<script>
import pictureViewer from './components/pictureViewer/pictureViewer.vue'
export default {
  name: 'app',
  data(){
    return {
      transitionName: 'slide-left',
      pageVerticalPos: 0,
      /*iOS中浏览器直接访问站点时，navigator.standalone为false,从主屏启动webapp 时，navigator.standalone为true， 我们可以通过navigator.standalone这个属性获知用户当前是否是从主屏访 问我们的webapp的。*/
      showAddTip: navigator.standalone !== undefined ? !navigator.standalone : false
    }
  },
  components: {
    'picture-viewer': pictureViewer
  },
  watch: {
    switchPicViewer: function (val, oldVal) {
      console.log(this.$router.name)
      console.log(this.pageName)
      if (val === false) {
        //关闭图片时，还原页面位置：
//        console.log('resetPagePos')
        this.resetPagePos()
      } else if (val === true) {
        //打开图片时，保存当前页面位置：
        this.pageVerticalPos = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
//        console.log('Saved pageVerticalPos =', this.pageVerticalPos)
      }
    }
  },
  methods: {
    resetPagePos() {
//      console.log('window.scrollTo()')
      this.$nextTick(function () {
        window.scrollTo(0, this.pageVerticalPos)
      })
    },
    hideAddTip() {
      /*设置成了当Home中开始加载内容或更新内容时，通过父子组件事件传递，隐藏该提示。*/
      console.log('this.showAddTip = false')
      this.showAddTip = false
//      alert('hided hideAppAddTip')
    }
  },
  computed: {
    switchPicViewer() {
      return this.$store.state.switchPicViewer
    }
  }
}
</script>

<style lang="stylus">
  /*路由跳转动画*/
  .slide-to-left-enter-active,.slide-to-right-leave-active,.slide-to-left-leave-active,.slide-to-right-enter-active
    transition all .3s ease-out
  /*进入的组件什么也不做，只是保持透明，准备替代离开的组件。*/
  .slide-to-left-enter,.slide-to-left-enter-active
    opacity 0
  /*离开的元素向左过渡位移离开，并逐渐透明。*/
  .slide-to-left-leave-active
    transform translate(80%)
    opacity 0

  .slide-to-right-enter,.slide-to-right-enter-active
    opacity 0
  .slide-to-right-leave-active
    transform translate(-80%)
    opacity 0
    /*仍有bug，当向右滑动时，页面会自动变宽。
    用给父元素声明overflow hidden解决了。*/

body
  background-color #f2f2f2
#app
  /*display none*/
  .head-part
    position: fixed
    top 0
    left 0
    width:100%
    z-index 20
 


  .main-body
    position relative
    overflow hidden

  .addToHomeTip
    position: fixed
    bottom 10px
    left 50%
    transform: translateX(-50%)
    font-size: .9275rem
    background-color #f8f8f8
    text-align: center
    line-height: 50px
    padding 0 10px 0 60px
    border: 1px solid #d2caca
    border-radius 5px
    z-index: 21
    overflow visible
    .close-add-tip-icon
      width: 18px
      line-height: 18px
      font-size: 12px
      position: absolute
      top 0
      right 0
    .icon-block
      width 40px
      height 40px
      background url("../static/img/favicon-min.jpg") 0 0 / contain no-repeat
      border-radius 5px
      position: absolute
      top 5px
      left 10px
    &:after
      content ''
      width 0
      height 0
      border solid rgba(0,0,0,0)
      border-width 10px
      border-top-color #d2caca
      position: absolute
      bottom -21px
      left 50%
      transform: translateX(-11px)
</style>
