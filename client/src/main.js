import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
import store from "./store/auth";

createApp(App).use(router).use(store).mount("#app");
