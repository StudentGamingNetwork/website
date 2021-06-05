import { createApp } from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";

const options = {};

const app = createApp(App);
const vuetify = Vuetify(app,options);
//app.use(vuetify);
app.mount("#app");

