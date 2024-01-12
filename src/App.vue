<template>
  <div class="text-white h-screen w-screen bg-slate-300 flex flex-row font-mono">
    <sideBar />
    <router-view> </router-view>
    <component :is="currentView" />
  </div>
</template>

<script setup>
  import sideBar from './components/sideBar.vue';
</script>