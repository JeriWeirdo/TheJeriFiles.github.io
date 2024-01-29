<template>
  <div v-if="frontFacingCard == false" class="w-40 h-64 m-1 p-1 bg-white rounded ">
    <div
      class="flex flex-col p-4 border-4 border-slate-800 h-full w-full rounded items-center bg-gradient-to-t from-slate-200 to-slate-500">
      <div class="self-start justify-self-start flex justify-between w-full">
        <i class="fa-solid fa-snowflake text-sky-300"></i>
        <i class="fa-solid fa-droplet text-blue-600"></i>
      </div>
      <div class="h-full flex justify-center">
        <div
          class="flex rounded-full bg-gradient-to-t from-gray-800 to-gray-500 p-3 border border-slate-800 h-fit self-center">
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
    <div v-if="multiplier >= 15" class="flex flex-col w-full h-full p-2 rounded justify-between border border-amber-500"
      :class="[superCardColor()]">
      <div class="flex justify-between items-center text-amber-400 ">
        <div class="rounded p-1 border" :class="[elementalcolor()]">
          <i class="fa-solid " :class="type"></i>
        </div>
        <p class="flex place-self-end justify-self-start border border-amber-50 rounded p-0.5 text-amber-400" :class="[opGlint2()]">{{
          multiplier }}</p>
      </div>
      <div class="flex flex-col">
        <img class="rounded mb-1" :src="[image()]" />
        <!-- <img v-else-if="type == 'fa-biohazard'" class="rounded mb-5" src="../assets/kaboom.jpg" /> -->
        <p class="border border-amber-500 rounded p-0.5 align-self-end mb-0.5 capitalize text-amber-500" :class="[opGlint2()]">{{ name }}
        </p>
        <p class="border border-amber-500 bg-slate-50 rounded p-0.5 text-slate-300 text-xs text-balance truncate overflow-hidden">
          {{ description }}</p>
      </div>
    </div>
    <div v-else class="flex flex-col w-full h-full p-2 rounded justify-between border border-amber-500 " :class="cor">
      <div class="flex justify-between items-center">
        <div class="rounded p-1 border" :class="[elementalcolor()]">
          <i class="fa-solid " :class="type"></i>
        </div>
        <p class="flex place-self-end justify-self-start border border-amber-500 bg-slate-50 rounded p-0.5">{{ multiplier
        }}</p>
      </div>
      <div class="flex flex-col">
        <img class="rounded mb-1" :src="[image()]" />
        <p class="border border-amber-500 rounded p-0.5 text-slate align-self-end mb-0.5 capitalize"
          :class="[opGlint2()]">{{ name }}</p>
        <p
          class="border border-amber-500 bg-slate-50 rounded p-0.5 text-slate text-xs text-balance truncate overflow-hidden">
          {{ description }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  name: String,
  multiplier: Number,
  cor: String,
  type: String,
  description: String,
  frontFacingCard: true,
})


const elementalcolor = () => {
  if (props.type == "fa-fire") { return "bg-gradient-to-t from-red-800 to-red-600" }
  else if (props.type == "fa-snowflake") { return "bg-gradient-to-t from-sky-700 to-sky-200" }
  else if (props.type == "fa-droplet") { return "bg-gradient-to-t from-blue-700 to-sky-400" }
  else if (props.type == "fa-wind") { return "bg-gradient-to-t from-white via-white to-sky-400" }
  else if (props.type == "fa-gem") { return "bg-gradient-to-t from-slate-700 to-stone-400" }
  else if (props.type == "fa-biohazard") { return "bg-gradient-to-t from-green-800 to-lime-600" }
  else if (props.type == "fa-crown") { return "bg-gradient-to-t from-yellow-600 to-yellow-800" }
  else { return "bg-slate-600" }
};
const opGlint = () => {
  if (props.multiplier >= 11) {
    if (props.type == "fa-fire") {return "shadow shadow-inner shadow-2xl shadow-yellow-600 bg-gradient-to-t from-red-700 via-red-800 to-amber-700 hover:bg-gradient-to-t hover:from-red-600 hover:via-yellow-500 hover:to-amber-800"}
    if (props.type == "fa-snowflake") {return "shadow shadow-inner shadow-2xl shadow-yellow-600 bg-gradient-to-t from-sky-700 via-sky-800 to-amber-700 hover:bg-gradient-to-t hover:from-slate-600 hover:via-sky-500 hover:to-amber-800"}
    if (props.type == "fa-droplet") {return "shadow shadow-inner shadow-2xl shadow-yellow-600 bg-gradient-to-t from-blue-700 via-blue-800 to-amber-700 hover:bg-gradient-to-t hover:from-indigo-600 hover:via-blue-500 hover:to-amber-800"}
    if (props.type == "fa-wind") {return "shadow shadow-inner shadow-2xl shadow-yellow-600 bg-gradient-to-t from-blue-100 via-blue-300 to-amber-700 hover:bg-gradient-to-t hover:from-sky-300 hover:via-blue-400 hover:to-amber-800"}
    if (props.type == "fa-gem") {return "shadow shadow-inner shadow-2xl shadow-yellow-600 bg-gradient-to-t from-slate-700 via-stone-800 to-amber-700 hover:bg-gradient-to-t hover:from-slate-600 hover:via-stone-500 hover:to-amber-800"}
    if (props.type == "fa-biohazard") {return "shadow shadow-inner shadow-2xl shadow-yellow-600 bg-gradient-to-t from-green-700 via-lime-800 to-amber-700 hover:bg-gradient-to-t hover:from-red-600 hover:via-yellow-500 hover:to-neutral-900"}
    if (props.type == "fa-crown") {return "shadow shadow-inner shadow-2xl shadow-yellow-600 bg-gradient-to-t from-yellow-700 via-amber-500 to-amber-700 hover:bg-gradient-to-t hover:from-amber-600 hover:via-red-400 hover:to-amber-800"}
    else {return "shadow shadow-inner shadow-2xl shadow-yellow-600 bg-gradient-to-t from-cyan-300 to-amber-700 hover:bg-gradient-to-t hover:from-cyan-600 hover:via-yellow-500 hover:to-amber-800"}
  } else { return " bg-slate-50" }
}
const opGlint2 = () => {
  if (props.name == "🗽America🗽") {return "bg-gradient-to-l from-blue-800 via-white to-red-600 shadow shadow-2xl shadow-amber-400 text-blue-900 hover:text-amber-600"}
  else if (props.multiplier >= 11 && props.type == "fa-fire") { return "bg-gradient-to-t from-red-600 to-red-800 shadow shadow-2xl shadow-amber-400 hover:text-amber-600" }
  else if (props.multiplier >= 11 && props.type == "fa-droplet") { return "bg-gradient-to-t from-blue-400 to-blue-800 shadow shadow-2xl shadow-amber-400 hover:text-amber-600" }
  else if (props.multiplier >= 11 && props.type == "fa-snowflake") { return "bg-gradient-to-t from-slate-300 to-sky-600 shadow shadow-2xl shadow-amber-400 hover:text-amber-600" }
  else if (props.multiplier >= 11 && props.type == "fa-wind") { return "bg-gradient-to-t from-white to-sky-300 shadow shadow-2xl shadow-amber-400 hover:text-amber-600" }
  else if (props.multiplier >= 11 && props.type == "fa-gem") { return "bg-gradient-to-t from-slate-600 to-stone-800 shadow shadow-2xl shadow-amber-400 hover:text-amber-600" }
  else if (props.multiplier >= 11 && props.type == "fa-biohazard") { return "bg-gradient-to-t from-green-900 to-lime-600 shadow shadow-2xl shadow-amber-400 hover:text-amber-800" }
  else if (props.multiplier >= 11 && props.type == "fa-crown") { return "bg-gradient-to-t from-amber-900 to-yellow-600 shadow shadow-2xl shadow-amber-400 hover:text-amber-800" }
  else { return " bg-slate-50" }

}

//BackgroundColor
const superCardColor = () => {
  if (props.name == "🗽America🗽"){ return  "bg-[url('https://i.pinimg.com/originals/6b/89/a7/6b89a7c523502582a06adb0977babc13.jpg')] bg-cover"}
  else if (props.name == "Hydrogen"){ return  "bg-[url('/src/assets/gEBrYE.gif')] bg-cover"}
  // else if (props.name == "Hydrogen"){ return  "bg-[url('https://media.tenor.com/ByHfwBHRhkIAAAAM/frog-frog-laughing.gif')] bg-cover"}
  else if (props.type == "fa-biohazard"){ return  "bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/79/Operation_Upshot-Knothole_-_Badger_001.jpg')] bg-cover bg-center"}
  else if (props.type == 'fa-fire') { return "bg-gradient-to-t from-red-400 to-red-800" }
  else if (props.type == 'fa-droplet') { return "bg-gradient-to-t from-indigo-200 to-indigo-800" }
  else if (props.type == 'fa-snowflake') { return "bg-gradient-to-t from-cyan-200 to-cyan-800" }
  else if (props.type == 'fa-wind') { return "bg-gradient-to-t from-neutral-200 to-sky-500" }
  else if (props.type == 'fa-gem') { return "bg-gradient-to-t from-slate-200 to-stone-800" }
  else if (props.type == 'fa-crown') { return "bg-gradient-to-t from-amber-200 to-yellow-800" }
}

const image = () => {
  if (props.type == 'fa-snowflake'){
    if (props.multiplier <= 5){  }
    else if (6 <= props.multiplier <= 10){  }
    else if (11 <= props.multiplier <= 15){  }
    else if (16 <= props.multiplier){  }
  }
  else if (props.type == 'fa-wind'){}
  else if (props.type == 'fa-gem'){}
  else if (props.type == 'fa-fire'){}
  else if (props.type == 'fa-droplet'){}
  else if (props.type == 'fa-crown'){return '/src/assets/jeri.png'}
  else {return null}
}

</script>