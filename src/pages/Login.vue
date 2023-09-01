<template>
    <div class="wrapper">
        <div class="block">
            <form class="form block-content">
                <div class="header">
                    <div class="header-block header-block-1" :class="selectedTab === 1 ? 'active' : ''"
                        @click="switchSelectedTab(1)">Sign in</div>
                    <div class="header-block header-block-2" :class="selectedTab === 2 ? 'active' : ''"
                        @click="switchSelectedTab(2)">Sign up</div>
                </div>
                <div class="form-fields">
                    <template v-if="selectedTab === 2">
                        <div class="form-group">
                            <span class="p-input-icon-left form-input">
                                <i class="pi pi-user" />
                                <InputText v-model="user.firstname" placeholder="First name" class="form-input"
                                    :class="{ error: v$.user.firstname.$errors.length }" />
                            </span>
                            <div class="input-errors" v-for="error of v$.user.firstname.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                        <div class="form-group">
                            <span class="p-input-icon-left form-input">
                                <i class="pi pi-user" />
                                <InputText v-model="user.lastname" placeholder="Last name" class="form-input"
                                    :class="{ error: v$.user.lastname.$errors.length }" />
                            </span>
                            <div class="input-errors" v-for="error of v$.user.lastname.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                    </template>
                    <div class="form-group">
                        <span class="p-input-icon-left form-input">
                            <i class="pi pi-envelope" />
                            <InputText v-model="user.email" placeholder="Email" class="form-input"
                                :class="{ error: v$.user.email.$errors.length }" />
                        </span>
                        <div class="input-errors" v-for="error of v$.user.email.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <span class="p-input-icon-left form-input">
                            <i class="pi pi-lock" />
                            <InputText v-model="user.password" placeholder="Password" class="form-input" type="password"
                                :class="{ error: v$.user.password.$errors.length }" />
                        </span>
                        <div class="input-errors" v-for="error of v$.user.password.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                    <template v-if="selectedTab === 2">
                        <div class="form-group">
                            <span class="p-input-icon-left form-input">
                                <i class="pi pi-lock" />
                                <InputText v-model="user.confirmPassword" placeholder="Confirm password" class="form-input"
                                    type="password" :class="{ error: v$.user.confirmPassword.$errors.length }" />
                            </span>
                            <div class="input-errors" v-for="error of v$.user.confirmPassword.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                    </template>
                    <Button label="Submit" @click="selectedTab === 1 ? signIn() : signUp()" class="btn" />
                </div>
            </form>
        </div>
        <div class="block">
            <img src="/images/auth/undraw_security_re_a2rk.svg" alt="Login" class="block-content" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as authTypes from '../store/modules/auth/auth-types';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        selectedTab: 1,
        user: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }),
    methods: {
        ...mapActions({
            getLoginAction: authTypes.SET_TOKEN_ACTION,
            getSignUpAction: authTypes.REGISTER_USER,
        }),
        switchSelectedTab(tab) {
            this.selectedTab = tab;
        },
        async signIn() {
            const validationResult = await this.v$.$validate()
            if (!validationResult) {
                return
            }
            const user = {
                email: this.user.email,
                password: this.user.password,
            }
            await this.getLoginAction(user);
        },
        async signUp() {
            const validationResult = await this.v$.$validate()
            if (!validationResult) {
                return
            }
            const newUser = {
                firstName: this.user.firstname,
                lastName: this.user.lastname,
                email: this.user.email,
                password: this.user.password,
            }
            await this.getSignUpAction(newUser);
        }
    },
    validations() {
        const passwordIsSame = (password) => {
            return password === this.user.password;
        };

        return {
            user: {
                firstname: {
                    required: this.selectedTab === 2
                },
                lastname: {
                    required: this.selectedTab === 2
                },
                email: {
                    required, email
                },
                password: {
                    required,
                    min: minLength(6)
                },
                confirmPassword: {
                    required: this.selectedTab === 2,
                    sameAsPassword: this.selectedTab === 2 && helpers.withMessage('Passwords do not match', passwordIsSame)
                }
            },
        }
    },
}
</script>

<style scoped>
.wrapper {
    display: flex;
    width: 100%;
    height: calc(100vh - 66px);
    justify-content: space-between;
}

.block {
    width: 100%;
    height: 100%;
    position: relative;
}

.block-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.form {
    width: 50%;
    box-shadow: 0px 0px 26px -7px rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: 1px solid #fff;
}

.form-fields {
    padding: 50px;
}

.form-group {
    width: 100%;
    margin-bottom: 30px;
}

.form-input {
    width: 100%;
}

.header {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.header-block {
    border: 1px solid #fff;
    width: 100%;
    cursor: pointer;
    padding: 20px;
    text-align: center;
    font-size: 20px;
}

.header-block-1 {
    border-top-left-radius: 10px;
}

.header-block-2 {
    border-top-right-radius: 10px;
}

.active {
    background-color: #C4B5FD;
    color: #040d19;
    font-weight: 600;
}

.btn {
    margin-top: 20px;
    width: 100%;
}

.error {
    border: 1px solid rgb(241, 120, 120);
}

.error-msg {
    font-size: 12px;
    color: rgb(241, 120, 120);
    margin-top: 10px;
}
</style>