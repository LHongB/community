<template>
  <div class="Guan">
    <com-tab></com-tab>
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
</div>
</template>

<script>
import comTab from '../../components/comTab/comTab'
export default {
    data(){
        return{
            users:''
        }
    },
    components:{
        'com-tab':comTab
    },
    mounted(){
        this.$axios('/users/guan').then((res)=>{
            console.log(res);
            this.users = res.data.users
        })
    }    
}
</script>

<style scoped lang="stylus">
.card-header {
    display: flex;

    .header-bg {
        background-image: url('../../../static/img/card-header-bg-headline.png');
        width: 100%;
        height: 60px;
        background-repeat: no-repeat;
        background-position: top right;
        background-size: 100% auto;
        position: absolute;
        top: -4px;
        left: 0;
    }

    .avatar {
        margin: 0.75rem 0 0.5rem 0.75rem;
        display: flex;
        position: relative;

    .avatar-img {
            width: 2.125rem;
            height: 2.125rem;
            border-radius: 50%;
            vertical-align: top;
            display: block;
        }

        .no-verified {
            display: none;
        }

        .icon-yellow-v, .icon-blue-v {
            position: absolute;
            right: -0.125rem;
            bottom: -0.125rem;
        }
    }
}
// .card-header{
//      padding: 10px;
// }
// .avatar-img{
//      border-radius: 50%;
//      border: none;
//      width: 35px;
//     //  float: left;    
// }
.user-info {
    max-width: 16rem; /* 避免名字过长 */
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0.6875rem 0.6875rem 0;
    line-height: 1rem;

    .user-name {
        color: #333;
    }

    .publish-data {
        color: #929292;

        .publish-source {
            padding-left: 0.5rem;
        }
    }
}
.a{
  float right   
  height 30px
  margin-top 20px  
}
</style>