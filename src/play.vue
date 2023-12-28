<template>
<div class="text-xl text-black flex flex-col items-center"> no game, get juked
    
    <!-- <CardForge v-if="Cards.type == 'monke'" v-for="card in Cards" :name="card.name" :multiplier="card.multiplier" :cor="card.color" :type="card.type" :description="card.description" class="text-slate-900"/> -->
 </div>
 <playerCards :Cards="this.responseCards"/>
</template>

<script>
import CardForge from './CardForge.vue';
import playerCards from './playerCards.vue';

export default {
    data() {
        return {
        Cards: [],
    };
},
    components: {
    CardForge,
    playerCards,
  },
  mounted(){
    this.fetchCards();
  },
  methods: {
    async fetchCards() {
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
  }
}
</script>