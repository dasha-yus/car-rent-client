<template>
    <Dialog :visible="isDialogVisible" modal header="New reservation" :style="{ width: '500px' }">
        <form>
            <div class="form-group">
                <div class="form-input">
                    <label for="doors">From:</label>
                    <Calendar v-model="reservation.dateFrom" showIcon class="form-input" :minDate="today"
                        dateFormat="dd-mm-yy" :disabledDates="disabledDates" />
                </div>
            </div>
            <div class="form-group">
                <div class="form-input">
                    <label for="doors">To:</label>
                    <Calendar v-model="reservation.dateTo" showIcon class="form-input" :minDate="reservation.dateFrom"
                        dateFormat="dd-mm-yy" :disabledDates="disabledDates" />
                </div>
            </div>
        </form>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="switchIsDialogVisible" />
            <Button label="Submit" icon="pi pi-check" @click="submitForm" />
        </template>
    </Dialog>
</template>

<script>
import apiService from '../../services/apiService';

export default {
    data() {
        return {
            reservation: {
                dateFrom: new Date(), // today
                dateTo: new Date(new Date().getTime() + 86400000), // tomorrow
            },
            today: new Date(),
            disabledDates: [],
        }
    },
    props: {
        isDialogVisible: Boolean,
        carId: String,
    },
    updated() {
        this.getAllReservations();
    },
    methods: {
        switchIsDialogVisible() {
            this.$emit('switchIsDialogVisible')
        },
        async getAllReservations() {
            try {
                const res = await apiService.get('/reservations', {
                    params: {
                        carId: this.carId,
                    },
                });
                if (res.data.length > 0) {
                    const disabledDates = [];
                    res.data.forEach(r => {
                        const datesInRange = this.getDatesInRange(new Date(r.dateFrom), new Date(r.dateTo));
                        disabledDates.push(datesInRange);
                    });
                    this.disabledDates = [].concat(...disabledDates);
                } else {
                    this.disabledDates = [];
                }
            } catch (err) {
                this.$toast.show('Failed to load reservations', {
                    type: 'error',
                });
            }
        },
        getDatesInRange(startDate, endDate) {
            let dates = [];
            let currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
        },
        async submitForm() {
            try {
                await apiService.post('/reservations/', {
                    userId: this.user._id,
                    carId: this.carId,
                    dateFrom: this.reservation.dateFrom.toLocaleDateString('en-CA'),
                    dateTo: this.reservation.dateTo.toLocaleDateString('en-CA')
                });
                this.$toast.show('Reservation was successfully created', {
                    type: 'success',
                });
                this.$emit('switchIsDialogVisible');
            } catch (err) {
                this.$toast.show(err.response.data.msg, {
                    type: 'error',
                });
            }
        },
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        },
    }
}
</script>

<style scoped>
.form-group {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.form-input {
    width: 100%;
    margin-top: 8px;
}
</style>