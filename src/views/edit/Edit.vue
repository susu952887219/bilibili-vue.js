<template>
  <div class="edit">
    <nav-bar :userInfo="model" style="margin-bottom: 2.778vw;"></nav-bar>
    <div class="uploadfile">
      <van-uploader :after-read="afterRead" 
                    class="uploadingimg"
                    preview-size="100vw"/>
      <edit-item>
        <div slot="left">头像</div>
         <img v-if="model.user_img" slot="right" :src="model.user_img" alt="" />
         <img v-else slot="right" src="~assets/img/default_img.jpg" />
      </edit-item>
    </div>
    <edit-item @editClick="show = true">
      <div slot="left">昵称</div>
      <a slot="right" src="javascript:">{{model.name}}</a>
    </edit-item>
    <edit-item>
      <div slot="left">账号</div>
      <a slot="right" src="javascript:">{{model.username}}</a>
    </edit-item>
    <edit-item @editClick="sexshow = true">
      <div slot="left">性别</div>
      <a slot="right" src="javascript:">{{model.gender == 1 ? '男':'女'}}</a>
    </edit-item>
    <edit-item @editClick="textshow = true">
      <div slot="left">个签</div>
      <a slot="right" src="javascript:">{{model.user_desc}}</a>     
    
    </edit-item>

    <edit-item class="back-user" @editClick="$router.push('/user')">
      <div slot="center">返回个人中心</div>
    </edit-item>

    <van-dialog v-model="show" 
                title="昵称" 
                show-cancel-button 
                @confirm="confirmClick"
                @cancel="content.name=''">
      <van-field v-model="content.name" autofocus />
    </van-dialog>

    <van-dialog v-model="textshow" 
                title="个性签名" 
                show-cancel-button 
                @confirm="confirmClick"
                @cancel="content.user_desc=''">
      <van-field v-model="content.user_desc" autofocus type="textarea"/>
    </van-dialog>

    <van-action-sheet v-model="sexshow" 
                      :actions="actions" 
                      @select="onSelect" 
                      cancel-text="取消"
                      @cancel="sexshow=false"/>

  </div>
  
</template>

<script>
import NavBar from 'components/common/NavBar.vue'
import EditItem from './childComps/EditItem.vue'
export default {
  components: {
    NavBar,
    EditItem, 

  },
  data (){
    return {
      model: {},
      show: false,
      textshow: false,
      sexshow: false,
      content: {
        name: '',
        user_desc: '',       
      },
      actions: [
        { name: '男',val: 1 },
        { name: '女',val: 0 },
      ]
    }
  },
  methods: {
    async userList (){
      const res = await this.request({
                method: 'GET',
                url: '/user/' + localStorage.getItem('id'),
            })
      this.model = res.data[0];
      console.log(this.model)
    },
    //插件上传函数的代码
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const fromdata = new FormData();
      fromdata.append('file',file.file)//'file'是键名，后端传过来的
      const res = await this.request({
                method: 'POST',
                url: '/upload',
                data: fromdata,
      })
      console.log(res)
      this.model.user_img = res.data.url;
      this.UserUpdata();
    },
    async UserUpdata() {
      const res = await this.request({
        method: 'POST',
        url: '/update/' + localStorage.getItem('id'),
        data: this.model,
      })
      console.log(res)
      if(res.data.code == 200){
          this.Toast.fail('修改成功')
      }
    },
    confirmClick() {
      if(this.content.name){
        this.model.name = this.content.name;
        this.UserUpdata();
      }
      if(this. content.user_desc){
        this.model.user_desc = this. content.user_desc;
        this.UserUpdata();
      }
    },
    onSelect(item) {
      this.sexshow = false
      this.model.gender = item.val;
      this.UserUpdata();
      console.log('确认')
    }


  },
  created (){
    this.userList();

  }

}
</script>

<style scoped lang="less">
.edit{
  a {
  color: #333;
  }
  img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  }
  .uploadfile {
    position: relative;
    overflow: hidden;
    .uploadingimg {
      position: absolute;
      opacity: 0;
    }
  }
  .back-user {
   color: #999;
   font-size: 16px;
   margin-top: 20px;


  }


}


</style>