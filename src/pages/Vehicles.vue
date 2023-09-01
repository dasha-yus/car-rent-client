<template>
    <div class="filters">
        <Dropdown v-model="selectedClass" :options="classesList" placeholder="Select class" />
        <Dropdown v-model="selectedGearboxType" :options="gearboxTypes" placeholder="Select gearbox type" />
        <Dropdown v-model="selectedBrand" :options="brandsList" placeholder="Select brand" />
        <Dropdown v-model="selectedYear" :options="years" placeholder="Select year" />
        <span class="p-input-icon-left p-input-icon-right">
            <i class="pi pi-search" />
            <InputText type="text" v-model="search" placeholder="Search" class="search" />
            <i class="pi pi-times cross" v-tooltip="'Clear'" @click="clearSearch" />
        </span>
        <InputNumber v-model="price" showButtons mode="currency" currency="USD" :step="10" :min="0" :max="maxPrice" />
    </div>
    <div class="cars">
        <Card class="card" @click="isDialogVisible = true" v-if="isAuth && user.isAdmin"><template #content class="content">
                <i class="pi pi-plus-circle add-icon" />
            </template></Card>
        <car-card v-for="car in filteredResult" :car="car" :isAdmin="isAuth && user.isAdmin"
            v-if="filteredResult.length !== 0" @removeCar="deleteCar" @onEditCar="setSelectedCar" />
        <div v-else class="no-results">
            <h1>No matches</h1>
            <h3>Please broaden your search</h3>
        </div>
    </div>
    <create-car :isDialogVisible="isDialogVisible" :carToEdit="selectedCar" @switchIsDialogVisible="onCancelCreatingCar"
        @onCarAdded="onCarAdded" @onCarUpdated="onCarUpdated" />
</template>

<script>
import apiService from '../services/apiService';
import CarCard from '@/components/CarCard.vue';
import CreateCar from '@/components/modals/CreateCar.vue';

export default {
    components: { CarCard, CreateCar },
    data() {
        return {
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
            any: "<any>",
            isDialogVisible: false,
            selectedCar: null
        };
    },
    mounted() {
        this.getAllCars()
    },
    methods: {
        async getAllCars() {
            try {
                const cars = await apiService.get("/cars");
                this.cars = cars.data.sort((a, b) => a.price - b.price);
                this.brandsList = [this.any, ...new Set(cars.data.map(car => car.brand))];
                this.classesList = [this.any, ...new Set(cars.data.map(car => car.class))];
                this.gearboxTypes = [this.any, ...new Set(cars.data.map(car => car.gearbox))];
                this.years = [this.any, ...new Set(cars.data.map(car => car.year))].sort((a, b) => b - a);
            } catch (err) {
                this.$toast.show('Failed to load cars', {
                    type: 'error',
                });
            }
        },
        clearSearch() {
            this.search = "";
        },
        async deleteCar(id) {
            try {
                await apiService.delete(`/cars/${id}`);
                this.cars = this.cars.filter(car => car._id !== id);
                this.$toast.show(`Car ${id} was successfully deleted`, {
                    type: 'success',
                });
            } catch (err) {
                this.$toast.show('Failed to delete car', {
                    type: 'error',
                });
            }
        },
        onCancelCreatingCar() {
            this.selectedCar = null;
            this.isDialogVisible = false;
        },
        setSelectedCar(car) {
            this.selectedCar = car;
            this.isDialogVisible = true;
        },
        onCarAdded() {
            this.getAllCars();
        },
        onCarUpdated() {
            this.selectedCar = null;
            this.getAllCars();
        }

    },
    computed: {
        isAuth() {
            return this.$store.state.auth.isAuthenticated;
        },
        user() {
            return this.$store.state.auth.user;
        },
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
            if (this.selectedBrand === this.any) {
                this.selectedBrand = null;
                return this.filteredByPrice;
            }
            if (!this.selectedBrand) return this.filteredByPrice;
            return this.filteredByPrice.filter(car => car.brand === this.selectedBrand);
        },
        filteredByClass() {
            if (this.selectedClass === this.any) {
                this.selectedClass = null;
                return this.filteredByBrand;
            }
            if (!this.selectedClass) return this.filteredByBrand;
            return this.filteredByBrand.filter(car => car.class === this.selectedClass);
        },
        filteredByYear() {
            if (this.selectedYear === this.any) {
                this.selectedYear = null;
                return this.filteredByClass;
            }
            if (!this.selectedYear) return this.filteredByClass;
            return this.filteredByClass.filter(car => car.year === this.selectedYear);
        },
        filteredResult() {
            if (this.selectedGearboxType === this.any) {
                this.selectedGearboxType = null;
                return this.filteredByYear;
            }
            if (!this.selectedGearboxType) return this.filteredByYear;
            return this.filteredByYear.filter(car => car.gearbox === this.selectedGearboxType);
        }
    }
}
</script>

<style scoped>
.cars {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.card {
    height: auto;
    width: 21%;
    margin: var(--var-default-margin);
}

.card:hover {
    cursor: pointer;
    outline: 1px solid white;
}

.filters {
    margin: 30px var(--var-default-margin) 0 var(--var-default-margin);
    display: flex;
    justify-content: space-between;
}

.search {
    width: 40vw;
}

.cross:hover {
    cursor: pointer;
}

.no-results {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.add-icon {
    height: 100%;
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>