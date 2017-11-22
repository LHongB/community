<template>
    <div class="head">
         <div @click="goBack" class="header-close" >
                <svg viewBox="0 0 46 72" style="display: inline-block; fill: currentcolor; height: 100%; width: 100%; position: relative; user-select: none; vertical-align: text-bottom;"><g><path d="M40 33H15.243l7.878-7.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0l-13 13a2.998 2.998 0 0 0 0 4.242l13 13c.585.586 1.353.879 2.121.879s1.536-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L15.243 39H40a3 3 0 1 0 0-6z"></path></g></svg>
            </div> 
      <p></p>
      <div class="right"><i class="fa fa-ellipsis-h"></i></div>
   </div>
</template>

<script>
export default {
    methods:{
    goBack() {
         this.$router.go(-1)
      }, 
    }   
}
</script>

<style>
 .head {
    color: gray;
    width: 100%;
    max-width: 100%;
    margin-bottom: 10px;
    text-align: center;
    background-color: #f5f5f5;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 1);
    box-shadow: 0 0 0 rgba(0, 0, 0, 1);
    display: -wbekit-flex;
    display: flex;
    /* flex-flow nowrap row */
    z-index: 1;
    overflow: hidden;
    margin: 0;
    padding: 0;
}

p {
    width: 100px;
    font-size: 20px;
    padding: 12px 0;
    margin: 0 auto;
}

.header-close {
    float: left;
    width: 1.5rem;
    height: 2rem;
    margin: 0.5rem;
}

.right {
    float: right;
    padding: 12px;
}
</style>
