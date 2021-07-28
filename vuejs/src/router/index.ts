import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { component } from "vue/types/umd";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    //Reportes
    {
        name: "MenuReporte",
        path: "/administracion",
        component: () => import("../views/MenuReportes.vue"),
    },
    {
        path: "/administracion/reporte",
        component: () => import("../views/ReporteLayaout.vue"),
        children: [
            {
                name: "ReporteGeneral",
                path: "/administracion/reporte/general",
                component: () => import("../views/ReporteGeneral.vue"),
            },

            {
                name: "ReporteDia",
                path: "/administracion/reporte/dia",
                component: () => import("../views/ReporteDia.vue"),
            },
            {
                name: "ReporteMedida",
                path: "/administracion/reporte/medida",
                component: () => import("../views/ReporteMedida.vue"),
            },
        ],
    },

    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
