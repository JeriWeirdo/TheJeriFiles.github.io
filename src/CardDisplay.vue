<template>
  <div class="flex flex-col ">
    <div class="text-white w-full p-1 bg bg-slate-500 flex flex-row">
      <div class=" flex flex-col"><a href="/" class="bg-slate-700 p-1 m-1 h-fit w-fit rounded">Go Back</a></div>
      <button class="bg-slate-700 p-1 m-1 h-fit w-fit rounded " @click="togglePopup">Make A Card!</button>
    </div>
    <div class="grid grid-cols-9 p-3 w-full bg-slate-300">
      <CardForge v-for="card in Cards" :name="card.name" :multiplier="card.multiplier" :cor="card.color" :type="card.type" :description="card.description" class="text-slate-900"/>
    </div>
  </div>
  <CardMaker v-if="showPopup" @close="togglePopup" :colorsArray="colorsArray" />
</template>

<script>
import CardForge from './components/CardForge.vue';
import CardMaker from './components/CardMaker.vue';

export default {
  data() {
    return {
      Cards: [],
      colorsArray: [],
      showPopup: false,
    };
  },
  components: {
    CardForge,
    CardMaker,
  },
  methods: {
    
    togglePopup() {
      this.showPopup = !this.showPopup;
    },

  },

  async mounted() {
    try {
      const responseCards = await fetch('http://localhost:3000/Cards');
      const responseColors = await fetch('http://localhost:3000/colorsArray')
      if (responseCards.ok && responseColors.ok) {
        this.Cards = await responseCards.json();
        this.colorsArray = await responseColors.json();
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      
      
    }
  },

};
</script>