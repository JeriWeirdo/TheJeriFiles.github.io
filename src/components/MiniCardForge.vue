<template>
  <div v-if="mini == false" class="w-10 h-10 m-1 p-1 bg-white rounded " :class="[opGlint()]">
    <div v-if="multiplier >= 15" class="flex flex-col w-full h-full p-2 rounded justify-between border border-amber-500" :class="[superCardColor()]" >
      <div class="flex justify-between items-center"><i class="fa-solid " :class="type"></i>
      </div>
    </div>
    <div v-else class="flex flex-col w-full h-full p-2 rounded justify-between border border-amber-500 " :class="cor" >
      <div class="flex justify-between items-center"><i class="fa-solid " :class="type"></i>
      </div>
    </div>
  </div>
  <div v-if="mini == true" class="w-6 h-6 m-1 p-0.5 bg-white rounded text-xs justify-center" :class="[opGlint()]">
    <div v-if="multiplier >= 15" class="flex flex-col w-full h-full rounded justify-between border border-amber-500" :class="[superCardColor()]" >
      <div class="flex justify-center pt-1 items-center text-xs">
        <i class="fa-solid " :class="type"></i>
      </div>
    </div>
    <div v-else class="flex flex-col w-full h-full p-2 rounded justify-between border border-amber-500 " :class="cor" >
      <div class="flex justify-between items-center"><i class="fa-solid " :class="type"></i>
      </div>
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
    mini: Boolean,
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
    else if (props.type == 'fa-biohazard') { return "bg-gradient-to-t from-green-200 to-lime-800" }
  }
</script>