<template>
  <CardForge :frontFacingCard="true" v-for="card in cardsOnDeck" :cor="card.color" :multiplier="card.multiplier"
    :type="card.type" :name="card.name" :description="card.description" class="text-slate-950" />
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import CardForge from '../CardForge.vue';
const Cards = ref([]);
let numberOfCardsToSelect = 5;
const cardsOnDeck = ref([]);
const computerOnTable = ref([]);
const prop = defineProps({
  opponentCard: Object,
  Draw: Number,
  effects: Array,
})

console.log("prop.effectsPC", prop.effects);
const emit = defineEmits(['choosenComputerCard']);



watch(() => prop.effects[1]?.deleteMegaCards, () => {
    const cardsToKeep = cardsOnDeck.value.filter(obj => obj.multiplier <= 9);
    console.log('Cards to keep:', cardsToKeep);

    let numCardsToDeal = 4 - cardsToKeep.length;
    if (numCardsToDeal < 0) {
        numCardsToDeal = 0;
    }
    console.log("Num cards to deal:", numCardsToDeal);

    const randomCards = [];
    for (let i = 0; i < numCardsToDeal; i++) {
        const randomIndex = getRandomNumber(0, Cards.value.length - 1);
        const randomCard = Cards.value[randomIndex];
        randomCards.push(randomCard);
    }
    cardsOnDeck.value.splice(0, cardsOnDeck.value.length, ...cardsToKeep, ...randomCards);
});



watch(() => prop.opponentCard, () => {
  if (prop.opponentCard != 0) {
    selectComputerRandomCard();
  };
});

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


const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const selectComputerRandomCard = () => {
  if (prop.opponentCard != 0 && computerOnTable.value == 0) {
    const remainingComputerCards = cardsOnDeck.value.filter(card => !computerOnTable.value.includes(card));

    if (remainingComputerCards.length > 0) {
      const randomIndex = getRandomNumber(0, remainingComputerCards.length - 1);
      const randomComputerCard = remainingComputerCards[randomIndex];
      computerOnTable.value.push(randomComputerCard);
      cardsOnDeck.value.splice(randomIndex, 1);
      let PcTable = computerOnTable.value
      emit('choosenComputerCard', PcTable);
    }
  }
};

onMounted(async () => {
  try {
    const responseCards = await fetch('http://179.162.35.170:3000/Cards');
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

watch(() => prop.Draw, () => {
  const numCardsToDeal = 1;

  const randomCards = [];
  for (let i = 0; i < numCardsToDeal; i++) {
    const randomIndex = getRandomNumber(0, Cards.value.length - 1);
    const randomCard = Cards.value[randomIndex];
    randomCards.push(randomCard);
  }
  cardsOnDeck.value.push(randomCards[0]);

});
</script>