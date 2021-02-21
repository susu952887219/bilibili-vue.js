<template>
    <div class="login"> 
        <login-top-bar>
            <div slot="center">注册bibili</div>
            <div slot="right" style="font-size: 3.611vw" @click="$router.push('/login')">用户注册</div>
        </login-top-bar>
        <register-text  style = "margin: 15px 0"
                label="姓名" 
                placeholder="请输入姓名" 
                rule="^.{2,16}$"
                @inputChange="(text) => data.name = text"
                 />
        <register-text label="账号" 
                placeholder="请输入账号"
                rule="^.{6,16}$" 
                @inputChange="(text) => data.username = text"/>
        <register-text label="密码" 
                placeholder="请输入密码" 
                type="password"
                rule="^.{6,16}$"
                @inputChange="(text) => data.password = text"/>

        <login-btn content="注册" @handleSubmit="registerSubmit"></login-btn>
    </div>
    
</template>
<script>
import LoginTopBar from 'components/common/LoginTopBar.vue'
import RegisterText from './childComps/RegisterText.vue'
import LoginBtn from 'components/common/LoginBtn.vue'

export default {
    components: {
        LoginTopBar,
        RegisterText,
        LoginBtn
    },
    data (){
        return {
            data: {
                name: '',
                username: '',
                password: '',
            },      
        }
    },
    methods: {
        // registerSubmit (){
        //     if(this.name && this.username && this.password) {
        //         this.$request.post('/register',{
        //             name: this.name,
        //             username: this.name,
        //             password: this.password
        //         })
        //     }
        // }
        async registerSubmit (){
            let rulg1 = /^.{2,16}$/;
            let rulg2 = /^.{6,16}$/;
            if(rulg1.test(this.data.name) && rulg2.test(this.data.username) && rulg2.test(this.data.password)) {
                const res = await this.request({
                    method: 'POST',
                    url: '/register',
                    data: this.data
                })
                this.Toast.fail(res.data.msg)    
                localStorage.setItem('id', res.data.id); //使用H5的localStorage存储数据  
                localStorage.setItem('token', res.data.objtoken);   
                setTimeout(() => {
                    this.$router.push('/user')

                },1000)
            }else {
                this.Toast.fail('格式不正确，请重新输入')
            }
            
        }

    },
    

}
</script>

<style>

</style>