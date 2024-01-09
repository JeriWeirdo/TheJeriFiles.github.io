<template>
  <div class="text-white">
    <MainPage />
    <router-view> </router-view>
    <component :is="currentView" />
  </div>
</template>

<script>
  import MainPage from './MainPage.vue'
</script>