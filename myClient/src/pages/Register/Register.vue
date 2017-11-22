<template>
<div class="register">
 <div> 
      <div>
        <p>登录名</p>
		 <input type="email" placeholder="常用邮箱地址"  v-verify.grow1="loadName" v-model="loadName">
	    <label v-verified="verifyError.loadName"></label>
	 </div>
  <div>
    <p>呢称</p>
    <input type="text" placeholder="4-24位字符 : 支持中文、英文、数字、'-'" v-verify.grow1="username" v-model="username"/>
    <label v-verified="verifyError.username"></label>
  </div>
  <div>
    <p>设置密码</p>
    <input type="password" placeholder="6-18位字符 : 支持字母、数字、'-'、'_''" v-verify.grow1="pwd" v-model="pwd"/>
    <label v-verified="verifyError.pwd"></label>
  </div>
  <label>{{registThen.msg}}</label>
  <el-button type="warning" v-on:click="open5">立即注册</el-button>

 </div> 
</div>
</template>

<script>

import Vue from "vue";
import verify from "vue-verify-plugin";
Vue.use(verify);
 import {mapState} from "vuex";
export default{
  data:function(){
    return {
      username:"",
	  pwd:"",
    loadName:"",
    }
  },
  methods:{
    open5:function(){
      if(this.$verify.check()){
         var that= this;
        //通过验证  
            var data = {
                loadName:this.loadName,
                username:this.username,
                pwd:this.pwd
            };
            this.$store.dispatch("requestRegist",data);  
      }   
    }
  },
  verify:{
	loadName:[
	   "required",
	   {
		test:function(val){
					console.log(val);
				if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(val)){
					return false;
				}
				return true;
				},
				message:"请填写正确的邮箱格式"		   
			}
	],  
    username:[
      "required",
      {
        test:function(val){
			console.log(val);
          if(!/^[\u4e00-\u9fff\w]{4,24}$/.test(val)){
            return false;
          }
          return true;
        },
        message:"请填写正确的用户名"
      }
    ],
    pwd:[
		"required",
		{
		  test:function(val){
			  if(!/^[a-z0-9_-]{6,18}$/.test(val)){
                  return false; 
			  }
			  return true;
		  },	
        message:"密码格式不正确"
		}
	]
  },
  computed:{
    verifyError:function(){
      return this.$verify.$errors;
    },
    ...mapState([
         'registThen'
    ]),    
  }

};
</script>

<style lang="stylus" scoped>
    .register {
      padding 20px
      text-align : center;
    }
    input {
      margin : 10px;
      width : 300px;
      height 30px;
    }
    p
     color #999999 
    label
      display block
      color red
      margin-bottom 20px

</style>
