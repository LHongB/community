import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import axios from "axios";
//使用常量替代 Mutation 事件类型，多人协作的大型项目中，这会很有帮助。
const OPEN_PICTURE_VIEWER = 'openPicViewer'
const CLOSE_PICTURE_VIEWER = 'closePicViewer'

//在发布环境下关闭严格模式，以避免性能损失：
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    switchPicViewer: false,
    viewTargetPicUrl: '',
    registThen:[],
    registShow:false, 
    user:{},
    userShow:false,
    count:'',
    msg:[],
    Arc:'',
    weiboContent:''
  },
  mutations: {
    [OPEN_PICTURE_VIEWER](state, payload){
      // console.log('OPEN PicViewer in store/index.js')
      state.switchPicViewer = true
      // console.log('payload.targetPicUrl：' + payload.targetPicUrl)
      state.viewTargetPicUrl = payload.targetPicUrl
    },
    [CLOSE_PICTURE_VIEWER](state){
      // console.log('close PicViewer in store/index.js')
      state.switchPicViewer = false
    },
    setRegist:function(state,value){
      state.registThen = value;
      state.registShow = true;
  },
  setLogin:function(state,value){
    state.user = value;
    state.userShow = true;
  },
  setMes:function(state,value){
    state.count = value;
  },
  criMsg:function(state,value){
    state.msg = value;
  },
  setArt:function(state,value){
    state.Arc = value;
  },
  setSearch:function(state,value){
    state.weiboContent = value;
  }
  },
  actions:{
      // 注册请求
      requestRegist:function(state,value){
        axios.post("/users/register",value)
        .then(res=>{
            console.log(res);
            state.commit("setRegist",res.data);
             if(res.data.err == 0){
              location.href="/login"; 
             }      
        });
    },
  },
})
