<template>
  <div class="text-white">
    <router-view> </router-view>
    <component :is="currentView" />
  </div>
</template>

<script>
</script>