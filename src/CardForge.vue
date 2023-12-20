<template>
  <div class="w-40 h-64 m-1 p-1 bg-white rounded">
    <div class="flex flex-col w-full h-full p-2 rounded justify-between border border-amber-500 " :class="cor" >
      <div class="flex justify-between items-center"><i class="fa-solid " :class="type"></i>
        <p class="flex place-self-end justify-self-start border border-amber-500 bg-slate-50 rounded p-0.5">{{ multiplier }}</p>
      </div>
      <div class="flex flex-col"><p class="border border-amber-500 bg-slate-50 rounded p-0.5 text-slate align-self-end mb-0.5 capitalize">{{ name }}</p>
      <p class="border border-amber-500 bg-slate-50 rounded p-0.5 text-slate text-xs">{{ description }}</p></div>

    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    multiplier: Number,
    cor: String,
    type: String,
    description: String,
  }
}

</script>
