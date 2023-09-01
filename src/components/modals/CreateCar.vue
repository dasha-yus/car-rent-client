<template>
    <Dialog :visible="isDialogVisible" modal header="New car" :style="{ width: '50vw' }">
        <form>
            <div class="form-group">
                <div class="form-input">
                    <InputText v-model="car.brand" type="text" placeholder="Brand" class="form-input"
                        :class="{ error: v$.car.brand.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.brand.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="form-input">
                    <InputText v-model="car.model" type="text" placeholder="Model" class="form-input"
                        :class="{ error: v$.car.model.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.model.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-input-group">
                    <label for="doors">Number of doors</label>
                    <InputNumber inputId="doors" v-model="car.doors" :min="2" :max="4" showButtons class="form-input"
                        aria-placeholder="Number of doors" :class="{ error: v$.car.doors.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.doors.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="form-input-group">
                    <label for="seats">Number of seats</label>
                    <InputNumber inputId="seats" v-model="car.seats" :min="2" :max="20" showButtons class="form-input"
                        :class="{ error: v$.car.seats.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.seats.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-input-group">
                    <label for="year">Year</label>
                    <InputNumber inputId="year" v-model="car.year" :min="2015" :max="currentYear" showButtons
                        :useGrouping="false" class="form-input" :class="{ error: v$.car.year.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.year.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="form-input-group">
                    <label for="price">Price</label>
                    <InputNumber inputId="price" v-model="car.price" showButtons mode="currency" currency="USD" :step="10"
                        :min="10" class="form-input" :class="{ error: v$.car.price.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.price.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-input">
                    <Dropdown v-model="car.class" :options="classes" placeholder="Class" class="form-input"
                        :class="{ error: v$.car.class.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.class.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="form-input">
                    <Dropdown v-model="car.gearbox" :options="gearboxTypes" placeholder="Gearbox" class="form-input"
                        :class="{ error: v$.car.gearbox.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.gearbox.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="form-input">
                    <Dropdown v-model="car.fuel" :options="fuelTypes" placeholder="Fuel" class="form-input"
                        :class="{ error: v$.car.fuel.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.fuel.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-input-group">
                    <label for="power">Power, hp</label>
                    <InputNumber inputId="power" v-model="car.power" showButtons :min="50" :max="2000" class="form-input"
                        :class="{ error: v$.car.power.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.power.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-input-group">
                    <InputText v-model="car.image" type="text" placeholder="Image" class="form-input"
                        :class="{ error: v$.car.image.$errors.length }" />
                    <div class="input-errors" v-for="error of v$.car.image.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="car.conditioner" inputId="conditioner" :binary="true" />
                <label for="conditioner"> With air conditioning</label>
            </div>
        </form>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="switchIsDialogVisible" />
            <Button label="Save" icon="pi pi-check" @click="submitForm" />
        </template>
    </Dialog>
</template>

<script>
import apiService from '../../services/apiService';
import useVuelidate from '@vuelidate/core'
import { required, minValue, maxValue } from '@vuelidate/validators'

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            car: {
                brand: "",
                model: "",
                class: "",
                gearbox: "",
                fuel: "",
                year: "",
                price: "",
                doors: 4,
                seats: 4,
                power: "",
                image: "",
                conditioner: false,
            },
            classes: ['premium', 'sport', 'SUV', 'cabriolet', 'economy', 'electro'],
            gearboxTypes: ['manual', 'automatic', 'electro'],
            fuelTypes: ['hybrid', 'petrol', 'diesel', 'electro'],
            currentYear: new Date().getFullYear(),
        }
    },
    validations() {
        return {
            car: {
                brand: {
                    required
                },
                model: {
                    required
                },
                doors: {
                    required,
                    minValue: minValue(2),
                    maxValue: maxValue(4),
                },
                seats: {
                    required,
                    minValue: minValue(2),
                    maxValue: maxValue(20),
                },
                year: {
                    required,
                    minValue: minValue(2015),
                    maxValue: maxValue(this.currentYear)
                },
                price: {
                    required,
                    minValue: minValue(10),
                },
                class: {
                    required
                },
                gearbox: {
                    required
                },
                fuel: {
                    required
                },
                power: {
                    required,
                    minValue: minValue(50),
                    maxValue: maxValue(2000)
                },
                image: {
                    required
                }
            },
        }
    },
    props: {
        isDialogVisible: Boolean,
    },
    methods: {
        switchIsDialogVisible() {
            this.$emit('switchIsDialogVisible')
        },
        async submitForm() {
            const validationResult = await this.v$.$validate()
            if (!validationResult) {
                return
            }
            try {
                const res = await apiService.post('/cars', this.car);
                this.$toast.show(`${res.data.brand} ${res.data.model} was successfully added`, {
                    type: 'success',
                });
                this.$emit('onCarAdded');
                this.$emit('switchIsDialogVisible');
            } catch (err) {
                this.$toast.show('Failed to add a new car', {
                    type: 'error',
                });
            }
        },
    },
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

.form-input-group {
    width: 100%;
}

.form-input-group label {
    font-size: 14px;
    padding-left: 2px;
}

.form-input {
    width: 100%;
    margin-top: 8px;
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