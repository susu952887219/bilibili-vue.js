<template>
<div class="userdetail">
    <div>
        <div class="user-img">
            <img v-if="userInfo.user_img" :src="userInfo.user_img" alt="" />
            <img v-else src="~assets/img/default_img.jpg" />
        </div>
        <div class="user-edit">
            <div>
                <p><span>0</span><span class="user-text">粉丝</span></p>
                <p><span>0</span><span class="user-text">关注</span></p>
                <p><span>0</span><span class="user-text">获赞</span></p>
            </div>
            <div @click="$router.push('/edit')">
                <div class="edit-btn">编辑资料</div>
            </div>
        </div>
        
    </div>
    <div>
        <h2>{{userInfo.name}}</h2>
        <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
        <p v-else>这个人很神秘，什么都没有写</p>
    </div>
</div>
  
</template>

<script>
export default {
    props: [
        'userInfo',
    ],

}
</script>

<style scoped>
.userdetail{
    background: #fff;
    padding: 5px 12px;

}
.userdetail>div:nth-child(1){
    display: flex;
}
.userdetail .user-img{
    margin-right: 20px;
}
.userdetail .user-img img{
    width: 85px;
    height: 85px;
    border-radius: 50%;
}
.userdetail .user-edit{
    flex: 1;
}
.userdetail .user-edit div:nth-child(1){
    display: flex;


}
.userdetail .user-edit div:nth-child(1) p{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;/*纵向排列 */
    font-size: 14px;
    margin: 10px 0;
}
.userdetail .user-edit div:nth-child(1) p .user-text{
    color:#aaa;
}
.userdetail .user-edit div:nth-child(1) p:nth-child(1),
.userdetail .user-edit div:nth-child(1) p:nth-child(2){
    border-right: 1px solid #ccc;
}
.userdetail .user-edit div:nth-child(2){
    padding: 2px 10px;
}
.userdetail .user-edit div:nth-child(2) .edit-btn {
    border: 1px solid #fb79af;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fb79af;
    border-radius: 4px;
    font-size: 16px;

}
.userdetail>div:nth-child(2) h2{
    margin: 10px 0 3px 0;
    font-weight: 400;
}
.userdetail>div:nth-child(2) p{
    padding: 0;
    margin: 10px 0;
    color: #999;
}

</style>