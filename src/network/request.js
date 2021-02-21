import axios from 'axios'
import router from '../router/index.js'
import Vue from 'vue'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://112.74.99.5:3000/web/api',
        timeout: 2000
    });
    //axios的拦截器
    instance.interceptors.request.use(config => {
        if(localStorage.getItem('id') && localStorage.getItem('token')){
            config.headers = {
                'Authorization':'Baerer ' + localStorage.getItem('token')
            }
        }

        
        return config;
    }, err => {
        return Promise.reject(err);

    });
    //响应拦截
    instance.interceptors.response.use(res => {
        return res;
    }, err => {
        if(err.response.status === 401 || err.response.status === 402){
            router.push('/login');
            Vue.prototype.Toast.fail(err.response.msg)

        }
        return Promise.reject(err);

    });
    return instance(config);
}

// const request = axios.create({
//         baseURL: 'http://112.74.99.5:3000/web/api',
//         timeout: 2000
//     });
// export default request
