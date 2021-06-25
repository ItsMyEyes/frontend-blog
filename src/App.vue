<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { isMobile } from 'mobile-device-detect';
export default {
  mounted() {
    if (isMobile) {
        this.$router.push('/coming-soon-mobile')
    }
  }
}
</script>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap');
@import url('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css');
@import "~vue-select/dist/vue-select.css";
@import url('./assets/fonts/icomoon/style.css');
@import url('./assets/vendor/bootstrap.min.css');
@import url('./assets/index.css');
</style>
