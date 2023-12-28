<template>
    <p v-for="card in Cards">{{card.name}}</p>
    <pre>{{ Cards }}</pre>
    <CardForge />

</template>
<script>
import CardForge from './CardForge.vue';
export default {
    data() {
        return {
        Cards: Array,
    };
},
    components: {
    CardForge,
  },
    methods: {
    }
}
</script>