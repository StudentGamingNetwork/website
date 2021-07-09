import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Landing from "@/views/Landing.vue";
import Federation from "@/views/Federation.vue";
import Tournaments from "@/views/Tournaments.vue";
import Partners from "@/views/Partners.vue";
import About from "@/views/About.vue";

const routes: Array<RouteRecordRaw> = [
    {
        name: "landing",
        component: Landing,
        meta: {
            title: "Student Gaming Network",
            guest: true
        },
        path: "/"
    },
    {
        name: "federation",
        component: Federation,
        meta: {
            title: "Fédération",
            guest: true
        },
        path: "/federation"
    },
    {
        name: "tournaments",
        component: Tournaments,
        meta: {
            title: "Tournois",
            guest: true
        },
        path: "/tournaments"
    },
    {
        name: "partners",
        component: Partners,
        meta: {
            title: "Partenaires",
            guest: true
        },
        path: "/partners"
    },
    {
        name: "about",
        component: About,
        meta: {
            title: "À propos",
            guest: true
        },
        path: "/about"
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
