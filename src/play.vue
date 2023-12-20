<template>
<div class="text-xl text-black flex flex-col items-center"> no game, get juked
    <CardForge v-if="Cards.type == 'monke'" v-for="card in Cards" :name="card.name" :multiplier="card.multiplier" :cor="card.color" :type="card.type" :description="card.description" class="text-slate-900"/>

 </div>
</template>

<script>
import CardForge from './CardForge.vue';

export default {
    data() {
        return {
        Cards: [],
    };
},
    components: {
    CardForge,
  },
  mounted(){
    this.fetchCards();
  },
  methods: {
    mountain() {
        rand = Math.floor(Math.random() * 10) + 1;
        return rand
    },
    async fetchCards() {
        try {
            const responseCards = await fetch('http://localhost:3000/Cards');
            if (responseCards.ok) {
                this.Cards = await responseCards.json();
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