<template>
  <div class="text-xl text-black flex flex-col w-full h-full" :class="[whatCardDeck()]">
    <div class="absolute place-self-center top-1/3 z-50" v-if="announce">
      <span class="text-3xl text-white bg-gradient-to-t rounded p-1 uppercase from-amber-950 via-yellow-600 to-amber-500"
        v-if="roundWinner == 'user'">you won this round </span>
      <span class="text-3xl text-white bg-gradient-to-t rounded p-1 uppercase from-green-950 via-red-600 to-red-500"
        v-if="roundWinner == 'computer'">well, ya lost this round</span>
      <span class="text-3xl text-white bg-gradient-to-t rounded p-1 uppercase from-slate-950 via-gray-600 to-gray-500"
        v-if="roundWinner == 'tie'">its a tie</span>
    </div>
    <div class="w-2/3 flex self-center justify-center">
      <div class="flex flex-col items-center">
        <div class="flex w-300 h-100 fixed -top-20 ">
          <backwordsCardForge class="w-32 h-48" v-for="card in computerDeck" />
          <!-- <CardForge v-if="computerDeck.value == null" v-for="card in computerDeck" :name="card.name"
          :multiplier="card.multiplier" :cor="card.color" :type="card.type" :description="card.description" /> -->
        </div>
      </div>
    </div>

    <div class="flex flex-col max-h-screen h-full max-w-screen w-full relative">
      <div class="flex flex-row justify-between w-full absolute h-full">
          <div class="bg-slate-900 shadow-lg shadow-orange-900 pr-48 pl-4 py-8 rounded-full rounded-s-none rounded-tr-none border-double border-orange-700 border-l-8 saturate-200">
            <div class="">
              <p class="bg-gradient-to-t from-orange-500 to-orange-800 p-4 rounded-full text-center "><span
                  class="text-3xl text-white ">{{ points[0].pontos }}</span></p>
            </div>
                <div class="grid grid-cols-4 gap-x-2 mt-4">
                  <MiniCardForge v-for="card in userWinningCards" :name="card.name" :multiplier="card.multiplier"
                    :cor="card.color" :type="card.type" :description="card.description" />
                </div>
              </div>
            <div>
          </div>
          <div class="bg-slate-900 pr-4 pl-48 py-8 rounded-full shadow-orange-900 shadow-lg rounded-e-none border-double rounded-br-xl rounded-tl-none border-orange-700 border-r-8 saturate-200">
              <p class="bg-gradient-to-t from-orange-500 to-orange-800 p-4 rounded-full text-center "><span
                  class="text-3xl text-white ">{{ points[1].pontos }}</span></p> 
                 <div class="grid grid-cols-4 gap-x-2 mt-4">
                  <MiniCardForge v-for="card in computerWinningCards" :name="card.name" :multiplier="card.multiplier"
                    :cor="card.color" :type="card.type" :description="card.description" />
                </div>
          </div>
      </div>
    </div>

    <div class="flex flex-col w-full h-full justify-end items-center ">
      <div class="flex absolute bottom-96 ">
        <div v-if="OnTable != null" class="justify-between flex flex-row space-x-36">
          <CardForge v-for="card in OnTable" :name="card.name" :multiplier="card.multiplier"
          :cor="card.color" :type="card.type" :description="card.description" />
          <CardForge v-if="computerOnTable != null" v-for="card in computerOnTable" :name="card.name"
          :multiplier="card.multiplier" :cor="card.color" :type="card.type" :description="card.description" />
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-row justify-self-end">
          <button v-for="card in selectedCards" :key="card.id" @click="moveToTable(card)"
            class="  disabled:shadow-inner rounded px-2 disabled:shadow-red-600 hover:enabled:pb-10 h-72"
            :disabled="OnTable.length != 0">
            <CardForge :name="card.name" :multiplier="card.multiplier" :cor="card.color" :type="card.type"
              :description="card.description" />
          </button>
        </div>


      </div>
    </div>

  </div>
</template>

<script setup>
import CardForge from '../components/CardForge.vue';
import MiniCardForge from '../components/MiniCardForge.vue';
import { ref, onMounted, watch } from 'vue';
import backwordsCardForge from '../components/backwordsCardForge.vue';

const Cards = ref([]);
const colorsArray = ref([]);
const selectedCards = ref([]);
const OnTable = ref([]);
const computerDeck = ref([]);
const computerOnTable = ref([]);
const userWinningCards = ref([]);
const computerWinningCards = ref([]);
const roundWinner = ref('');
const announce = ref(false);
const points = ref([
  {
    user: 'user',
    pontos: 0
  },
  {
    user: 'computer',
    pontos: 0
  }
]);
const selectUserRandomCards = () => {
  const numberOfCardsToSelect = 5;
  const shuffledCards = shuffleArray(Cards.value);
  selectedCards.value = shuffledCards.slice(0, numberOfCardsToSelect);
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateComputerDeck = () => {
  const numCardsForComputer = 5;
  const computerCards = [];

  for (let i = 0; i < numCardsForComputer; i++) {
    const randomIndex = getRandomNumber(0, Cards.value.length - 1);
    const randomCard = Cards.value[randomIndex];
    computerCards.push(randomCard);
  }

  computerDeck.value = computerCards;
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

const moveToTable = (card) => {
  const index = selectedCards.value.indexOf(card);
  if (index !== -1) {
    selectedCards.value.splice(index, 1);
    OnTable.value.push(card);
    selectComputerRandomCard();
    setTimeout(() => {
      compareCards()
    }, 3000);
  }
};

const selectComputerRandomCard = () => {
  const remainingComputerCards = computerDeck.value.filter(card => !computerOnTable.value.includes(card));

  if (remainingComputerCards.length > 0) {
    const randomIndex = getRandomNumber(0, remainingComputerCards.length - 1);
    const randomComputerCard = remainingComputerCards[randomIndex];
    computerOnTable.value.push(randomComputerCard);
    computerDeck.value.splice(randomIndex, 1);
  }
};

const userAttack = OnTable.value
const computerAttack = computerOnTable.value
const compareCards = () => {
  if (OnTable.value.length != 0 && computerOnTable.value.length != 0) {

    compareElements(userAttack[0], computerAttack[0]);
  }
};

const compareElements = (userCard, computerCard) => {
  let fire = 'fa-fire';
  let water = 'fa-droplet';
  let snow = 'fa-snowflake';
  const userElement = userCard.type;
  const computerElement = computerCard.type;

  if (userElement == fire && computerElement == snow) {{ if ((points.value[0].pontos - 2) >= points.value[1].pontos ){endGame("win")} else { roundWinner.value = "user"; handleWinner(userCard, computerCard); }}}
  else if (userElement == snow && computerElement == water) {{ if ((points.value[0].pontos - 2) >= points.value[1].pontos ){endGame("win")} else {roundWinner.value = "user"; handleWinner(userCard, computerCard);}}}
  else if (userElement == water && computerElement == fire) {{ if ((points.value[0].pontos - 2) >= points.value[1].pontos ){endGame("win")} else { roundWinner.value = "user"; handleWinner(userCard, computerCard);}}}
  else if (userElement == snow && computerElement == fire) {{if ((points.value[1].pontos - 2) >= points.value[0].pontos ) {endGame("lose")} else {roundWinner.value = "computer"; handleWinner(userCard, computerCard);}}}
  else if (userElement == water && computerElement == snow) {{if ((points.value[1].pontos - 2) >= points.value[0].pontos ) {endGame("lose")} else  {roundWinner.value = "computer"; handleWinner(userCard, computerCard);}}}
  else if (userElement == fire && computerElement == water) {{if ((points.value[1].pontos - 2) >= points.value[0].pontos ) {endGame("lose")} else  {roundWinner.value = "computer"; handleWinner(userCard, computerCard);}}}
  else if (userElement == computerElement) { compareMultipliers(userCard, computerCard) }
};

const compareMultipliers = (userCard, computerCard) => {
  const userMult = userCard.multiplier
  const computerMult = computerCard.multiplier
  if (userMult > computerMult) { if ((points.value[0].pontos - 2) >= points.value[1].pontos ){endGame("win")} else { roundWinner.value = "win"; handleWinner(userCard, computerCard) }}
  else if (userMult < computerMult) {if ((points.value[1].pontos - 2) >= points.value[0].pontos ) {endGame("lose")} else {roundWinner.value = "lose"; handleWinner(userCard, computerCard)} }
  else { roundWinner.value = "tie"; handleWinner(userCard, computerCard) }
};
const handleWinner = (userCard, computerCard) => {

  if (roundWinner.value == 'user') {
    userWinningCards.value.push(userCard);
    points.value[0].pontos++; // Increase user's points
    OnTable.value.pop();
    computerOnTable.value.pop();
    setTimeout(() => { noAnnounce() }, 1000)
  }
  else if (roundWinner.value == 'computer') {
    computerWinningCards.value.push(computerCard);
    points.value[1].pontos++; // Increase computer's points
    OnTable.value.pop();
    computerOnTable.value.pop();
    setTimeout(() => { noAnnounce(), console.log('in') }, 1000);
  }
  else {
    OnTable.value.pop();
    computerOnTable.value.pop();
    setTimeout(() => { noAnnounce() }, 1000)
  }
  noAnnounce()
  dealCards()
};

const noAnnounce = () => {
  announce.value = !announce.value
}

const endGame = (stats) => {
  console.log('stats', stats)
  if (stats == "win") { alert("You win the game!"); setTimeout(() => location.reload(), 2000); }
  if (stats == "lose") { alert("L you lose"); setTimeout(() => location.reload(), 2000); }
}

const dealCards = () => {
  const numCardsToDeal = 2;

  const randomCards = [];
  for (let i = 0; i < numCardsToDeal; i++) {
    const randomIndex = getRandomNumber(0, Cards.value.length - 1);
    const randomCard = Cards.value[randomIndex];
    randomCards.push(randomCard);
  }
  selectedCards.value.push(randomCards[0]);
  computerDeck.value.push(randomCards[1]);
};

const whatCardDeck = () => {
  let currentCard = OnTable.value
  if (currentCard != 0) {
    if (currentCard[0].type == 'fa-fire') { return "bg-gradient-to-t from-red-300 to-red-800 saturate-150" }
    else if (currentCard[0].type == 'fa-droplet') { return "bg-gradient-to-t from-sky-300 to-sky-800 saturate-150" }
    else if (currentCard[0].type == 'fa-snowflake') { return "bg-gradient-to-t from-cyan-300 to-cyan-800 saturate-150" }
  }
  else { return "bg-gradient-to-t from-slate-800 to-slate-300" }
}

watch(points, (newValues, oldValues) => {
  const [user, computer] = newValues;
  console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
  if (user.pontos >= (computer.pontos + 3)) { console.log('win!!!!!!!'); endGame("win") }
  else if (computer.pontos >= (user.pontos + 3)) { console.log("LOSERRRRRRRRRRRRRRRRRRRRRRRRR"); endGame("lose") }

})

onMounted(async () => {
  try {
    const responseCards = await fetch('http://localhost:3000/Cards');
    const responseColors = await fetch('http://localhost:3000/colorsArray');
    if (responseCards.ok && responseColors.ok) {
      Cards.value = await responseCards.json();
      colorsArray.value = await responseColors.json();
      selectUserRandomCards();
      generateComputerDeck();
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>