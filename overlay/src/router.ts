import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        name: "viewer",
        component: () => import("./pages/PViewer.vue"),
        path: "/static/overlay/viewer"
    },
    {
        name: "total",
        component: () => import("./pages/PTotal.vue"),
        path: "/static/overlay/total"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
