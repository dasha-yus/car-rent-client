<template>
    <div>
        <Menubar :model="items" class="navbar">
            <template #start>
                <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40"
                    class="mr-2">
            </template>
            <template #end>
                <InputText placeholder="Search" type="text" />
                <Button v-if="!isLoggedIn" label="Log in"></Button>
                <Button v-else label="Log out"></Button>
            </template>
        </Menubar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label: 'Cars',
                    icon: 'pi pi-fw pi-user-plus',
                    to: '/'
                },
                {
                    label: 'Second',
                    icon: 'pi pi-fw pi-calendar-times',
                    to: '/second'
                }
            ],
            isLoggedIn: false
        }
    }
}
</script>

<style scoped>
.navbar {
    border-radius: 0;
}
</style>