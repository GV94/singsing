<template>
  <v-container class="d-flex flex-column" :class="`${name}-Container`">
    <h1 class="text-h1 text-center mb-16">Lyra</h1>
    <div class="d-flex flex-column mt-4">
      <v-row>
        <v-col cols="12">
          <a :href="this.loginLink">
            <v-btn class="col-12">Start Game</v-btn>
          </a>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn class="col-12">Join game</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn class="col-12">How to play</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import "./Start.scss";

const name = "Start";
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
  name,
  data: () => ({
    name,
    loginLink: `https://accounts.spotify.com/authorize?client_id=${client_id}&scopes=${scopes.join(
      ","
    )}&redirect_uri=${redirect_uri}&response_type=token`,
  }),
});
</script>

<style></style>
