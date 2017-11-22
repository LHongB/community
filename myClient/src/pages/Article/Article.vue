<template>
 <div class="article">          
        <div class="post-header"> 
            <div class="header-close" v-on:click="goBack">
                <svg class="close-icon" viewBox="0 0 46 72" style="display: inline-block; fill: currentcolor; position: relative; user-select: none; vertical-align: text-bottom;"><g><path d="M27.243 36l14.879-14.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23 31.758 8.122 16.879a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242L18.758 36 3.879 50.879A2.998 2.998 0 0 0 6.001 56a2.99 2.99 0 0 0 2.121-.879L23 40.242l14.879 14.879A2.991 2.991 0 0 0 40 56a2.998 2.998 0 0 0 2.121-5.121L27.243 36z"></path></g></svg>
            </div>
            <div class="post-send" >
                <!-- <span class="send-text">发送</span> -->
                <el-button v-if="file || textarea2.length > 0" 
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
        <form action="" ref="post" enctype="multipart/form-data">
       <div class="conent">
            <el-input
            name="content"
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="textarea2">
            </el-input>                    
        </div>  
			<div class="image">
			
			<input type="file" multiple accept="image/*" name="photo" @change="getFile($event)" >
			</div>       
        </form>            
 </div>          
</template>

<script>
 import {mapState} from "vuex";
export default {
    data () {
     return {
       textarea2:'', 
        dialogImageUrl: '',
        dialogVisible: false,
        file:false,
        files:'',  
        productImage:''     
     }
    },
methods:{
   goBack() {
     this.$router.go(-1)
   },
			getFile(e) {
            var that = this;
            let file = e.target.files[0];
            var url = URL.createObjectURL(file);
            that.productImage = file;
            that.files = url;
			},   
       post(event){
        // this.$refs.newupload.submit()
        // this.$axios.post('/users/article',{
        //     content:this.textarea2
        // }).then(res=>{
        //     console.log(res);
        // })n
        event.preventDefault();
                var that = this;
               let myform= this.$refs.post;
               console.log(myform);
				let formData = new FormData(myform)
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				this.$axios.post('/users/article', formData, config).then(function(res) {
					console.log(res)
                      if(res.data.error == 0){
                          location.href='/home'
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

<style scoped>
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
