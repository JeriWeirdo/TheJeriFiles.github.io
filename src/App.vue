<template>
  <div class="text-white h-screen w-screen bg-slate-300 flex flex-row font-mono"  :class="backGround">
    <div v-if="side === true" class="flex flex-col items-center p-3 w-1/6 bg-slate-600 h-screen">
      <button @click="sideModalClose" class="self-end"><i class="fa-solid fa-bars"></i></button>
      <div class="bg-slate-700 flex p-2 rounded m-2">
        <a class="text-xl" href="/#/"> <i class="fa-regular fa-file-excel pr-2"></i> <span class=""> The Jeri Files (Beta)</span></a>
      </div>
      <a class="bg-slate-700 flex p-1 rounded items-center m-2" href="/#/play"><i class="fa-solid fa-play pr-2"></i> Play A Game</a>
      <a class="bg-slate-700 flex p-1 rounded items-center m-2" href="/#/display"><i class="fa-solid fa-sd-card pr-2"></i> CardDisplay</a>
      <MiniCardForge class="text-slate-800" :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-fire'" />
      <MiniCardForge class="text-slate-800" :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-droplet'" />
      <MiniCardForge class="text-slate-800" :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-snowflake'" />

    </div>
    <div v-else class="flex flex-col items-center p-3 w-fit bg-slate-600 h-screen">
      <button @click="sideModalClose" class="mb-4"><i class="fa-solid fa-bars"></i></button>
      <a class="bg-slate-700 flex p-1 rounded items-center mb-4 text-xl" href="/#/"><i class="fa-regular fa-file-excel"></i></a>
      <a class="bg-slate-700 flex p-1 rounded items-center mb-4" href="/#/play"><i class="fa-solid fa-play"></i></a>
      <a class="bg-slate-700 flex p-1 rounded items-center mb-4" href="/#/display"><i class="fa-solid fa-sd-card"></i></a>
      <MiniCardForge class="text-slate-800" :mini="true" :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-fire'" />
      <MiniCardForge class="text-slate-800" :mini="true" :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-droplet'" />
      <MiniCardForge class="text-slate-800" :mini="true" :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-snowflake'" />
      <div class="bg-transparent flex justify-end">
        <button @click="evilMode()" class="absolute bottom-0 left-0 text-transparent p-2">a
        </button>
      </div>
    </div>
    <router-view> </router-view>
    <component :is="currentView" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import MiniCardForge from './components/MiniCardForge.vue'
const evilModeActive = ref(false);
const side = ref(true)
const sideModalClose = () => {
  side.value = !side.value
}

const evilMode = () => {
  evilModeActive.value = !evilModeActive.value
}

const backGround = computed(() => {
  return evilModeActive.value ? 'bg-gradient-to-t from-stone-900 via-red-700 to-red-900 text-red-800' : ''
})
</script>