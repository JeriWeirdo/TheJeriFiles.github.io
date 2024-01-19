<template>
    <div v-if="side === true" class="flex flex-col items-center p-3 w-1/6 bg-slate-600 h-screen">
      <button @click="sideModalClose" class="self-end"><i class="fa-solid fa-bars"></i></button>
      <div class="bg-slate-700 flex p-2 rounded m-2">
        <a class="text-xl" href="/#/"> <i class="fa-regular fa-file-excel pr-2"></i> <span class=""> The Jeri Files (Beta)</span></a>
      </div>
      <a class="bg-slate-700 flex p-1 rounded items-center m-2" href="/#/play"><i class="fa-solid fa-play pr-2"></i> Play A Game</a>
      <a class="bg-slate-700 flex p-1 rounded items-center m-2" href="/#/display"><i class="fa-solid fa-sd-card pr-2"></i> CardDisplay</a>
      <MiniCardForge :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-fire'" />
      <MiniCardForge :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-droplet'" />
      <MiniCardForge :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-snowflake'" />

    </div>
    <div v-else class="flex flex-col items-center p-3 w-fit bg-slate-600 h-screen">
      <button @click="sideModalClose" class="mb-4"><i class="fa-solid fa-bars"></i></button>
      <a class="bg-slate-700 flex p-1 rounded items-center mb-4 text-xl" href="/#/"><i class="fa-regular fa-file-excel"></i></a>
      <a class="bg-slate-700 flex p-1 rounded items-center mb-4" href="/#/play"><i class="fa-solid fa-play"></i></a>
      <a class="bg-slate-700 flex p-1 rounded items-center mb-4" href="/#/display"><i class="fa-solid fa-sd-card"></i></a>
      <MiniCardForge :mini="true" :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-fire'" />
      <MiniCardForge :mini="true" :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-droplet'" />
      <MiniCardForge :mini="true" :name="'a'" :multiplier="19" :cor="'bg-amber-800'" :type="'fa-snowflake'" />
      <div class="bg-transparent flex justify-end">
        <a href="/#/play/newergame" class="absolute bottom-0 left-0 text-transparent p-2">a
        </a>
      </div>
    </div>
</template>
<script setup>
    import MiniCardForge from '../components/MiniCardForge.vue'
    import { ref } from 'vue';
const side = ref(true)
const sideModalClose = () => {
  side.value = !side.value
}

</script>