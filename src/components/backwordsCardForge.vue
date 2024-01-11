<template>
    <div class="w-40 h-64 m-1 p-1 bg-white rounded ">
        <div
            class="flex flex-col p-4 border-4 border-slate-800 h-full w-full rounded items-center bg-gradient-to-t from-slate-200 to-slate-500">
            <div class="self-start justify-self-start flex justify-between w-full">
                <i class="fa-solid fa-fire text-red-600"></i>
                <i class="fa-solid fa-fire text-sky-300"></i>
            </div>
            <div class="h-full flex justify-center">
                <div class="flex rounded-full bg-gradient-to-t from-gray-800 to-gray-500 p-3 border border-slate-800 h-fit self-center">
                    <i class="fa-solid fa-fire text-red-600"></i>
                    <i class="fa-solid fa-droplet text-blue-600 mt-6"></i>
                    <i class="fa-solid fa-snowflake text-sky-300"></i>
                </div>
            </div>
            <div class="flex w-full justify-center pt-4"><i class="fa-solid fa-droplet text-blue-600 self-end absolute"></i>
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
})

</script>