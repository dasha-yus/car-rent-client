<template>
    <div>
        <Menubar :model="isAuth && user.isAdmin ? items : items.filter(item => item.label !== 'Users')"
            v-model:activeIndex=" active " class="navbar">
            <template #start>
                <router-link to="/" class="link">
                    <h3 class="logo">Car<span id="rent">Rent</span></h3>
                </router-link>
            </template>

            <template #end>
                <Button class="btn" v-if="!isAuth" label="Log in" @click=" redirectToLoginPage "></Button>
                <div v-if=" isAuth && user" class="end">
                    <p>Welcome, {{ user.firstName }}!</p>
                    <Button class="btn" label="Log out" @click=" logOut "></Button>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as authTypes from '../../store/modules/auth/auth-types';

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
            },
            {
                label: 'Users',
                icon: 'pi pi-users',
                to: '/users'
            }
        ],
    }),
    computed: {
        isAuth() {
            return this.$store.state.auth.isAuthenticated;
        },
        user() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        ...mapActions({
            getLogoutAction: authTypes.LOG_OUT
        }),
        async logOut() {
            this.getLogoutAction();
        },
        redirectToLoginPage() {
            this.$router.push('/login');
        }
    }
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

.end {
    display: flex;
    align-items: center;
    gap: 20px;
}
</style>