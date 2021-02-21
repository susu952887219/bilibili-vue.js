<template>
  <div class="home" v-if="category">
      <nav-bar :userInfo='myuser'></nav-bar>
      <van-tabs v-model="active" swipeable sticky animated>
        <van-tab v-for="(item,index) in category" 
                :title="item.title"
                :key="index">
                <van-list v-model="item.loading"
                          :immediate-check="false"
                          :finished="item.finished"
                          finished-text="没有更多了"
                          @load="onLoad">
                    <div class="detailparent">
                        <home-detail class="detailitem"
                                    :detailitem="categoryitem" 
                                    v-for="(categoryitem,categoryindex) in item.list" 
                                    :key="categoryindex">
                        </home-detail>
                    </div>
                </van-list>
            
        </van-tab>
</van-tabs>

  </div>
</template>

<script>
import NavBar from 'components/common/NavBar.vue'
import HomeDetail from './childComps/HomeDetail.vue'
export default {
    components: {
        NavBar,
        HomeDetail,
    },
    data() {
        return {
            myuser:'',
            active: 0,
            category: [],
        }
    },
    methods: {
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
        async selectCategory(){
            const res = await this.request({
                method: 'GET',
                url: '/category'
            })
            this.chanageCategory(res.data)
            this.selectArticle()
            // this.category = res.data
            // console.log(this.category)
        },
        chanageCategory(data) {
            //给后台传过来的category数据增加一个列表数据
            const category1 = data.map((item) => {
                item.list = [];
                item.page = 0 ;
                item.finished = false;
                item.loading = true;
                item.pagesize = 10
                return item
            })
            this.category = category1
        },
        async selectArticle() {
            const categoryitem = this.categoryItem()
            const res = await this.request({
                method: 'GET',
                url: '/detail/' + categoryitem._id,
                params: {
                    page: categoryitem.page,
                    pagesize: categoryitem.pagesize
                }
            })
            categoryitem.list.push(...res.data)
            // 加载状态结束
            categoryitem.loading = false;
            //数据全部加载完成
            if(res.data.length < categoryitem.pagesize){
                 categoryitem.finished = true;

            }
        },
        categoryItem() {
            const categoryitem = this.category[this.active];
            return categoryitem;

        },
        onLoad() {
            // 异步更新数据
            const categoryitem = this.categoryItem()
            setTimeout(() => {
                categoryitem.page += 1
                this.selectArticle()

            },1000)
        }
    },
    watch: {
        active() {
            this.selectArticle()
        }

    },
    created() {
        this.selectCategory()
        this.myUserData()
    },


}
</script>

<style scoped lang='less'>
.home {
    background: #fff;
}
.detailparent{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex: 1;
    .detailitem{
        margin: 5px 0;
        width: 45%;
    
    }
}

</style>