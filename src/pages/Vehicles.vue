<template>
    <!-- <h2>Vehicles</h2> -->
    <div class="cars">
        <car-card v-for="car in cars" :car="car" />
    </div>

</template>

<script>
import axios from 'axios';
import CarCard from '@/components/CarCard.vue';

export default {
    components: { CarCard },
    data: () => ({
        cars: [],
    }),
    mounted() {
        axios.get("http://localhost:4000/cars")
            .then(res => this.cars = res.data)
            .catch(err => console.log(err));
    },
}
</script>

<style scoped>
.cars {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>