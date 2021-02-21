<template>
  <div class="commentitems">
       <div class="conment" 
            v-for="item in commendChild"
            :key="item.id">
         <div class="commentitem">
            <div class="leftpart">
                <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
                <img v-else src="~assets/img/default_img.jpg" alt="">
            </div>
            <div class="rightpart">
                <div class="title">
                    <span>{{ item.userinfo.name }}</span>
                    <span>{{ item.comment_date }}</span>
                </div>
                <div class="content">
                     <p v-if="!temp">{{item.comment_content}}</p>
                     <p v-else>回复 <span>{{item.parent_user_info.name}}</span> :{{item.comment_content}}</p>
                    <span @click="responseClick(item.comment_id)">回复</span>
                </div>
            </div>
        </div>
        <commentchild-item :commendChild="item.child" 
                           :temp="true"
                           @postChild="postChild">
        </commentchild-item>
     </div>
  </div>
</template>

<script>
export default {
    //给这个组件起名字，然后可以自己调用自己
    name: 'commentchildItem',
    props:[
        'commendChild',
        'temp',
    ],
    methods: {
        responseClick(id) {
            this.$emit('postChild',id)
            //二级发送给一级
            this.$emit('postPublish',id)
        },
        //递归发送评论回复
        postChild(id) {
            //第三层发送给第二层，让第二层发送给第一层
            this.responseClick(id)
            //发送给commentList组件的消息
            this.$emit('postPublish',id)
            
        }

    }

}
</script>

<style lang="less" scoped>
.commentitems{
    padding: 0 0 0 40px ;

}
.commentParent {
    padding: 10px;
    .conment{
        border-bottom: 1px solid #e7e7e7;
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
                        span{
                            color: #478EF0;
                        }
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