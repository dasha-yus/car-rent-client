<template>
    <div>
        <Menubar :model="items" v-model:activeIndex="active" class="navbar">
            <template #start>
                <router-link to="/" class="link">
                    <h3 class="logo">Car<span id="rent">Rent</span></h3>
                </router-link>
            </template>

            <template #end>
                <span class="p-input-icon-left">
                    <!-- <i class="pi pi-search" />
                    <InputText type="text" v-model="value3" placeholder="Search" /> -->
                </span>
                <Button class="btn" v-if="!isLoggedIn" label="Log in"></Button>
                <Button class="btn" v-else label="Log out"></Button>
            </template>
        </Menubar>
    </div>
</template>

<script>
export default {
    data: () => ({
        active: 1,
        items: [
            {
                label: 'Vehicles',
                icon: 'pi pi-car',
                to: '/'
            },
            {
                label: 'Reservations',
                icon: 'pi pi-calendar',
                to: '/reservations'
            }
        ],
        isLoggedIn: false
    })
}
</script>

<style scoped>
.navbar {
    border-radius: 0;
    padding: 10px var(--var-default-margin);
}

.logo {
    margin-right: 20px;
}

#rent {
    color: var(--primary-color);
}

.btn {
    margin-left: 15px;
}

.link {
    color: #fff;
    text-decoration: none;
}
</style>