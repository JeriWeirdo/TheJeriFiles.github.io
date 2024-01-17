<template>
    <div class="flex w-full h-full flex-col justify-between">
        <alertBox :announce="announcement" :roundWinner="winner" />
        <div class="flex flex-row justify-center">
            <computerHand @choosen-computer-card="getComputerCards" :opponentCard="onTable[0]" :Draw="timeToDraw" />
        </div>
        <div class="flex flex-row justify-center">
            <div class="flex flex-row space-x-20">
                <div class="pb-20">
                    <CardForge class="text-slate-800" v-if="computerTable != 0" :name="computerTable[0].name"
                        :multiplier="computerTable[0].multiplier" :cor="computerTable[0].color"
                        :type="computerTable[0].type" :description="computerTable[0].description" />
                </div>
                <span class="self-center text-3xl text-gray-950 font-extrabold font-sans"> <pre>{{ points[1].punkte }}</pre> X <pre>{{ points[0].punkte }}</pre> </span>
                <div class="pt-20">
                    <CardForge class="text-slate-800" v-if="onTable != 0" :name="onTable[0].name"
                        :multiplier="onTable[0].multiplier" :cor="onTable[0].color" :type="onTable[0].type"
                        :description="onTable[0].description" />

                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center">
            <userHand @choosenCard="setCards" :Draw="timeToDraw" />
        </div>


    </div>
</template>
<script setup>
import userHand from '../components/gameComponents/userHand.vue';
import computerHand from '../components/gameComponents/computerHand.vue';
import CardForge from '../components/CardForge.vue';
import alertBox from '../components/gameComponents/alertBox.vue';
import { ref } from 'vue';

const onTable = ref([]);
const computerTable = ref([]);
const winner = ref(""); 
const userWinningCards = ref([]);
const pcWinningCards = ref([]);
const timeToDraw = ref(0);
const announcement = ref(false)
const points = ref([
  {
    user: 'user',
    punkte: 0
  },
  {
    user: 'computer',
    punkte: 0
  }
]);

const setCards = (card) => {
    onTable.value != 0 ? onTable.value == [] && onTable.value.push(card) : onTable.value.push(card);
};
const getComputerCards = (PcTable) => {
    computerTable.value = PcTable.length !== 0 ? PcTable : [];
    console.log('PcTable', PcTable);
    console.log('computerTable', computerTable);
    console.log('computerTable name', computerTable.value[0]);

    console.log('GOT BOTH VALUES BOSS')
    if (onTable.value != 0 && computerTable.value != 0){
        setTimeout(() => {
            compareType(onTable, computerTable); 
        }, 3000);
    }
    
};

const compareType = (onTable, computerTable) => {
    console.log('IM COMPARING TYPES');
    console.log('THE TYPES ARE:', onTable.value[0].type, computerTable.value[0].type);
         if (onTable.value[0].type == "fa-fire" && computerTable.value[0].type == "fa-snowflake") {if ((points.value[0].punkte - 2) >= points.value[1].punkte ){endGame("win"); winner.value = 'GameWon'} else {winner.value = 'user'; treatWinner(onTable, computerTable)}}
    else if (onTable.value[0].type == "fa-snowflake" && computerTable.value[0].type == "fa-droplet") {if ((points.value[0].punkte - 2) >= points.value[1].punkte ){endGame("win"); winner.value = 'GameWon'} else {winner.value = 'user'; treatWinner(onTable, computerTable)}}
    else if (onTable.value[0].type == "fa-droplet" && computerTable.value[0].type == "fa-fire") {if ((points.value[0].punkte - 2) >= points.value[1].punkte ){endGame("win"); winner.value = 'GameWon'} else {winner.value = 'user'; treatWinner(onTable, computerTable)}}
    else if (onTable.value[0].type == "fa-fire" && computerTable.value[0].type == "fa-droplet") {if ((points.value[1].punkte - 2) >= points.value[0].punkte ) {endGame("lose"); winner.value = 'GameLost'} else {winner.value = 'pc'; treatWinner(onTable, computerTable)}}
    else if (onTable.value[0].type == "fa-droplet" && computerTable.value[0].type == "fa-snowflake") {if ((points.value[1].punkte - 2) >= points.value[0].punkte ) {endGame("lose"); winner.value = 'GameLost'} else {winner.value = 'pc'; treatWinner(onTable, computerTable)}}
    else if (onTable.value[0].type == "fa-snowflake" && computerTable.value[0].type == "fa-fire") {if ((points.value[1].punkte - 2) >= points.value[0].punkte ) {endGame("lose"); winner.value = 'GameLost'} else {winner.value = 'pc'; treatWinner(onTable, computerTable)}}
    else {compareMultipliers(onTable, computerTable)}
};

const compareMultipliers = (onTable, computerTable) => {
    console.log('IM COMPARING MULTIPLIERS');
    console.log('THE MULTIPLIERS ARE', onTable.value.multiplier, computerTable.multiplier);
    if (onTable.value[0].multiplier > computerTable.value[0].multiplier) {winner.value = 'user'; treatWinner(onTable, computerTable)}
    if (onTable.value[0].multiplier < computerTable.value[0].multiplier) {winner.value = 'pc'; treatWinner(onTable, computerTable)}
    else {winner.value = 'tie'; treatWinner(onTable, computerTable)}
};

const treatWinner = () => {
    console.log('CHECKING THE WINNER');
    console.log(onTable.value[0]);
    if (winner.value == 'user'){
        userWinningCards.value.push(onTable.value);
        points.value[0].punkte++;
        announcement.value = true;
    } 
    else if (winner.value == 'pc'){
        pcWinningCards.value.push(computerTable);
        points.value[1].punkte++;
        announcement.value = true;
    }
    else if (winner.value == 'tie'){
        announcement.value = true;
    }
    onTable.value.pop(); 
    setTimeout(() => {
        computerTable.value.splice(0, 1);
    }, 10);
    timeToDraw.value++;
    setTimeout(() => {
        announcement.value = false;
    }, 3000);
}

const endGame = (stats) => {
  console.log('stats', stats)
  if (stats == "win") { announcement.value = true; setTimeout(() => location.reload(), 3000); }
  if (stats == "lose") { announcement.value = true; setTimeout(() => location.reload(), 3000); }
}
</script>