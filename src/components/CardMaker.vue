<template>
    <div class="flex flex-col text-white absolute top-[15%] left-[15%] bg-stone-200 w-2/3 h-2/3">
        <div class="h-100 w-100 bg-slate-700 ">
            <div class="flex justify-between items-center p-3">
                <p class="pr-2 text-white text-xl">Create A Card</p>
                <button class="pr-2" @click="closePopup">
                    <i class="fa-solid fa-circle-xmark text-red-700"></i>
                </button>
            </div>
        </div>
        <form @submit.prevent="createCard">
            <div class="grid grid-flow-col h-5/6 p-3 grid-cols-4">
                <div class="flex flex-row col-span-3 p-5 rounded bg-slate-400">
                    <div class="flex flex-col w-1/2">
                        <p class="text-xl">Card Details</p>
                        <input v-model="cardName" class=" text-slate-700 m-2 p-2 w-fit rounded" type="text"
                            placeholder="Name of your card">
                        <input v-model="cardDescription" class="text-slate-700 m-2 p-2 w-fit rounded" type="text"
                            placeholder="Describe your card">
                        <!-- <input v-model="cardColor" class="text-slate-700 m-2 p-2 w-1/5 rounded" type="text"
                        placeholder="Tailwind color for the card"> -->
                        <fieldset>
                            <legend class="text-xl">Card Class</legend>
                            <div>
                                <input class="m-0.5" type="radio" name="element" id="fa-fire">
                                <label for="fa-fire">Fire</label>
                            </div>
                            <div>
                                <input class="m-0.5" type="radio" name="element" id="fa-droplet">
                                <label for="fa-droplet">Water</label>
                            </div>
                            <div>
                                <input class="m-0.5" type="radio" name="element" id="fa-snowflake">
                                <label for="fa-snowflake">Snow</label>
                            </div>
                        </fieldset>
                    </div>
                    <div class="flex w-1/2">
                        <fieldset>
                            <legend class="text-xl">Card Color</legend>
                            <div v-for="item in colorsArray">
                                <input v-model="cardColor" class="m-0.5" type="radio" name="color" :id='item.name'
                                    @change="getSelectedColor">
                                <label :for='item.name'>{{ item.color }}</label>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div class="col-span-1 flex flex-col items-center">
                    <CardForge class="text-slate-900" :name="this.cardName" :cor="selectedPreviewColor"
                        :description="this.cardDescription" />
                    <!-- I want the data here to be the same as the inputed in the forms-->
                    <button type="submit" class="bg-slate-700 p-1 m-3 h-fit w-1/3 rounded">Save New Card!</button>
                </div>
            </div>
        </form>
        <div class="w-full h-1/3 flex items-end justify-end"> <button class="bg-slate-700 p-1 m-3 h-fit w-fit rounded"
                @click="closePopup">
                <i class="fa-solid fa-circle-xmark text-red-700"></i> Cancel
            </button></div>
    </div>
</template>
  
<script>
import CardForge from './CardForge.vue';
import iziToast from 'iziToast'
async function makeCard(name, type, color, description, multiplier) {
    try {
        const connected = await fetch("http://localhost:3000/Cards", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                type: type,
                color: color,
                description: description,
                multiplier: multiplier,
            })
        });
        if (!connected.ok) {
            throw new Error('Failed to create card. Status: ' + connected.status);
        }
        const convertedConnection = await connected.json();
        return convertedConnection;
    } catch (error) {
        throw new Error('Error creating card: ' + error.message);
    }
}



export default {
    props: {
        colorsArray: Array,
    },

    components: {
        CardForge,
    },
    data() {
        return {
            Cards: [],
            showPopup: false,
            cardName: '',
            cardDescription: '',
            cardColor: '',
            selectedPreviewColor: '',
        };
    },
    methods: {

        getSelectedColor() {
            const selectedInput = document.querySelector('input[name="color"]:checked');

            if (selectedInput) {
                this.selectedPreviewColor = selectedInput.id;

                return this.selectedPreviewColor;
            }
            return '';
        },
        closePopup() {
            this.$emit('close');
        },
        createCard() {
            const type = document.querySelector('input[name="element"]:checked').id;
            const color = document.querySelector('input[name="color"]:checked').id;
            let multiplier = Math.floor(Math.random() * 10) + 1;
            const op = Math.floor(Math.random() * 100) + 1;
            console.log(op)
            if (op >= 95) { multiplier = multiplier + 10 }
            makeCard(this.cardName, type, color, this.cardDescription, multiplier)
                .then((response) => {
                    console.log(op)
                    console.log('Card created:', response);

                    alert('Card created sucessfully!', response);
                    location.reload()
                })
                .catch((error) => {
                    console.error('Error creating card:', error);
                    alert('Error while creating card, must be the damn penguins again', error)
                    // Handle error
                });
        },
    },
};

</script>
  