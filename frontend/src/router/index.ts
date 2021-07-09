import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Landing from "../views/Landing.vue";

const routes: Array<RouteRecordRaw> = [
    {
        name: "landing",
        component: Landing,
        meta: {
            title: "Student Gaming Network",
            guest: true
        },
        path: "/"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string || "Student Gaming Network";
    next();
});

export default router;
