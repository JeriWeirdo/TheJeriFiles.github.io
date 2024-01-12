<template>
<div class="flex w-full h-full flex-col justify-between">
    <div class="flex flex-row justify-center">
        <computerHand /> 
    </div>
    <div class="flex flex-row justify-center">
        <div class="flex flex-row space-x-20">
        <div class="pb-20">
            <CardForge v-if="1 == 4" />
        </div>
        <span class="self-center text-3xl text-gray-950 font-extrabold font-sans">X</span>
        <div class="pt-20">
            <CardForge class="text-slate-800" v-if="onTable != 0" :name="onTable[0].name" :multiplier="onTable[0].multiplier" :cor="onTable[0].color" :type="onTable[0].type" :description="onTable[0].description" />
 
        </div>
    </div>
    </div>
    <div class="flex flex-row justify-center">
        <userHand @choosenCard="compareCards" /> 
    </div>
    
    
</div>

</template>
<script setup>
import userHand from '../components/gameComponents/userHand.vue';
import computerHand from '../components/gameComponents/computerHand.vue';
import CardForge from '../components/CardForge.vue';
import { ref } from 'vue';

const onTable = ref([])

const compareCards = (card) => {
    onTable.value != 0 ? onTable.value == [] && onTable.value.push(card) : onTable.value.push(card)
}

</script>