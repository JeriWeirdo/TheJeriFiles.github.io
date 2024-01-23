<template>
  <div v-if="frontFacingCard == false" class="w-40 h-64 m-1 p-1 bg-white rounded ">
        <div
            class="flex flex-col p-4 border-4 border-slate-800 h-full w-full rounded items-center bg-gradient-to-t from-slate-200 to-slate-500">
            <div class="self-start justify-self-start flex justify-between w-full">
                <i class="fa-solid fa-snowflake text-sky-300"></i>
                <i class="fa-solid fa-droplet text-blue-600"></i>
            </div>
            <div class="h-full flex justify-center">
                <div class="flex rounded-full bg-gradient-to-t from-gray-800 to-gray-500 p-3 border border-slate-800 h-fit self-center">
                    <i class="fa-solid fa-fire text-red-600"></i>
                    <i class="fa-solid fa-droplet text-blue-600 mt-6"></i>
                    <i class="fa-solid fa-snowflake text-sky-300"></i>
                </div>
            </div>
            <div class="flex w-full justify-center pt-4"><i class="fa-solid fa-fire text-red-600 self-end absolute"></i>
            </div>
        </div>
    </div>
  <div v-else class="w-40 h-64 m-1 p-1 text-ellipsis rounded" :class="[opGlint()]">
    <div v-if="multiplier >= 15" class="flex flex-col w-full h-full p-2 rounded justify-between border border-amber-500" :class="[superCardColor()]" >
      <div class="flex justify-between items-center text-amber-400 "><i class="fa-solid " :class="type"></i>
        <p class="flex place-self-end justify-self-start border border-amber-50 rounded p-0.5" :class="[opGlint2()]">{{ multiplier }}</p>
      </div>
      <div class="flex flex-col"><p class="border border-amber-500 rounded p-0.5 align-self-end mb-0.5 capitalize" :class="[opGlint2()]">{{ name }}</p>
      <p class="border border-amber-500 bg-slate-50 rounded p-0.5 text-slate-300 text-xs text-balance truncate overflow-hidden">{{ description }}</p></div>
    </div>
    <div v-else class="flex flex-col w-full h-full p-2 rounded justify-between border border-amber-500 " :class="cor" >
      <div class="flex justify-between items-center"><i class="fa-solid " :class="type"></i>
        <p class="flex place-self-end justify-self-start border border-amber-500 bg-slate-50 rounded p-0.5">{{ multiplier }}</p>
      </div>
      <div class="flex flex-col"><p class="border border-amber-500 rounded p-0.5 text-slate align-self-end mb-0.5 capitalize" :class="[opGlint2()]">{{ name }}</p>
      <p class="border border-amber-500 bg-slate-50 rounded p-0.5 text-slate text-xs text-balance truncate overflow-hidden">{{ description }}</p></div>
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
    frontFacingCard: true,
  })

  const opGlint = () => {
    if (props.multiplier >= 11) {
      return "shadow shadow-inner shadow-2xl shadow-yellow-600 bg-gradient-to-t from-cyan-300 to-amber-700 hover:bg-gradient-to-t hover:from-cyan-600 hover:via-yellow-500 hover:to-amber-800"
    } else { return " bg-slate-50"}
  }
  const opGlint2 = () => {
         if (props.multiplier >= 11 && props.type == "fa-fire") { return "bg-gradient-to-t from-red-600 to-red-800 shadow shadow-2xl shadow-amber-400 text-slate-200 hover:text-amber-600"}
    else if (props.multiplier >= 11 && props.type == "fa-droplet") { return "bg-gradient-to-t from-blue-400 to-blue-800 shadow shadow-2xl shadow-amber-400 text-slate-200 hover:text-amber-600"}
    else if (props.multiplier >= 11 && props.type == "fa-snowflake") { return "bg-gradient-to-t from-slate-300 to-sky-600 shadow shadow-2xl shadow-amber-400 text-slate-100 hover:text-amber-600"}
    else if (props.multiplier >= 11 && props.type == "fa-biohazard") { return "bg-gradient-to-t from-green-900 to-lime-600 shadow shadow-2xl shadow-amber-400 text-slate-100 hover:text-amber-800"}
    else if (props.multiplier >= 11 && props.type == "fa-face-angry") { return "bg-gradient-to-t from-amber-900 to-yellow-600 shadow shadow-2xl shadow-amber-400 text-slate-100 hover:text-amber-800"}
      else {return " bg-slate-50"}
    
  }
  const superCardColor = () => {
         if (props.type == 'fa-fire') { return "bg-gradient-to-t from-red-400 to-red-800" }
    else if (props.type == 'fa-droplet') { return "bg-gradient-to-t from-indigo-200 to-indigo-800" }
    else if (props.type == 'fa-snowflake') { return "bg-gradient-to-t from-cyan-200 to-cyan-800" }
    else if (props.type == 'fa-biohazard') { return "bg-gradient-to-t from-green-200 to-lime-800" }
    else if (props.type == 'fa-face-angry') { return "bg-gradient-to-t from-amber-200 to-yellow-800" }
  }
</script>