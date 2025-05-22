import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { createPinia } from "pinia";
import i18n from "./locales";
import router from "./router";
import App from "./App.vue";


const pinia = createPinia();

library.add(fas, fab);

const app = createApp(App);

app.use(router)
    .use(pinia)
    .use(i18n)
    .mount("#app");

