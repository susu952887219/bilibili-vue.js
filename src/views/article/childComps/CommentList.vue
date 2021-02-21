<template>
  <div class="commentParent">
     <div class="conment" 
          v-for="item in commendList"
          :key="item.id">
         <div class="commentitem">
            <div class="leftpart">
                <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
                <img v-else src="~assets/img/default_img.jpg" alt="">
            </div>
            <div class="rightpart">
                <div class="title">
                    <span>{{item.userinfo.name}}</span>
                    <span>{{item.comment_date}}</span>
                </div>
                <div class="content">
                    <p>{{item.comment_content}}</p>
                    <span @click="responseClick(item.comment_id)">回复</span>
                </div>
            </div>
        </div>
        <comment-item :commendChild="item.child"
                       @postPublish="responseClick">
        </comment-item>
     </div>   
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
export default {
    data (){
        return {
            commendList: ''
        }
    },
    components: {
        CommentItem,
    },
    methods: {
        //获取评论信息
        async commendData(){
            const res = await this.request({
                method: 'GET',
                url: '/comment/' + this.$route.params.id
            })
            if(res.data) {
                this.$emit('commentLength',res.data.length);
            }
            this.commendList = this.changeCommentData(res.data)
            console.log(this.commendList)
        },
        changeCommentData(data) {
            //使用递归改造评论数据结构
            function fn(temp) {
                let arr1 = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].parent_id == temp) {
                        arr1.push(data[i]);
                        data[i].child = fn(data[i].comment_id);
                    }
                }
                return arr1;
            }
            return fn(null);
        },
        responseClick(id) {
            console.log(id)
           this.$emit('responseClick',id)
        }
    },
    created (){
        this.commendData();
    }

}
</script>

<style lang="less" scoped>
.commentParent {
    padding: 10px;
    border-bottom: 1px solid #e7e7e7;
    .conment{
        // border-bottom: 1px solid #e7e7e7;
        .commentitem {
            display: flex;
            
            padding: 10px 0;
            .leftpart {
                margin-right: 10px;
                img {
                    width: 35px;
                    height: 35px;
                }
            }
            .rightpart {
                flex: 1;
                .title{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    color: #555;
                    margin-bottom: 1.389vw;
                }
                .content{
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    p{
                        margin-bottom: 5px;
                    }
                    span{
                        color: #f00;
                        white-space:nowrap;
                    }

                }
            }
        }
    }
}

</style>