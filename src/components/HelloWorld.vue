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
    <v-row>
      <v-col cols="12" v-if="tracks && tracks.items">
        <v-row v-for="track in tracks.items" :key="track.id">
          <SongCard :track="track" />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Cookies from "js-cookie";
import SongCard from "./SongCard/SongCard.vue";

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
  data: () => ({
    loginLink: `https://accounts.spotify.com/authorize?client_id=${client_id}&scopes=${scopes.join(
      ","
    )}&redirect_uri=${redirect_uri}&response_type=token`,
    token: "",
    q: "",
    tracks: null,
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
      this.tracks = json.tracks;
    },
  },
  components: {
    SongCard,
  },
});
</script>
