<template>
    <div class="absolute left-1/2 top-1/3 z-50" v-if="announce">
        <span class="text-3xl text-white bg-gradient-to-t rounded p-1 uppercase from-lime-950 via-emerald-600 to-lime-500 animate-ping"
            v-if="roundWinner == 'user'">you won this round </span>
        <span class="text-3xl text-white bg-gradient-to-t rounded p-1 uppercase from-red-950 via-red-600 to-red-500 "
            v-if="roundWinner == 'pc'">well, ya lost this round</span>
        <span class="text-3xl text-white bg-gradient-to-t rounded p-1 uppercase from-slate-950 via-gray-600 to-gray-500 "
            v-if="roundWinner == 'tie'">its a tie</span>
        <span class="text-3xl text-white bg-gradient-to-t rounded p-1 uppercase from-amber-950 via-yellow-600 to-amber-500 "
            v-if="roundWinner == 'GameWon'">*o* you won the game!!!</span>
        <span class="text-3xl text-white bg-gradient-to-t rounded p-1 uppercase from-red-950 via-red-600 to-red-500 animate-ping"
            v-if="roundWinner == 'GameLost'">L you lost the game</span>
    </div>
</template>
<script setup>
const prop = defineProps({
    announce: false,
    roundWinner: String,
})
</script>