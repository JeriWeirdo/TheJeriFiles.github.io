<template>
    <div v-if="Who == 'user'" class="flex h-full justify-start">
        <div class="rounded-full rounded-s-none rounded-tr-none min-h-2/3 py-4 w-full bg-gray-500 flex flex-col items-start pr-10">
            <span class="justify-self-start text-xl m-2 bg-gradient-to-t from-orange-500 to-orange-800 p-4 rounded-full text-center">{{ score[0].punkte }}</span>
            <div class="flex w-auto flex-wrap">
                <MiniCardForge v-for="card in WinCard" :multiplier="card.multiplier"
                    :cor="card.color" :type="card.type"/>
            </div>
        </div>
    </div>
    <div v-if="Who == 'pc'" class="flex h-full justify-end">
        <div class="rounded-full rounded-e-none rounded-tl-none min-h-2/3 py-4 w-full bg-gray-500 flex flex-col items-end pl-10">
            <span class="justify-self-start text-xl m-2 bg-gradient-to-t from-orange-500 to-orange-800 p-4 rounded-full text-center">{{ score[1].punkte }}</span>
            <div class="flex w-auto flex-wrap flex-row-reverse">
                <MiniCardForge v-for="card in WinCard" :multiplier="card.multiplier"
                    :cor="card.color" :type="card.type"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import MiniCardForge from '../MiniCardForge.vue'
import { ref } from 'vue';
const props = defineProps({
    score: Object,
    Wins: Array,
    Who: String,
});
const WinCard = ref(props.Wins)
</script>