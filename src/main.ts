import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";
import vuetify from "./plugins/vuetify";
import CreateGame from "./views/CreateGame/CreateGame.vue";
import Start from "./views/Start/Start.vue";

const routes = [
  {
    path: "/",
    component: Start,
  },
  {
    path: "/game/:lobby",
    component: HelloWorld,
  },
  {
    path: "/create-game",
    component: CreateGame,
  },
];

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: "history",
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
