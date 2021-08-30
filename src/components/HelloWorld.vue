<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" v-if="token.length > 0">
        <h2>You are logged in!</h2>
        <v-text-field v-model="q" type="text"></v-text-field>
        <v-btn @click="search">Search</v-btn>
      </v-col>
      <v-col cols="12" v-else>
        <a :href="this.loginLink">
          <v-btn>Login</v-btn>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-library-read",
  "user-read-recently-played",
  "user-top-read",
  "user-read-private",
];

const [client_id, redirect_uri] = [
  process.env.VUE_APP_CLIENT_ID,
  process.env.VUE_APP_REDIRECT_URI,
];

export default Vue.extend({
  name: "HelloWorld",
  created: async function () {
    const param = window.location?.href?.match(/(\?|#|&)access_token=([^&]*)/);
    const token = param && param.length > 1 ? decodeURIComponent(param[2]) : "";
    if (token) {
      this.token = token;
    }
    try {
      const response = await fetch("localhost:3001/api/getLyrics");
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  },
  data: () => ({
    loginLink: `https://accounts.spotify.com/authorize?client_id=${client_id}&scopes=${scopes.join(
      ","
    )}&redirect_uri=${redirect_uri}&response_type=token`,
    token: "",
    q: "",
  }),
  methods: {
    async search() {
      const response = await fetch(
        `https://api.spotify.com/v1/search?query=${encodeURIComponent(
          this.q
        )}&offset=0&limit=20&type=track`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const json = await response.json();
      console.log(json);
    },
  },
});
</script>
