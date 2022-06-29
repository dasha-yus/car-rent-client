<template>
    <div class="filters">
        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select class" />
        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select gearbox type" />
        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select brand" />
        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select year" />
        <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText type="text" v-model="search" placeholder="Search" class="search" />
        </span>
        <InputNumber v-model="price" showButtons mode="currency" currency="USD" :step="10" :min="0" :max="maxPrice" />
    </div>
    <div class="cars">
        <car-card v-for="car in filteredResult" :car="car" />
    </div>

</template>

<script>
import axios from 'axios';
import CarCard from '@/components/CarCard.vue';

export default {
    components: { CarCard },
    data: () => ({
        cars: [],
        search: "",
        price: 250,
        selectedCity: null,
        cities: [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ],
        value3: "",
    }),
    mounted() {
        axios.get("http://localhost:4000/cars")
            .then(res => this.cars = res.data)
            .catch(err => console.log(err));
    },
    // methods: {
    //     myTest: function() {
    //         console.log(this.price)
    //     }
    // },
    computed: {
        searchResult() {
            return [...this.cars].filter(car =>
                car.brand.toLowerCase().includes(this.search.toLowerCase()) ||
                car.model.toLowerCase().includes(this.search.toLowerCase())
            );
        },
        maxPrice() {
            return Math.max(...this.cars.map(car => car.price));
        },
        filteredResult() {
            return this.searchResult.filter(car => car.price <= this.price);
        },
    }
}
</script>

<style scoped>
.cars {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.filters {
    margin: 30px 30px 0 30px;
    display: flex;
    justify-content: space-between;
}

.search {
    width: 40vw;
}
</style>