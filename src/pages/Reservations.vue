<template>
    <div class="content">
        <div class="reservations-wrapper" v-if="isAuth && !user.isAdmin">
            <VCalendar :attributes="reservations" :is-dark="isDarkMode" :rows="2" />
            <div class="reservations">
                <h2>My reservations</h2>
                <div>
                    <div v-for="reservation in reservations" :reservation="reservation" class="reservation">
                        <div class="reservation-info">
                            <div class="main">
                                <a :href="`/cars/${reservation.car._id}`">
                                    <img :src="reservation.car.image" :alt="reservation.car.model" width="200"
                                        height="100" />
                                </a>
                                <h2>{{ reservation.from }} - {{ reservation.to }}</h2>
                            </div>
                            <div class="info">
                                <h3>{{ reservation.car.brand }} {{ reservation.car.model }}</h3>
                                <h2>{{ reservation.car.price }}$</h2>
                            </div>
                        </div>
                        <Button label="Delete" @click="onConfirmDelete(reservation._id)" />
                    </div>
                </div>
            </div>
        </div>
        <div class="reservations-wrapper-admin" v-if="isAuth && user.isAdmin">
            <VCalendar :attributes="reservations.filter(r => r.carId === selectedCar)" :is-dark="isDarkMode" :rows="3"
                :columns="4" />
            <div class="cars">
                <div v-for="car in cars" :key="car._id">
                    <RadioButton v-model="selectedCar" :inputId="car.key" :value="car._id" @change="onCarSelected"
                        class="radio" />
                    <label :for="car._id">
                        <div class="car">
                            <div class="car-info"><a :href="`/cars/${car._id}`" target="_blank">
                                    <img :src="car.image" :alt="car.model" width="200" height="100" />
                                </a>
                                <div>
                                    <h3>{{ car.brand }} {{ car.model }}</h3>
                                    <h2>{{ car.price }}$</h2>
                                </div>
                            </div>
                            <Button label="Details" @click="onViewDetails(car._id)" />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <DeleteConfirmation :isDialogVisible="isDeleteConfirmationVisible" :name="'reservation'"
        @switchIsDialogVisible="isDeleteConfirmationVisible = false" @onConfirm="onDelete" />
    <ReservationDetails :isDialogVisible="isReservationDetailsVisible" :selectedCar="carForDetails"
        @switchIsDialogVisible="isReservationDetailsVisible = false" />
</template>

<script>
import apiService from '../services/apiService';
import DeleteConfirmation from '../components/modals/DeleteConfirmation.vue';
import ReservationDetails from '../components/modals/ReservationDetails.vue';
import { createRandomColorFromString } from '../utils/Colors';

export default {
    components: { DeleteConfirmation, ReservationDetails },
    data() {
        return {
            reservations: [],
            isDarkMode: true,
            cars: [],
            isDeleteConfirmationVisible: false,
            reservationToRemove: '',
            selectedCar: '',
            isReservationDetailsVisible: false,
            carForDetails: '',
        };
    },
    mounted() {
        this.getAllCars();
        this.getAllReservations();
    },
    methods: {
        async getAllReservations() {
            try {
                const res = this.user.isAdmin ? await apiService.get(`/reservations`) : await apiService.get(`/reservations/user/${this.user._id}`);
                const reservations = res.data.map(reservation => ({
                    ...reservation,
                    from: new Date(reservation.dateFrom).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    to: new Date(reservation.dateTo).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    highlight: createRandomColorFromString(reservation.carId),
                    dates: [[new Date(reservation.dateFrom), new Date(reservation.dateTo)]],
                    car: this.cars.find(car => car._id === reservation.carId)
                }))
                this.reservations = reservations.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateTo));
                if (this.user.isAdmin) {
                    this.selectedCar = this.cars[0]._id;
                }
            } catch (err) {
                this.$toast.show('Failed to load reservations', {
                    type: 'error',
                });
            }
        },
        async getAllCars() {
            try {
                const cars = await apiService.get("/cars");
                this.cars = cars.data.sort((a, b) => a.price - b.price);
            } catch (err) {
                this.$toast.show('Failed to load cars', {
                    type: 'error',
                });
            }
        },
        onConfirmDelete(id) {
            this.isDeleteConfirmationVisible = true;
            this.reservationToRemove = id;

        },
        async onDelete() {
            this.isDeleteConfirmationVisible = false;
            try {
                await apiService.delete(`/reservations/${this.reservationToRemove}`);
                await this.getAllReservations();
                this.$toast.show('Reservation was successfully deleted', {
                    type: 'success',
                });
            } catch (err) {
                this.$toast.show('Failed to delete reservation', {
                    type: 'error',
                });
            }
        },
        onViewDetails(id) {
            this.isReservationDetailsVisible = true;
            this.carForDetails = id;
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        },
        isAuth() {
            return this.$store.state.auth.isAuthenticated;
        },
    }
}
</script>

<style scoped>
.reservations-wrapper {
    display: flex;
    gap: 50px;
    max-height: 90vh;
    overflow-y: auto;
}

.reservations {
    width: 100%;
}

.reservation {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    border: 1px solid #091a32;
    padding: 10px;
    border-radius: 10px;
}

.reservation-info {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    width: 90%;
}

.main {
    display: flex;
    align-items: center;
    gap: 30px;
}

.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 100px;
}

.reservations-wrapper-admin {
    display: flex;
    justify-content: space-between;
    gap: 30px;
}

.cars {
    border: 2px solid #091a32;
    flex: 1;
    overflow-y: auto;
    max-height: 88vh;
    padding: 30px;
    border-radius: 10px;
}

.car {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 50px;
    border-bottom: 1px solid #091a32;
}

.car-info {
    display: flex;
    align-items: center;
    gap: 30px;
}

.radio {
    margin-bottom: -50px;
}
</style>