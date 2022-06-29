import Vehicles from "@/pages/Vehicles";
import Reservations from "@/pages/Reservations";
import Car from "@/pages/Car";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/cars",
  },
  {
    path: "/cars",
    component: Vehicles,
  },
  {
    path: "/cars/:id",
    component: Car,
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
