<template>
    <div class="flex flex-col self-center w-full items-center align-middle text-black">
        <h1 class="p-32"> <span class="text-5xl font-mono"> The Jeri Files (BETA) </span></h1>
        <div class="flex flex-row">
            <CardForge v-for="card in randomAssortment" :name="card.name" :multiplier="card.multiplier" :cor="card.color"
                :type="card.type" :description="card.description"
                class="text-slate-900 hover:border hover:border-red-600" />
        </div>

    </div>
</template>
<script setup>
import CardForge from '../components/CardForge.vue';
import { ref, onMounted } from 'vue';
const Cards = ref([]);
const colorsArray = ref([]);
const randomAssortment = ref([]);

const populateCards = () => {

    const numberOfCardsToSelect = 5;
    const shuffledCards = shuffleArray(Cards.value);
    randomAssortment.value = shuffledCards.slice(0, numberOfCardsToSelect);
};

const shuffleArray = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

onMounted(async () => {
    try {
        const responseCards = await fetch('http://localhost:3000/Cards');
        const responseColors = await fetch('http://localhost:3000/colorsArray')
        if (responseCards.ok && responseColors.ok) {
            Cards.value = await responseCards.json();
            colorsArray.value = await responseColors.json();
            populateCards();
        } else {
            throw new Error('Failed to fetch');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})

</script>