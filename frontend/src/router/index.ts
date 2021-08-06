import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { User } from "@/modules";

const routes: Array<RouteRecordRaw> = [
    {
        name: "landing",
        component: () => import(/* webpackChunkName: "landing" */ "@/views/Landing.vue"),
        meta: {
            title: "Student Gaming Network",
            guest: true
        },
        path: "/"
    },
    {
        name: "federation",
        component: () => import(/* webpackChunkName: "federation" */ "@/views/Federation.vue"),
        meta: {
            title: "Fédération",
            guest: true
        },
        path: "/federation"
    },
    {
        name: "tournaments",
        component: () => import(/* webpackChunkName: "tournaments" */ "@/views/Tournaments.vue"),
        meta: {
            title: "Tournois",
            guest: true
        },
        path: "/tournaments"
    },
    {
        name: "partners",
        component: () => import(/* webpackChunkName: "partners" */ "@/views/Partners.vue"),
        meta: {
            title: "Partenaires",
            guest: true
        },
        path: "/partners"
    },
    {
        name: "about",
        component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue"),
        meta: {
            title: "À propos",
            guest: true
        },
        path: "/about"
    },
    {
        name: "admin",
        component: () => import(/* webpackChunkName: "admin" */ "@/views/Admin.vue"),
        meta: {
            title: "Administration",
            admin: true
        },
        path: "/admin"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string || "Student Gaming Network";

    if (to.matched.some(record => record.meta.admin)) {
        const userStore = User.useStore();

        if (userStore.isMember) {
            return next();
        }

        return next({
            path: "/"
        });
    }

    return next();
});

export default router;
