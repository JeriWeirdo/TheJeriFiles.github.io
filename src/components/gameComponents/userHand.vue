<template>
    <div class="flex flex-row h-72 items-end">
        <button :disabled="IsACardOnTable == true" @click="toTable(card)" v-for="card in cardsOnDeck" class="flex flex-row hover:pb-8 disabled:hover:pb-0 ">
            <CardForge :cor="card.color" :multiplier="card.multiplier" :type="card.type" :name="card.name"
                :description="card.description" class="text-slate-950" />
        </button>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import CardForge from '../CardForge.vue';
const Cards = ref([]);
const IsACardOnTable = ref(false)
let numberOfCardsToSelect = 5;
const cardsOnDeck = ref([]);
const emit = defineEmits([ 'choosenCard' ]);

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

const selectUserRandomCards = () => {
    const shuffledCards = shuffleArray(Cards.value);
    cardsOnDeck.value = shuffledCards.slice(0, numberOfCardsToSelect);
};

const toTable = (card) => {
    const index = cardsOnDeck.value.indexOf(card);
    if (index !== -1) {
        cardsOnDeck.value.splice(index, 1);
        IsACardOnTable.value = true
        emit('choosenCard', card);
        
        // setTimeout(() => {
        //     compareCards()
        // }, 3000);
    }
}

onMounted(async () => {
    try {
        const responseCards = await fetch('http://localhost:3000/Cards');
        if (responseCards.ok) {
            Cards.value = await responseCards.json();
            selectUserRandomCards()
        } else {
            throw new Error('Failed to fetch');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
</script>