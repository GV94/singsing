<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h2>You are logged in!</h2>
        <v-text-field v-model="q" type="text"></v-text-field>
        <v-btn @click="search">Search</v-btn>
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
import SongCard from "./SongCard/SongCard.vue";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    token: String,
  },
  data: () => ({
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
