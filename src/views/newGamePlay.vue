<template>
    <div class="flex w-full h-full flex-col justify-between" :class="bg">
        <alertBox :announce="announcement" :roundWinner="winner" />
        <div class="flex flex-row justify-between">
            <ScoreBoard :score="points" :Wins="userWinningCards" :Who="'user'" />
            <div class="flex flex-row justify-between">
                <computerHand @choosen-computer-card="getComputerCards" :opponentCard="onTable[0]" :Draw="timeToDraw"
                    :effects="effects" />
            </div>
            <ScoreBoard :score="points" :Wins="pcWinningCards" :Who="'pc'" />
        </div>
        <div class="flex flex-row justify-center">
            <div class="flex flex-row space-x-20">
                <div class="pb-20">
                    <CardForge class="text-slate-800" v-if="computerTable != 0" :name="computerTable[0].name"
                        :multiplier="computerTable[0].multiplier" :cor="computerTable[0].color"
                        :type="computerTable[0].type" :description="computerTable[0].description" />
                </div>
                <span class="self-center text-3xl text-gray-950 font-extrabold font-sans"> X </span>
                <div class="pt-20">
                    <CardForge class="text-slate-800" v-if="onTable != 0" :name="onTable[0].name"
                        :multiplier="onTable[0].multiplier" :cor="onTable[0].color" :type="onTable[0].type"
                        :description="onTable[0].description" />

                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center">
            <userHand @choosenCard="setCards" :Draw="timeToDraw" :effects="effects" />
        </div>


    </div>
</template>
<script setup>
import userHand from '../components/gameComponents/userHand.vue';
import computerHand from '../components/gameComponents/computerHand.vue';
import CardForge from '../components/CardForge.vue';
import alertBox from '../components/gameComponents/alertBox.vue';
import ScoreBoard from '../components/gameComponents/ScoreBoard.vue';
import { ref, onMounted } from 'vue';

const onTable = ref([]);
const computerTable = ref([]);
const winner = ref("");
const userWinningCards = ref([]);
const pcWinningCards = ref([]);
const timeToDraw = ref(0);
const announcement = ref(false);
const bg = ref("");
const explosion = new Audio('/src/assets/audio/explosion.wav');
const fire = new Audio('/src/assets/audio/fire.wav');
const water = new Audio('/src/assets/audio/water.wav');
const wind = new Audio('/src/assets/audio/wind.wav');
const snow = new Audio('/src/assets/audio/snow.wav');
const stone = new Audio('/src/assets/audio/rock.wav');
const effects = ref([
    {
        user: 'user',
        deleteMegaCards: 0,
        killpoints: 0,
    },
    {
        user: 'pc',
        deleteMegaCards: 0,
        killpoints: 0,
    },
])
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
    if (onTable.value[0].type == 'fa-fire') { bg.value = "bg-gradient-to-t from-red-300 to-red-800 saturate-150" }
    else if (onTable.value[0].type == 'fa-droplet') { bg.value = "bg-gradient-to-t from-sky-300 to-sky-800 saturate-150" }
    else if (onTable.value[0].type == 'fa-snowflake') { bg.value = "bg-gradient-to-t from-cyan-300 to-cyan-800 saturate-150" }
};
const getComputerCards = (PcTable) => {
    computerTable.value = PcTable.length !== 0 ? PcTable : [];


    console.log('GOT BOTH VALUES BOSS')
    if (onTable.value != 0 && computerTable.value != 0) {
        setTimeout(() => {
            compareType(onTable, computerTable);
        }, 3000);
    }

};

const compareType = (onTable, computerTable) => {
    console.log('IM COMPARING TYPES');
    console.log('THE TYPES ARE:', onTable.value[0].type, computerTable.value[0].type);

    const playerType = onTable.value[0].type;
    const computerType = computerTable.value[0].type;
    if (playerType === "fa-crown" && computerType != "fa-crown") { if ((points.value[0].punkte - 2) >= points.value[1].punkte) { endGame("win"); winner.value = 'GameWon' } else { winner.value = 'user'; treatWinner(onTable, computerTable); lessPower('pc') }; console.log('points', points.value[0].punkte, points.value[1].punkte)}
    else if (playerType != "fa-crown" && computerType === "fa-crown") { if ((points.value[1].punkte - 2) >= points.value[0].punkte) { endGame("lose"); winner.value = 'GameLost' } else { winner.value = 'pc'; treatWinner(onTable, computerTable); lessPower('user') }; console.log('points', points.value[0].punkte, points.value[1].punkte) }
    else if (playerType === "fa-biohazard" && computerType != "fa-biohazard") { deletePoints('pc'); if ((points.value[0].punkte - 2) >= points.value[1].punkte) { endGame("win"); winner.value = 'GameWon' } else { winner.value = 'user'; treatWinner(onTable, computerTable); }; console.log('points', points.value[0].punkte, points.value[1].punkte) }
    else if (playerType != "fa-biohazard" && computerType === "fa-biohazard") { deletePoints('user'); if ((points.value[1].punkte - 2) >= points.value[0].punkte) { endGame("lose"); winner.value = 'GameLost' } else { winner.value = 'pc'; treatWinner(onTable, computerTable); }; console.log('points', points.value[0].punkte, points.value[1].punkte) }

    else if (
        (playerType === "fa-fire" && (computerType === "fa-snowflake" || computerType === "fa-wind")) ||
        (playerType === "fa-snowflake" && (computerType === "fa-droplet" || computerType === "fa-wind")) ||
        (playerType === "fa-wind" && (computerType === "fa-droplet" || computerType === "fa-gem")) ||
        (playerType === "fa-droplet" && (computerType === "fa-gem" || computerType === "fa-fire")) ||
        (playerType === "fa-gem" && (computerType === "fa-fire" || computerType === "fa-snowflake"))
    ) {
        // Player wins
        if ((points.value[0].punkte - 2) >= points.value[1].punkte) { endGame("win"); winner.value = 'GameWon' }
        else {
            winner.value = 'user';
            treatWinner(onTable, computerTable);
        }
    } else if (
        (computerType === "fa-fire" && (playerType === "fa-snowflake" || playerType === "fa-wind")) ||
        (computerType === "fa-snowflake" && (playerType === "fa-droplet" || playerType === "fa-wind")) ||
        (computerType === "fa-wind" && (playerType === "fa-droplet" || playerType === "fa-gem")) ||
        (computerType === "fa-droplet" && (playerType === "fa-gem" || playerType === "fa-gem")) ||
        (computerType === "fa-gem" && (playerType === "fa-fire" || playerType === "fa-snowflake"))
    ) {
        // Computer wins
        if ((points.value[1].punkte - 2) >= points.value[0].punkte) { endGame("lose"); winner.value = 'GameLost' }
        else {
            winner.value = 'pc';
            treatWinner(onTable, computerTable);

        }
    } else {
        // It's a tie or an unknown combination
        compareMultipliers(onTable, computerTable);
    }
};

const compareMultipliers = (onTable, computerTable) => {
    console.log('IM COMPARING MULTIPLIERS');
    console.log('THE MULTIPLIERS ARE', onTable.value.multiplier, computerTable.multiplier);
    if (onTable.value[0].multiplier > computerTable.value[0].multiplier) { winner.value = 'user'; treatWinner(onTable, computerTable) }
    if (onTable.value[0].multiplier < computerTable.value[0].multiplier) { winner.value = 'pc'; treatWinner(onTable, computerTable) }
    else { winner.value = 'tie'; treatWinner(onTable, computerTable) }
};

const treatWinner = () => {
    console.log('CHECKING THE WINNER');
    if (winner.value == 'user') {
        userWinningCards.value.push(onTable.value[0]);
        if (onTable.value[0].type === "fa-biohazard") { explosion.play() }
        else if (onTable.value[0].type === "fa-fire") { fire.play() }
        else if (onTable.value[0].type === "fa-snowflake") { snow.play() }
        else if (computerTable.value[0].type === "fa-droplet") {
            water.play(); setTimeout(() => {
                water.pause();
            }, 1000);
        }
        else if (onTable.value[0].type === "fa-gem") { stone.play() }
        else if (onTable.value[0].type === "fa-wind") { wind.play() };
        points.value[0].punkte++;
        announcement.value = true;
        if (onTable.value[0].multiplier >= 20) { effects.value[1].deleteMegaCards++ }
    }
    else if (winner.value == 'pc') {
        pcWinningCards.value.push(computerTable.value[0]);
        if (computerTable.value[0].type === "fa-biohazard") { explosion.play() }
        else if (computerTable.value[0].type === "fa-fire") { fire.play() }
        else if (computerTable.value[0].type === "fa-snowflake") { snow.play() }
        else if (computerTable.value[0].type === "fa-droplet") {
            water.play(); setTimeout(() => {
                water.pause();
            }, 1000);
        }
        else if (computerTable.value[0].type === "fa-gem") { stone.play() }
        else if (computerTable.value[0].type === "fa-wind") { wind.play() };
        if (computerTable.value[0].type === "fa-biohazard") { explosion.play() };
        points.value[1].punkte++;
        announcement.value = true;
        if (computerTable.value[0].multiplier >= 20) { effects.value[0].deleteMegaCards++ }
    }
    else if (winner.value == 'tie') {
        announcement.value = true;
    }
    console.log('THE WINNER IS', winner.value, ("!"));
    onTable.value.pop();
    bg.value = "bg-gradient-to-t from-slate-800 to-slate-300";
    setTimeout(() => {
        computerTable.value.splice(0, 1);
    }, 10);
    timeToDraw.value++;
    setTimeout(() => {
        announcement.value = false;
    }, 3000);
}

const endGame = (stats) => {
    if (stats == "win") { announcement.value = true; setTimeout(() => location.reload(), 3000); }
    if (stats == "lose") { announcement.value = true; setTimeout(() => location.reload(), 3000); }
}

const deletePoints = (who) => {
    if (who == "user") {
        if (points.value[0].punkte > 0) {
            points.value[0].punkte--
        }
        else { points.value[0].punkte = 0 }
    }
    else if (who == "pc") {
        if (points.value[1].punkte > 0) {
            points.value[1].punkte--
        }
        else { points.value[1].punkte = 0 }
    }
};
const lessPower = (who) => {
    if (who == "user") {
        effects.value[0].killpoints++
    }
    else if (who == "pc") {
        effects.value[1].killpoints++
    }

};

onMounted(async () => {
    bg.value = "bg-gradient-to-t from-slate-800 to-slate-300";
});

</script>
