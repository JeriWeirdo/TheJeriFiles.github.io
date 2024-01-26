<template>
  <div class="flex flex-col max-h-screen max-w-screen w-full">
    <div class="text-white w-full p-1 bg bg-slate-500 flex flex-row" >
      <div class=" flex flex-col"><a href="/" class="bg-slate-700 p-1 m-1 h-fit w-fit rounded">Go Back</a></div>
      <button class="bg-slate-700 p-1 m-1 h-fit w-fit rounded " @click="togglePopup">Make A Card!</button>
      <button v-if="displayType === true" class="bg-slate-700 p-1 m-1 h-fit w-fit rounded " @click="changeDisplay">Display
        by type</button>
      <button v-else-if="displayType === false" class="bg-slate-700 p-1 m-1 h-fit w-fit rounded "
        @click="changeDisplay">Display by date</button>
    </div>
    <div class="overflow-y-scroll max-h-screen">
      <div v-if="displayType === true" class="grid grid-cols-9 order-last p-3 w-full bg-slate-300" :class="backGround">
        <CardForge v-for="card in Cards" :name="card.name" :multiplier="card.multiplier" :cor="card.color"
          :type="card.type" :description="card.description" class="text-slate-900 hover:border hover:border-red-600" />
      </div>
      <div v-else class="flex flex-row p-3 w-full bg-slate-300">
        <div class="flex flex-col">
          <CardForge v-for="card in fireCards" :name="card.name" :multiplier="card.multiplier" :cor="card.color"
            :type="card.type" :description="card.description" class="text-slate-900 hover:border hover:border-red-600" />
        </div>
        <div class="flex flex-col">
          <CardForge v-for="card in waterCards" :name="card.name" :multiplier="card.multiplier" :cor="card.color"
            :type="card.type" :description="card.description" class="text-slate-900 hover:border hover:border-red-600" />
        </div>
        <div class="flex flex-col">
          <CardForge v-for="card in snowCards" :name="card.name" :multiplier="card.multiplier" :cor="card.color"
            :type="card.type" :description="card.description" class="text-slate-900 hover:border hover:border-red-600" />
        </div>
        <div class="flex flex-col">
          <CardForge v-for="card in windCards" :name="card.name" :multiplier="card.multiplier" :cor="card.color"
            :type="card.type" :description="card.description" class="text-slate-900 hover:border hover:border-red-600" />
        </div>
        <div class="flex flex-col">
          <CardForge v-for="card in gemCards" :name="card.name" :multiplier="card.multiplier" :cor="card.color"
            :type="card.type" :description="card.description" class="text-slate-900 hover:border hover:border-red-600" />
        </div>
        <div class="flex flex-col">
          <CardForge v-for="card in biohazardCards" :name="card.name" :multiplier="card.multiplier" :cor="card.color"
            :type="card.type" :description="card.description" class="text-slate-900 hover:border hover:border-red-600" />
        </div>
        <div class="flex flex-col">
          <CardForge v-for="card in JeriCards" :name="card.name" :multiplier="card.multiplier" :cor="card.color"
            :type="card.type" :description="card.description" class="text-slate-900 hover:border hover:border-red-600" />
        </div>
      </div>
    </div>
  </div>
  <CardMaker v-if="showPopup" @close="togglePopup" :colorsArray="colorsArray" />
</template>

<script setup>
import CardForge from '../components/CardForge.vue';
import CardMaker from '../components/CardMaker.vue';
import { ref, onMounted } from 'vue';

const displayType = ref(true);
const showPopup = ref(false);
const Cards = ref([]);
const colorsArray = ref([]);
const fireCards = ref([]);
const waterCards = ref([]);
const snowCards = ref([]);
const biohazardCards = ref([]);
const windCards = ref([]);
const gemCards = ref([]);
const JeriCards = ref([]);

const changeDisplay = () => {
  displayType.value = !displayType.value
}

const separateByType = () => {
  JeriCards.value = Cards.value.filter(card => card.type == "fa-crown")
  fireCards.value = Cards.value.filter(card => card.type == "fa-fire")
  waterCards.value = Cards.value.filter(card => card.type == "fa-droplet")
  snowCards.value = Cards.value.filter(card => card.type == "fa-snowflake")
  biohazardCards.value = Cards.value.filter(card => card.type == "fa-biohazard")
  windCards.value = Cards.value.filter(card => card.type == "fa-wind")
  gemCards.value = Cards.value.filter(card => card.type == "fa-gem")
}

const togglePopup = () => {
  showPopup.value = !showPopup.value;
}
onMounted(async () => {
  try {
    const responseCards = await fetch('https://cardsjson.vercel.app/Cards');
    const responseColors = await fetch('https://cardsjson.vercel.app/colorsArray')
    if (responseCards.ok && responseColors.ok) {
      Cards.value = await responseCards.json();
      colorsArray.value = await responseColors.json();
      separateByType();
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('Error fetching data:', error);


  }
})

</script>