import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import router from "./router";
import App from "./App.vue";

library.add(fas, fab);
createApp(App)
    .use(router)
    .mount("#app");
