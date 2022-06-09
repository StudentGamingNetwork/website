import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { User } from "@/modules";

const routes: Array<RouteRecordRaw> = [
    {
        name: "landing",
        component: () => import("@/views/Landing.vue"),
        meta: {
            title: "Student Gaming Network"
        },
        path: "/"
    },
    {
        name: "federation",
        component: () => import("@/views/Federation.vue"),
        meta: {
            title: "Fédération"
        },
        path: "/federation"
    },
    {
        name: "tournaments",
        component: () => import("@/views/Tournaments.vue"),
        meta: {
            title: "Tournois"
        },
        path: "/tournaments"
    },
    {
        name: "tournament",
        component: () => import("@/views/Tournament.vue"),
        meta: {
            title: "Tournoi"
        },
        path: "/tournament/:slug/:page?/:management?"
    },
    {
        name: "tournament-widget",
        component: () => import("@/views/TournamentWidget.vue"),
        meta: {
            title: "Tournoi"
        },
        path: "/tournament-widget/:slug/"
    },
    {
        name: "partners",
        component: () => import("@/views/Partners.vue"),
        meta: {
            title: "Partenaires"
        },
        path: "/partners"
    },
    {
        name: "about",
        component: () => import("@/views/About.vue"),
        meta: {
            title: "À propos"
        },
        path: "/about"
    },
    {
        name: "association",
        component: () => import("@/views/Association.vue"),
        meta: {
            title: "Association"
        },
        path: "/association/:slug"
    },
    {
        name: "admin",
        component: () => import("@/views/Admin.vue"),
        meta: {
            title: "Administration",
            admin: true
        },
        path: "/admin/:page?/:id?"
    },
    {
        name: "redirect",
        component: () => import("@/views/Redirect.vue"),
        meta: {
            title: "Redirection"
        },
        path: "/to/:page"
    },
    {
        name: "not-found",
        component: () => import("@/views/NotFound.vue"),
        meta: {
            title: "Page introuvable"
        },
        path: "/:path(.*)*"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title as string || "Student Gaming Network";

    if (to.matched.some(record => record.meta.admin)) {
        const userStore = User.useStore();

        if (!userStore.isMember) {
            await userStore.init();
        }

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
