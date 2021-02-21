<template>
  <div @click="pathPush">
      <div class="detailitem">
          <div class="imgparent">
            <img :src="detailitem.img" alt="" style="width:100%;height:27.778vw;">
            <div class="bottom">
                <div class="icon-play2">
                    <span class="vedio" >1233</span>
                </div>
                <div class="icon-file-text">
                    <span class="comment">{{!detailitem.commentlen ? 666 : detailitem.commentlen}}</span>
                </div>
            </div>
          </div>
          <p>{{detailitem.name}}</p>
      </div>
  </div>
</template>

<script>
export default {
    props: ['detailitem'],
    methods: {
        pathPush() {
            if(this.$route.path != `/article/${this.detailitem.id}`){
                this.$router.push(`/article/${this.detailitem.id}`)
            }
            console.log(this.$route.path)
            
        }

    }

}
</script>

<style lang="less" scoped>
.detailitem {
    .imgparent{
        position: relative;
        color: #fff;
        .bottom{
            padding: 0 10px;
            display: flex;
            position: absolute;
            bottom: 2px;
            background: linear-gradient(0deg,rbga(0,0,0,.85),transparent);
            justify-content: space-between;
            left: 0;
            right: 0;
            font-size: 16px;
        }   
    }
    p{
        font-size: 3.333vw;
        padding: 0.833vw 0;
    }
}

</style>