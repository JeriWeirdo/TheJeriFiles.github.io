<template>
    <div class="flex flex-row space-x-20">
        <div class="pb-20">
            <CardForge v-if="1 == 4" />
        </div>
        <span class="self-center text-3xl text-gray-950 font-extrabold font-sans">X</span>
        <div class="pt-20">
            <CardForge v-if="CardsToPlay != 0" :name="CardsToPlay[0].name" :multiplier="CardsToPlay[0].multiplier" :cor="CardsToPlay[0].color" :type="CardsToPlay[0].type" :description="CardsToPlay[0].description" />
 
        </div>
    </div>
</template>
<script setup>
import CardForge from '../CardForge.vue';
import { ref, onMounted } from 'vue';
const CardsToPlay = ref([])
const props = defineProps({
    cards: Array,
    
})

onMounted(async () => {
    CardsToPlay.value = props.cards;
});
</script>