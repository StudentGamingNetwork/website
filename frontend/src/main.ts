import { createApp } from "vue";
import { createI18n } from 'vue-i18n'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import FR from "@/locale/fr.json";
import EN from "@/locale/en.json";
import Cookies from 'universal-cookie';

const pinia = createPinia();
const cookies = new Cookies(null, { path: '/' });

export const i18n = createI18n({
    locale: cookies.get('locale'),
    messages: {
        fr: FR,
        en: EN
    }
})

export const langs = [
        { label: "FR", value: "fr" },
        { label: "EN", value: "en" }
    ]

library.add(fas, fab);

const app = createApp(App);

app.use(router)
    .use(pinia)
    .use(i18n)
    .mount("#app");

