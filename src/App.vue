<template>
  <div class="text-white">
    <FirstPage />
    <router-view> </router-view>
    <component :is="currentView" />
  </div>
</template>

<script>
  import FirstPage from './FirstPage.vue'
</script>