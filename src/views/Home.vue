<template>
  <div class="home">
    <Navbar boxShadow="false" jenis="nothing"/>
    <Hero/>
    <Trending/>
    <PostHome/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/layouts/Navbar.vue'
import Hero from '@/components/Hero.vue'
import Trending from '@/components/Trending.vue'
import PostHome from '@/components/PostHome.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Hero,
    Trending,
    PostHome
  }
}
</script>
