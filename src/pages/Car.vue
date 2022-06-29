<template>
    <div class="content">
        <h1>{{ car.brand }} {{ car.model }}</h1>
        <img :src="car.image" :alt="car.model" />
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        car: {}
    }),
    mounted() {
        let self = this;
        axios.get('http://localhost:4000/cars/' + this.$route.params.id)
            .then(res => self.car = res.data)
            .catch(err => console.log(err))
    }
}
</script>

<style scoped>
</style>