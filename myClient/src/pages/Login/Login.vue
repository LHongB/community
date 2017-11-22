<template>
<div class="login">
    <div class="ico">
        <img src="../../../static/img/favicon.png" alt="">
    </div>
    <div class="xx">
<el-input class="a" type="email" v-model="loadName" placeholder="请输入邮箱"></el-input>
<el-input class="a" type="password" v-model="pwd" placeholder="请输入密码"></el-input>
    </div>
  <el-button type="warning" @click="open5" >登录</el-button>
</div>
</template>

<script>
 import {mapState} from "vuex";
export default {
  data() {
    return {
     	  pwd:"",
    loadName:""
    }
  },
  methods:{
      open5 () {
            var that= this;
        //   ev.preventDefault();
         this.$axios.post('/users/login',{
             loadName:that.loadName,
             pwd:that.pwd
         }).then(function(result){           
              console.log(result);
                if(result.data.err == 0){
                   that.user = result.data.user;
                //  state.commit("setRegist",res.data);
                 location.href = '/home'
                }
          }).catch(function(err){
              console.log(err);
          })

      }
  },
    computed:{
    ...mapState([
         'user'
    ]),    
  },
}
</script>

<style scoped lang="stylus">
   .login
     text-align center
     padding 50px
    img 
      text-align center
   .a
    width 300px
    margin 10px
</style>
