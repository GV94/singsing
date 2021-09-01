<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">LYRA</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Cookies from "js-cookie";

export default Vue.extend({
  name: "App",
  data: () => ({
    room: "",
    token: "",
  }),
  created: async function () {
    const cookie = Cookies.get("spotify-access-token");
    if (cookie) {
      this.token = cookie;
    } else {
      const param = window.location?.href?.match(
        /(\?|#|&)access_token=([^&]*)/
      );
      const token =
        param && param.length > 1 ? decodeURIComponent(param[2]) : "";
      if (token) {
        this.token = token;
        Cookies.set("spotify-access-token", token, {
          expires: new Date(Date.now() + 3600 * 1000),
        });
      }
    }
    if (window.location.href.includes("#access_token")) {
      window.location.replace("/");
    }
  },
});
</script>
