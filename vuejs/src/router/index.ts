import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/MenuCaja.vue"),
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
            {
                name: "ReporteIngrediente",
                path: "/administracion/reporte/ingredientes",
                component: () => import("../views/ReporteIngrediente.vue"),
            },
            {
                name: "ReporteClientes",
                path: "/administracion/reporte/clientes",
                component: () => import("../views/ReporteClientes.vue"),
            },
        ],
    },
    {
        path: "/caja",
        name: "MenuCaja",
        component: () => import("../views/MenuCaja.vue"),
    },
    {
        name: "CrearPedido",
        path: "/caja/crear-pedido",
        component: () => import("../views/CrearPedido.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
