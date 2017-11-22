<template>
   <div class="Ward">
       <div class="zhuan">
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
        <div class="old">
           <div class="retweet">
          <div  class="single-pic">
            <img :src="'/users/' + Arc.pics[0]">
          </div>
          <div class="single-cont">
          <p>
            @{{Arc.author.username}}
          </p>
          <h4 class="m-text-cut-2">
              {{Arc.content}}
              ​​​</h4>
          </div>
          </div> 
        </div>                              
                              


 </div>          
</template>

<script>
 import {mapState} from "vuex";
 import axios from 'axios'
export default {
    data () {
     return {
        dialogImageUrl: '',
        dialogVisible: false,
        file:false,
        files:'',  
        productImage:''  ,
        imageUrl: '',
        imgPath:"" ,
        input:"", 
        users:[]
     }
    },
    mounted:function(){
       var  id = this.$route.params.id;
       console.log(id);
       this.$axios('/users/finArt/' + id).then((res)=>{
        //    console.log(res.data.data);
        //    this.oldCont = res.data.data
        if(!res.data.data.retweeted_status){
          this.$store.commit("setArt",res.data.data);
        }else{
          this.input = '//'+'@' + res.data.data.author.username + ':' + res.data.data.content;
          this.users.push(res.data.data.author._id,res.data.data.retweeted_status.author._id);
          console.log(this.users);
          this.$store.commit("setArt",res.data.data.retweeted_status);  
        }
        //  console.log(res.data.data);
       })
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
                  author:this.user._id,
                  content:this.input,
                  pics:this.imgPath,
                  retweeted_status:this.Arc,
              }
              console.log(params)
            //   console.log(this.$route.params.id);
              var that = this;
              var id = this.$route.params.id;
              axios.post('/users/ward/'+ id,params).then((res)=>{
                  console.log(res)
                  if(res.data.error == 0){
                      console.log(11);
                    // that.$router.go(-1)  
                    location.href = '/home'
                  }
              }).catch((err)=>{
                  console.log(err)
              })
              

       }     
},
computed:{
    ...mapState([
         'user','Arc'
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
.old{
    margin: 50px 10px;
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
