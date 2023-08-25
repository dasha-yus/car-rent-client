<template>
    <div class="content car">
        <div class="info">
            <div class="free">
                <i class="pi pi-shield" />
                <h2>FREE CANCELLATION</h2>
                <i class="pi pi-info-circle" v-tooltip="tooltip" />
            </div>
            <h1>{{ car.brand }} {{ car.model }}</h1>
            <div class="characteristics">
                <h2 class="title">Characteristics</h2>
                <div class="characteristic">
                    <p><strong>Class:</strong></p>
                    {{ car.class }}
                </div>
                <div class="characteristic">
                    <p><strong>Gearbox:</strong></p>
                    {{ car.gearbox }}
                </div>
                <div class="characteristic">
                    <p><strong>Year of issue:</strong></p>
                    {{ car.year }}
                </div>
                <div class="characteristic">
                    <p><strong>Number of seats:</strong></p>
                    {{ car.seats }}
                </div>
                <div class="characteristic">
                    <p><strong>Number of doors:</strong></p>
                    {{ car.doors }}
                </div>
                <div class="characteristic">
                    <p><strong>Fuel type:</strong></p>
                    {{ car.fuel }}
                </div>
                <div class="characteristic">
                    <p><strong>Max power:</strong></p>
                    {{ car.power }} hp
                </div>
                <div class="characteristic">
                    <p><strong>Air conditioner:</strong></p>
                    {{ car.conditioner ? 'Yes' : 'No' }}
                </div>
            </div>
        </div>
        <div class="cost"><img :src="car.image" :alt="car.model" />
            <h2 class="title">Cost</h2>
            <div class="price">
                <p><strong>Rent for the day:</strong></p>
                {{ car.price }}$
            </div>
            <div class="price">
                <p><strong>Rent for 7 days (-5%):</strong></p>
                {{ rentFor7Days }}$
            </div>
            <div class="price">
                <p><strong>Rent for 20 days (-15%):</strong></p>
                {{ rentFor20Days }}$
            </div>
            <Button class="btn" label="Reserve" />
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';

export default {
    data: () => ({
        car: {},
        tooltip: 'We will refund the entire paid advance if the order is canceled more than 24 hours ' +
            'before the car is received. Cancellations less than 24 hours in advance will be fully charged.'
    }),
    mounted() {
        this.getCar();
    },
    methods: {
        async getCar() {
            try {
                const res = await apiService.get('/cars/' + this.$route.params.id);
                this.car = res.data
            } catch (err) {
                this.$toast.show('Failed to load car data', {
                    type: 'error',
                });
            }
        }
    },
    computed: {
        rentFor7Days() {
            return Math.floor(this.car.price * 0.95 * 7);
        },
        rentFor20Days() {
            return Math.floor(this.car.price * 0.85 * 20);
        }
    }
}
</script>

<style scoped>
.car {
    display: flex;
    justify-content: space-between;
    margin: 70px 15%;
}

.info {
    width: 45%;
}

.info h1 {
    margin-top: 5px;
    margin-bottom: 60px;
    font-size: 3rem;
}

.btn {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.free {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--primary-color);
}

.pi-shield {
    font-size: 1.3rem;
}

.free h2 {
    margin: 0 40px 0 10px;
}

.price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    font-size: 1.2rem;
    border-bottom: 1px solid gray;
}

.cost {
    position: relative;
}

.cost img {
    width: 600px;
    margin-bottom: 50px;
}

.characteristic {
    display: flex;
    padding: 20px 0;
    font-size: 1.2rem;
    border-bottom: 1px solid gray;
}

.characteristic p {
    width: 50%;
}

.title {
    margin-bottom: 25px;
    font-size: 1.7rem;
}
</style>