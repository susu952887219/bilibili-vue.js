<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.iskeepalive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.iskeepalive"></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style scpoed>
@import 'assets/css/base.css';
@import 'assets/style.css'


</style>
