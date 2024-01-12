<template>
<backwordscardforgeVue v-for="card in cardsOnDeck" :cor="card.color" :multiplier="card.multiplier" :type="card.type" :name="card.name" :description="card.description" class="text-slate-950" />
</template>
<script setup>
import {onMounted, ref, watch} from 'vue';
import backwordscardforgeVue from '../backwordsCardForge.vue';
const Cards = ref([]);
let numberOfCardsToSelect = 5;
const cardsOnDeck = ref([])
const prop = defineProps({
  opponentCard: Array,
})

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

watch(prop.opponentCard, async(newVal, oldVal)  => {
  if (newVal != 0){
    selectComputerRandomCard()
  }
}) 

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const selectComputerRandomCard = () => {
  const remainingComputerCards = cardsOnDeck.value.filter(card => !computerOnTable.value.includes(card));

  if (remainingComputerCards.length > 0) {
    const randomIndex = getRandomNumber(0, remainingComputerCards.length - 1);
    const randomComputerCard = remainingComputerCards[randomIndex];
    computerOnTable.value.push(randomComputerCard);
    cardsOnDeck.value.splice(randomIndex, 1);
  }
};

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