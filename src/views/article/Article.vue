<template>
    <div class="Article">
        <nav-bar :userInfo="myuser"></nav-bar>
        <div class="detailinfo">
            <div class="video">
                <video v-if="model.content" :src="model.content" controls="controls"></video>
            </div>
            <div class="detailinfoText">
                <div class="title"> 
                    <span v-if="model.category">{{ model.category.title }}</span>
                    <span>{{ model.name }}</span>
                </div>
                <div class="detail">
                    <span v-if="model.userinfo">{{ model.userinfo.name }}</span>
                    <span>146.6万次观看</span>
                    <span>5281弹幕</span>
                    <span>{{ model.date }}</span>
                </div>
                <div class="button">
                    <div @click="collectionClick" :class="{activeColor: isactiveColor1}">
                        <span class="icon-star-full"></span>
                        <span>收藏</span>
                    </div>
                    <div @click="focusClick" :class="{activeColor: isactiveColor2}">
                        <span class="icon-bubble"></span>
                        <span>关注</span>
                    </div>
                    <div>
                        <span class="icon-redo2"></span>
                        <span>分享</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="detailparent" v-if="commendList">
            <home-detail :detailitem="item"
                        v-for="(item,index) in commendList" 
                        :key="index"
                        class="detailitem">
            </home-detail>
        </div>
        <comment-title :userInfo="myuser" 
                        :dataLength="length"
                        @postComment="postCommentData"
                        ref="commentIpt">
        </comment-title>
        <comment-list @commentLength="len => length=len"
                      @responseClick="postResponseClick"
                      ref="commentPublish">
        </comment-list>

    </div>
</template>

<script>
import NavBar from 'components/common/NavBar.vue'
import HomeDetail from 'views/home/childComps/HomeDetail.vue'
import CommentTitle from './childComps/CommentTitle.vue'
import CommentList from './childComps/CommentList.vue'
export default {
    data(){
        return {
            myuser: '',
            model: '',
            commendList: [],
            length: '',
            Postobj: {
                comment_content: '',
                comment_date: '',
                parent_id: null,
                article_id: null,
            },
            isactiveColor1: '',
            isactiveColor2: '',
            isactiveColor3: ''
            
        }
    },
    components: {
        NavBar,
        HomeDetail,
        CommentTitle,
        CommentList,
    },
    methods:{
        //获取文章信息
        async articleitemData(){
            const res = await this.request({
                method: 'GET',
                url: '/article/'+ this.$route.params.id
            })
            this.model = res.data[0]
            if(this.model) {
                this.focusInit()
            }
            console.log(this.model)
        },
        //获取评论信息
        async commendData(){
            const res = await this.request({
                method: 'GET',
                url: '/commend'
            })
            this.commendList = res.data
            console.log(this.commendList)
        },
        //获取自己的信息
        async myUserData() {
            if(localStorage.getItem('token')){
                const res = await this.request({
                method: 'GET',
                url: 'user/' + localStorage.getItem('id')
            })
            this.myuser = res.data[0]
            }
        },
        //发送评论
        async postCommentData(data) {
            const date = new Date()
            let m = date.getMonth() + 1
            let d = date.getDate()
            if(m < 10) {
                m = '0' + m
            }
            if(d < 10) {
                d = '0' + d
            }
            let str = `${m}-${d}`
            this.Postobj.comment_content = data
            this.Postobj.comment_date = str
            this.Postobj.article_id = this.$route.params.id
            const res = await this.request({
                method: 'POST',
                url: '/comment_post/' + localStorage.getItem('id'),
                data: this.Postobj
            })
            //评论后再次获取评论信息刷新页面
            this.$refs.commentPublish.commendData();
            this.Postobj.parent_id = ''
            if(res.status == 200) {
                this.Toast.fail('评论发表成功')
            }
            
        },
        //收藏文章
        async collectionClick() {
            if(localStorage.getItem('token')) {
                const res = await this.request({
                    method: 'POST',
                    url: '/collection/' + localStorage.getItem('id'),
                    data: {
                        article_id: this.$route.params.id
                    }
                })
                if(res.data.msg == '收藏成功'){
                    this.isactiveColor1 = true
                }else{
                    this.isactiveColor1 = false
                }
                this.Toast.fail(res.data.msg)
            }  
        },
        //进入页面后获取是否收藏
        async collectionInit() {
            if(localStorage.getItem('token')){
                const res = await this.request({
                    method: 'GET',
                    url: '/collection/' + localStorage.getItem('id'),
                    params: {
                        article_id: this.$route.params.id
                    }
                })
                // console.log(res)
                this.isactiveColor1 = res.data.success
            }
        },
        //点击关注作者
        async focusClick() {
            if(localStorage.getItem('token')) {
                const res = await this.request({
                    method: 'POST',
                    url: '/sub_scription/' + localStorage.getItem('id'),
                    data: {
                        sub_id: this.model.userid
                    }
                })
                if(res.data.msg == '关注成功'){
                    this.isactiveColor2 = true
                    
                }else{
                    this.isactiveColor2 = false
                    
                }
                this.Toast.fail(res.data.msg)
            }  
        },
        //进入页面后获取是否关注
        async focusInit() {
            if(localStorage.getItem('token')){
                const res = await this.request({
                    method: 'GET',
                    url: '/sub_scription/' + localStorage.getItem('id'),
                    params: {
                        sub_id: this.model.userid
                    }
                })
                this.isactiveColor2 = res.data.success
            }
        },
           


        // },
        postResponseClick(id) {
           this.Postobj.parent_id = id;
           this.$refs.commentIpt.focusIpt()
        }

    },
    created (){
        this.articleitemData()
        this.commendData()
        this.collectionInit()
        this.myUserData()
    },
    watch: {
        //监听活跃路由发生改变
        $route() {
            this.articleitemData()
            this.commendData()
            this.collectionInit()
            this.focusInit()
        }

    }

}
</script>

<style lang="less" scoped>
.Article{
    background: #fff;
}
.detailinfo{
    background-color: #fff;
    font-size: 4vw;
    .video{
        width: 100%;
        video{
            width: 100%;
        }
    }
    .detailinfoText{
        padding: 4.167vw;
        .title {
            span:nth-child(1) {
                padding: 0 2.778vw;
                color: #fb7299;
                background-color: #f4f4f4;
                border-radius: 2.778vw;
            }
        }
        .detail {
            padding: 3.778vw 2.778vw;
            span {
                color: #aaa;
                font-size: 12px;
                padding-right: 10px;
            }
            span:nth-child(1) {
                color: black;
                font-size: 4vw;
                margin-right: 10px;
            }
        }
        .button {
            display: flex;
            padding: 0 10px;
            color: #757575;
            div{
                margin-right: 10px;
                align-items: center;
            }
            span:nth-child(1){                
                font-size: 21px;
                padding-right: 3px;

            }
            span:nth-child(2){
                font-size: 13px;
            }
            
        }
    }
}
.detailparent{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    // flex: 1;
    .detailitem{
        margin: 5px 0;
        width: 45%;
    
    }
}
.activeColor {
    color: #fb7299;
}

</style>