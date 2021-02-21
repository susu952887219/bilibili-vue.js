import Vue from "vue"
import Router from "vue-router"
//安装插件
Vue.use(Router)

const Register = () => import('views/register/Register.vue')
const Login = () => import('views/login/Login.vue')
const User = () => import('views/user/User.vue')
const Edit = () => import('views/edit/Edit.vue')
const Home = () => import('views/home/Home.vue')
const Article = () => import('views/article/Article.vue')

//配置路由对象
const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: {
            iskeepalive: true
        },
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/user',
        component: User,
        meta: {
            istoken: true
        }
    },
    {
        path: '/edit',
        component: Edit
    },
    {
        path: '/article/:id',
        component: Article
    },


]

//实例化路由对象
const router = new Router({
    routes,
    mode: 'history',
})

router.beforeEach((to,from,next) => {
    if(!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true){
        router.push('/login');
        return
}
    next();
})

//导出对象
export default router