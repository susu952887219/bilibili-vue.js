<template>
    <div class = "login-top-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>

</template>

<script>
export default {
    name: 'LoginTopBar'

}
</script>

<style scoped>
.login-top-bar {
    height: 44px;
    background-color: #fff;
    display: flex;
    line-height: 44px;
    text-align: center;
};
.left,
.right {
    width: 100px;
}
.login-top-bar div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content : center;
    font-size: 4.444vw;/*适应不同手机的字体大小*/
}
/* .login-top-bar .center {
    font-size: 3.611vw;
} */
</style>