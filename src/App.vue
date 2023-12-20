<template>
  <div class="text-white">
    <router-view class=""> </router-view>
    <component :is="currentView" />
  </div>
</template>

<script>
</script>