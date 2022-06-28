import Vehicles from "@/pages/Vehicles";
import Reservations from "@/pages/Reservations";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Vehicles,
  },
  {
    path: "/reservations",
    component: Reservations,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
