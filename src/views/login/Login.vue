<template>
    <div class="login"> 
        <login-top-bar>
            <div slot="center">登录bibili</div>
            <div slot="right" style="font-size: 3.611vw" @click="$router.push('/register')">用户登录</div>
        </login-top-bar>
        <login-text style = "margin: 15px 0"
            label="账号" 
            placeholder="请输入账号" 
            rule="^.{6,16}$"
            @inputChange="(text) => data.username = text" />
        <login-text label="密码" 
            placeholder="请输入密码"
            type="password" 
            rule="^.{6,16}$"
            @inputChange="(text) => data.password = text"/>
        <login-btn content="登录" @handleSubmit="loginSubmit"></login-btn>
    </div>
    
</template>
<script>
import LoginTopBar from 'components/common/LoginTopBar.vue'
import LoginText from './childComps/LoginText.vue'
import LoginBtn from 'components/common/LoginBtn.vue'
export default {
    components: {
        LoginTopBar,
        LoginText,
        LoginBtn
    },
    data (){
        return {
            data: {
                username: '',
                password: '',
            },      
        }
    },
    methods: {
        async loginSubmit (){
            let rulg = /^.{6,16}$/;
            if(rulg.test(this.data.username) && rulg.test(this.data.password)) {
                const res = await this.request({
                    method: 'POST',
                    url: '/login',
                    data: this.data
                });
                this.Toast.fail(res.data.msg)   ; 
                if(res.data.code === 301 || res.data.code === 302) {
                    return 
                }
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('id',res.data.id);
                setTimeout( () => {
                    this.$router.push('/user')

                },1000)
            }else {
                this.Toast.fail('格式不正确，请重新输入')
            }   
        },

    },
}
</script>

<style scoped>

</style>