import Vehicles from "@/pages/Vehicles";
import Reservations from "@/pages/Reservations";
import Car from "@/pages/Car";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
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
  {
    path: "/login",
    component: Login,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
