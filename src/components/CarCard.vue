<template>
    <Card class="card" :key="car._id" @click="$router.push(`/cars/${car._id}`)">
        <template #title>
            <p class="title">{{ car.brand }} {{ car.model }}</p>
        </template>
        <template #content>
            <div class="image__block"><img :src="car.image" :alt="car.model" class="image" /></div>
            <div class="info">
                <div>
                    <p>Class: <strong>{{ car.class }}</strong></p>
                    <p>Doors: <strong>{{ car.doors }}</strong></p>
                    <p>Seats: <strong>{{ car.seats }}</strong></p>
                </div>
                <div>
                    <p>Gearbox: <strong>{{ car.gearbox }}</strong></p>
                    <p>Year: <strong>{{ car.year }}</strong></p>
                    <p>Fuel: <strong>{{ car.fuel }}</strong></p>
                </div>
            </div>
            <div class="card__bottom">
                <h2>Price: {{ car.price }}$</h2>
                <Button label="Reserve" @click.stop="reserve" v-if="!isAdmin" />
                <div v-else>
                    <Button label="Delete" @click.stop="removeCar" />
                </div>
            </div>
        </template>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
    </Card>
</template>

<script>
export default {
    props: {
        car: {
            type: Object
        },
        isAdmin: Boolean,
    },
    data() {
        return {
        };
    },
    methods: {
        reserve() {
            console.log("Clicked")
        },
        removeCar() {
            this.$emit("removeCar", this.car._id)
        }
    },
}

</script>

<style scoped>
.card {
    width: 21%;
    margin: var(--var-default-margin);
}

.card__bottom {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card:hover {
    cursor: pointer;
    outline: 1px solid white;
}

.title {
    text-align: center;
}

.image__block {
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.image {
    width: 100%;
}

.info {
    display: flex;
    justify-content: space-around;
    font-size: 1.2rem;
}

.info p {
    margin-top: 5px;
}
</style>