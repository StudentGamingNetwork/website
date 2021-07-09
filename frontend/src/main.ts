import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import App from "./App.vue";

library.add(fas, fab);
const app = createApp(App);
app.mount("#app");

