<template>
    <div class="filters">
        <Dropdown v-model="selectedClass" :options="classesList" placeholder="Select class" />
        <Dropdown v-model="selectedGearboxType" :options="gearboxTypes" placeholder="Select gearbox type" />
        <Dropdown v-model="selectedBrand" :options="brandsList" placeholder="Select brand" />
        <Dropdown v-model="selectedYear" :options="years" placeholder="Select year" />
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
        brandsList: [],
        classesList: [],
        gearboxTypes: [],
        years: [],
        search: "",
        price: 250,
        selectedBrand: null,
        selectedClass: null,
        selectedGearboxType: null,
        selectedYear: null,
        any: "<any>"
    }),
    mounted() {
        axios.get("http://localhost:4000/cars")
            .then(res => {
                this.cars = res.data;
                this.brandsList = [this.any, ...new Set(res.data.map(car => car.brand))];
                this.classesList = [this.any, ...new Set(res.data.map(car => car.class))];
                this.gearboxTypes = [this.any, ...new Set(res.data.map(car => car.gearbox))];
                this.years = [this.any, ...new Set(res.data.map(car => car.year))].sort((a, b) => b - a);
            })
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
        filteredByPrice() {
            return this.searchResult.filter(car => car.price <= this.price);
        },
        filteredByBrand() {
            if (!this.selectedBrand || this.selectedBrand === this.any) return this.filteredByPrice;
            return this.filteredByPrice.filter(car => car.brand === this.selectedBrand);
        },
        filteredByClass() {
            if (!this.selectedClass || this.selectedClass === this.any) return this.filteredByBrand;
            return this.filteredByBrand.filter(car => car.class === this.selectedClass);
        },
        filteredByYear() {
            if (!this.selectedYear || this.selectedYear === this.any) return this.filteredByClass;
            return this.filteredByClass.filter(car => car.year === this.selectedYear);
        },
        filteredResult() {
            if (!this.selectedGearboxType || this.selectedGearboxType === this.any) return this.filteredByYear;
            return this.filteredByYear.filter(car => car.gearbox === this.selectedGearboxType);
        }
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