<template>
  <div class="w-40 h-64 m-1 p-1 bg-white rounded " :class="[opGlint()]">
    <div v-if="multiplier >= 15" class="flex flex-col w-full h-full p-2 rounded justify-between border border-amber-500" :class="[superCardColor()]" >
      <div class="flex justify-between items-center"><i class="fa-solid " :class="type"></i>
        <p class="flex place-self-end justify-self-start border border-amber-500 bg-slate-50 rounded p-0.5">{{ multiplier }}</p>
      </div>
      <div class="flex flex-col"><p class="border border-amber-500 bg-slate-50 rounded p-0.5 text-slate align-self-end mb-0.5 capitalize">{{ name }}</p>
      <p class="border border-amber-500 bg-slate-50 rounded p-0.5 text-slate text-xs">{{ description }}</p></div>
    </div>
    <div v-else class="flex flex-col w-full h-full p-2 rounded justify-between border border-amber-500 " :class="cor" >
      <div class="flex justify-between items-center"><i class="fa-solid " :class="type"></i>
        <p class="flex place-self-end justify-self-start border border-amber-500 bg-slate-50 rounded p-0.5">{{ multiplier }}</p>
      </div>
      <div class="flex flex-col"><p class="border border-amber-500 bg-slate-50 rounded p-0.5 text-slate align-self-end mb-0.5 capitalize">{{ name }}</p>
      <p class="border border-amber-500 bg-slate-50 rounded p-0.5 text-slate text-xs">{{ description }}</p></div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps ({
    name: String,
    multiplier: Number,
    cor: String,
    type: String,
    description: String,
  })

  const opGlint = () => {
    if (props.multiplier >= 11) {
      return "shadow shadow-lg shadow-red-500"
    } else { return " ";}
  }
  const superCardColor = () => {
    if (props.type == 'fa-fire') { return "bg-gradient-to-t from-red-400 to-red-800" }
    else if (props.type == 'fa-droplet') { return "bg-gradient-to-t from-indigo-200 to-indigo-800" }
    else if (props.type == 'fa-snowflake') { return "bg-gradient-to-t from-cyan-200 to-cyan-800" }
  }
</script>