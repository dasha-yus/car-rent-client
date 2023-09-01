<template>
    <div class="content">
        <h2>ALL USERS DEFINED IN THE SYSTEM</h2>
        <DataTable :value="users" paginator :rows="10" sortField="updatedAt" :sortOrder="-1" class="table">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" :sortable="col.sortable" ></Column>
        </DataTable>
    </div>
</template>

<script>
import apiService from '../services/apiService';

export default {
    data() {
        return {
            users: [],
            columns: [
                { field: 'firstName', header: 'First name', sortable: false },
                { field: 'lastName', header: 'Last name', sortable: true },
                { field: 'email', header: 'Email', sortable: false },
                { field: (item) => this.formatDate(item.createdAt), header: 'Created', sortable: true },
                { field: (item) => this.formatDate(item.updatedAt), header: 'Updated', sortable: true },
                { field: (item) => item.isAdmin ? 'ADMIN' : 'USER', header: 'Role', sortable: false },
            ]
        };
    },
    mounted() {
        this.getAllUsers()
    },
    methods: {
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
        formatDate(date) {
            const inputDate = new Date(date);
            const formattedDate = inputDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
            const formattedTime = inputDate.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
            });
            return `${formattedDate} ${formattedTime}`
        }
    },
}
</script>

<style scoped>
.table {
    margin-top: 20px;
}
</style>