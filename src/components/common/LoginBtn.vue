<template>
  <div class="btn">
      <div class="login-btn" @click="btnClick">{{ content }}</div>
  </div>
</template>

<script>
export default {
    props :[
        'content',
    ],
    methods :{
        btnClick (){
            this.$emit('handleSubmit');
        }
    }

}
</script>

<style scoped>
.btn {
    margin: 15px 10px;
}
.btn .login-btn{
    height: 12.5vw;
    background-color: #FF9DB5;
    color: #fff;
    font-size: 4.444vw;
    border-radius: 6.25vw;
    display: flex;
    align-items: center;
    justify-content: center;


}
</style>