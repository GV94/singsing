<template>
  <v-container>
    <h2>Create Game</h2>
    <v-row v-if="errorOccured">
      <p class="col-12">
        {{ errorMessage }}
      </p>
    </v-row>
    <v-row>
      <router-link to="/">
        <v-btn class="col-12">Take me back</v-btn>
      </router-link>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Cookies from "js-cookie";

export default Vue.extend({
  name: "CreateGame",
  data: () => ({ errorOccured: false, errorMessage: "" }),
  created() {
    const param = window.location?.href?.match(/(\?|#|&)access_token=([^&]*)/);
    const token = param && param.length > 1 ? decodeURIComponent(param[2]) : "";
    if (token) {
      Cookies.set("spotify-access-token", token, {
        expires: new Date(Date.now() + 3600 * 1000),
      });
      /* TODO: Create a new lobby and redirect the user to it. */
      this.$router.push("/game/gameLobbyHere");
    } else {
      this.errorOccured = true;
      this.errorMessage =
        "Failed to login to spotify. Please go back and try again.";
    }
  },
});
</script>
