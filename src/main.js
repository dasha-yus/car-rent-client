import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import Vuex from "vuex";

import PrimeVue from "primevue/config";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Card from "primevue/card";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import Tooltip from "primevue/tooltip";

import Toaster from '@meforma/vue-toaster';

import "primevue/resources/themes/lara-dark-purple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import { store } from "./store/store";

const app = createApp(App);
app.use(PrimeVue);
app.use(Vuex);

app
  .component("Menubar", Menubar)
  .component("Card", Card)
  .component("InputText", InputText)
  .component("Button", Button)
  .component("Dialog", Dialog)
  .component("InputNumber", InputNumber)
  .component("Dropdown", Dropdown)
  .component("Checkbox", Checkbox);

app.directive("tooltip", Tooltip);

app.use(router);
app.use(Toaster, {
  position: 'top-right'
})
app.use(store);
app.mount("#app");
