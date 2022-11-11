import { createApp } from "vue";
import App from "./App.vue";
import "./styles/normalize.css";
import { initRouter } from "./router";
import { initStore } from "./store";
/* markdown */
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//路由初始化
initRouter(app);
//md Init
app.use(mavonEditor);
//Vuex初始化
initStore(app);
app.mount("#app");
