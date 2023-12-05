import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/store";

// reset style sheet
import "@/styles/reset.scss";
// font css
import "@/assets/fonts/font.scss";

/* element */
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(router).use(pinia).mount("#app");
