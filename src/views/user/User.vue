<template>
    <div class="user">
        <nav-bar :userInfo="model"></nav-bar>
        <img src="~assets/img/bannerTop_new.png" alt="" class="backImg">
        <user-detail :userInfo="model"></user-detail>
        <user-article />
    </div>


</template>

<script>
import NavBar from 'components/common/NavBar.vue'
import UserDetail from './childComps/UserDetail.vue'
import UserArticle from './childComps/UserArticle.vue'

export default {
    components: {
        NavBar,
        UserDetail,
        UserArticle,
    },
    data () {
        return {
            model: {}

        }
    },
    methods: {
        async userData() {
            const res = await this.request({
                method: 'GET',
                url: '/user/' + localStorage.getItem('id'),
            })
            this.model = res.data[0];
        }
    },
    created() {
        this.userData()
    }

}
</script>

<style scpoed>
.user .backImg{
    width: 100%;
    height: 90px;
}

</style>