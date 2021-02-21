<template>
  <div class="nav-bar">
    <div class="logo" @click="$router.push({ path: '/home' },onComplete => {},onAbort => {})">
      <img src="~assets/img/logo.png" alt="bilibili">
    </div>
    <div class="center">
      <van-search placeholder="请输入搜索关键词" shape="round" />
    </div>
    <div class="right">
      <img v-if="userInfo.user_img" 
            :src="userInfo.user_img" 
            alt=""
            @click="$router.push({ path: '/user' },onComplete => {},onAbort => {})">
      <img v-else src="~assets/img/default_img.jpg" 
                  alt=""
                  @click="$router.push('/login')">
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  props :[
    'userInfo',
  ],

}
</script>

<style scpoed>
.nav-bar {
  height: 12.222vw;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo{
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo img{
  width: 80%;
}
.center {
  flex: 1;
  font-size: 12px;
}
.center .search{
  font-size: 12px;

}
.right {
  display: flex;
  align-items: center;
  justify-content: center;
}
.right img{
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.right p{
  padding: 5px 10px;
  margin: 0 5px;
  color: #fff;
  font-size: var(--font-size);
  background: #FB7299;
  border-radius: 3px;

}


</style>