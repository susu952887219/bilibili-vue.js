<template>
  <div class="comment">
      <div class="comment-title">
          <span>评论</span>
          <span>（{{ dataLength }}）</span>
      </div>
      <div class="comment-top">
          <img :src="myuser.user_img" alt="" v-if="myuser.user_img">
          <img v-else src="~assets/img/default_img.jpg" />
          <input v-model='content' ref="postipt" type="text" placeholder="说点什么吧">
          <button @click="commentPublish">发表</button>

      </div>
  </div>
</template>

<script>
export default {
    props: [
        'userInfo',
        'dataLength'
    ],
    data (){
        return{
            text: '',
            myuser: '',
            content: ''
        }
    },
    methods: {
        //获取自己的信息
        async myUserData() {
            const res = await this.request({
                method: 'GET',
                url: '/user/' + localStorage.getItem('id')
            })
            this.myuser = res.data[0]
        },
        commentPublish (){
            if(!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')){
                this.Toast.fail('请先登录')
                return
            }
            this.$emit('postComment',this.content);
            this.content = '';
        },
        focusIpt() {
            this.$refs.postipt.focus()
        }

    },
    created() {
       if(localStorage.getItem('token')){
            this.myUserData()
       }
    },
    update() {
        this.focusIpt()
    }

}
</script>

<style lang="less" scoped>
.comment {
    padding: 30px 10px 0 10px;
    .comment-title{
        font-size: 16px;
        span:nth-child(2) {
            color: #aaa;
            // margin-left: 10px;
        }
    }
    .comment-top{
        padding: 10px 0;
        display: flex;
        img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
        input{
            outline: none;
            border: 0;
            background-color: #f4f4f4;
            border-radius: 13px;
            // font-size: 12px;
            padding: 0 10px;
            margin-left: 10px;
        }
        button{
            outline: none;
            border: 0;
            border-radius: 15px;
            background-color: #fb7299;
            color: #fff;
            padding: 0 15px;

        }
    }


}

</style>