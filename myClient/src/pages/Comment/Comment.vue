<template>
   <div class="article">            
        <div class="post-header">
            <div class="header-close" v-on:click="goBack">
                <svg class="close-icon" viewBox="0 0 46 72" style="display: inline-block; fill: currentcolor; position: relative; user-select: none; vertical-align: text-bottom;"><g><path d="M27.243 36l14.879-14.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23 31.758 8.122 16.879a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242L18.758 36 3.879 50.879A2.998 2.998 0 0 0 6.001 56a2.99 2.99 0 0 0 2.121-.879L23 40.242l14.879 14.879A2.991 2.991 0 0 0 40 56a2.998 2.998 0 0 0 2.121-5.121L27.243 36z"></path></g></svg>
            </div>
            <div class="post-send" >
                <!-- <span class="send-text">发送</span> -->
                <el-button v-if="imgPath || input.length > 0" 
                    @click="post" class="send-text" style="padding:5px;" type="warning">发送</el-button>
            </div>  
        </div>
        <div class="post-user">
            <div class="user-avatar">
                <img  class="header-avatar" v-if="user" :src="'/users/' + user.avatar">
                <span class="header-name">{{user.username}}</span>
            </div>
        </div>  
        <div style="margin: 20px 0;"></div>


<el-upload
  class="avatar-uploader"
  action="/users/img"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
 </el-upload>
 <el-input v-model="input" placeholder="请输入内容"></el-input>
                              
                              


 </div>          
</template>

<script>
 import {mapState} from "vuex";
 import axios from 'axios'
export default {
    data () {
     return {
       textarea3:'', 
        dialogImageUrl: '',
        dialogVisible: false,
        file:false,
        files:'',  
        productImage:''  ,
        imageUrl: '',
        imgPath:"" ,
        input:"",
        author:''  
     }
    },
methods:{
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res)
        this.imgPath = res.url

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        return isJPG && isLt2M;
      },
   goBack() {
     this.$router.go(-1)
   },
	getFiles(e) {
            var that = this;
            let file = e.target.files[0];
            var url = URL.createObjectURL(file);
            that.productImage = file;
            that.files = url;
            console.log(that.files);
			},   
       post(event){
        event.preventDefault();
              let params = {
                  content:this.input,
                  imgPath:this.imgPath,
                  author:this.author
              }
              console.log(params)
              console.log(this.$route.params.id);
              var id = this.$route.params.id;
              axios.post('/users/comment/'+ id,params).then((res)=>{
                  console.log(res)
                  if(res.data.error == 0){
                      this.$router.go(-1)
                  }
              }).catch((err)=>{
                  console.log(err)
              })
              

       }     
},
computed:{
    ...mapState([
         'user'
    ]),    
}
}
</script>

<style>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

.article {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
}
.post-header {
    width: 100%;
    height: 2rem;
    background-color: #ffffff;
    display: flex;
    flex-flow: rom;
}

.post-header .header-close {
    color: gray;
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
    flex: 1;
    position: relative;
}

.post-header .close-icon {
    width: 1.5rem;
    height: 1.5rem;
}

.post-header .post-send {
    width: 4rem;
    height: 100%;
    margin-right: 1rem;
    opacity: .7;
}

.post-header .post-send .send-text {
    margin: 0;
    padding: 0;
    margin-left: 1rem;
    margin-top: 0.5rem;
}
.post-user {
    width: 100%;
    height: 3rem;
    background-color: #ffffff;
}

.post-user .user-avatar {
    padding: 1rem;
    display: flex;
    flex-flow: row;
}

.post-user .user-avatar .header-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
}

.post-user .user-avatar .header-name {
    flex: 1;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    line-height: 2rem;
    margin-left: 1rem;
}
</style>
