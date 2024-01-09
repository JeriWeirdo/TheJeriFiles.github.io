<template>
  <div class="text-white">
    <Home />
    <router-view> </router-view>
    <component :is="currentView" />
  </div>
</template>

<script>
import Home from './../src/Home.vue';
</script>