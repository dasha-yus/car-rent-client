import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";

import PrimeVue from "primevue/config";
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import "primevue/resources/themes/lara-dark-purple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue);

app.component("Menubar", Menubar);
app.component("InputText", InputText);
app.component("Button", Button);

app.use(router);
app.mount("#app");
