import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";

import PrimeVue from "primevue/config";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Card from "primevue/card";
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';

import "primevue/resources/themes/lara-dark-purple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue);

app
  .component("Menubar", Menubar)
  .component("Card", Card)
  .component("InputText", InputText)
  .component("Button", Button)
  .component("InputNumber", InputNumber)
  .component("Dropdown", Dropdown);

app.use(router);
app.mount("#app");
