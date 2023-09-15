<template>
    <Dialog :visible="isDialogVisible" modal header="Details" :style="{ width: '35vw' }">
        <div>
            <Timeline :value="reservations">
                <template #opposite="slotProps">
                    <small class="p-text-secondary">{{ slotProps.item.dateFrom }} - {{ slotProps.item.dateTo }}
                    </small>
                </template>
                <template #content="slotProps">
                    {{ slotProps.item.status }}
                </template>
            </Timeline>
        </div>
        <template #footer>
            <Button label="Close" @click="switchIsDialogVisible" />
        </template>
    </Dialog>
</template>

<script>
import apiService from '../../services/apiService';

export default {
    data() {
        return {
            users: [],
            reservations: [],
        }
    },
    props: {
        isDialogVisible: Boolean,
        selectedCar: String,
    },
    updated() {
        this.getAllUsers();
        this.getAllReservations();
    },
    methods: {
        switchIsDialogVisible() {
            this.$emit('switchIsDialogVisible')
        },
        async getAllUsers() {
            try {
                const users = await apiService.get("/users");
                this.users = users.data;
            } catch (err) {
                this.$toast.show('Failed to load users', {
                    type: 'error',
                });
            }
        },
        async getAllReservations() {
            try {
                const res = await apiService.get('/reservations', {
                    params: {
                        carId: this.selectedCar,
                    },
                });
                if (res.data.length > 0) {
                    const reservations = res.data.map(reservation => {
                        const user = this.users.find(u => u._id === reservation.userId);
                        return {
                            dateFrom: new Date(reservation.dateFrom).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                            dateTo: new Date(reservation.dateTo).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                            status: `${user.firstName} ${user.lastName} (${user.email})`
                        }
                    })
                    this.reservations = reservations
                }
            } catch (err) {
                this.$toast.show('Failed to load reservations', {
                    type: 'error',
                });
            }
        },
    }
}
</script>

<style scoped></style>