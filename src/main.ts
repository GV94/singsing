import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";
import vuetify from "./plugins/vuetify";
import Start from "./views/Start/Start.vue";

const routes = [
  {
    path: "/",
    component: Start,
  },
  {
    path: "game",
    component: HelloWorld,
  },
];

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes, // short for `routes: routes`
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
