<template>
  <v-col cols="12">
    <button
      :class="`${componentName}-container`"
      @click="toggleExpanded"
      v-if="track.artists && track.artists.length"
    >
      <v-card width="100%" class="d-flex-column justify-space-between">
        <div class="d-flex col-12 justify-space-between pa-0">
          <div class="d-flex-column col-7 col-sm-8">
            <v-card-title
              class="text-left text-truncate d-block"
              v-text="track.name"
            ></v-card-title>
            <v-card-subtitle
              v-text="track.artists[0].name"
              class="text-left"
            ></v-card-subtitle>
          </div>

          <v-avatar tile size="125" class="pa-0">
            <v-img :src="track.album.images[1].url"></v-img>
          </v-avatar>
        </div>

        <div v-if="lyrics.youSing.length && expanded">
          <v-divider />
          <div class="mt-4 mb-4">
            <p class="text-h8">You Sing</p>
            <v-card-text
              class="pa-0"
              v-for="(text, i) in lyrics.youSing"
              :key="`${text}-${i}`"
            >
              {{ text }}
            </v-card-text>
            <p class="text-h8 mt-4">They Sing</p>
            <v-card-text
              class="pa-0"
              v-for="(text, i) in lyrics.theySing"
              :key="`${text}-${i}`"
            >
              {{ text }}
            </v-card-text>
          </div>
          <v-card-actions v-if="expanded" class="col-12 d-flex justify-end">
            <v-btn @click="(e) => shuffle(e)">Shuffle</v-btn>
            <v-btn>Select</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </button>
  </v-col>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import "./SongCard.scss";

const componentName = "SongCard";

export default Vue.extend({
  name: componentName,
  data: () => ({
    componentName,
    expanded: false,
    lyrics: {
      youSing: [],
      theySing: [],
    },
  }),
  methods: {
    async toggleExpanded() {
      if (!this.expanded) {
        if (!this.lyrics.youSing.length) await this.getLyrics();
        this.expanded = true;
      } else {
        this.expanded = false;
      }
    },
    async getLyrics() {
      const artist = this.track.artists[0].name;
      const track = this.track.name;
      try {
        const response = await fetch("http://localhost:3001/api/getLyrics", {
          method: "POST",
          body: JSON.stringify({
            artist,
            track,
          }),
        });
        const json = await response.json();
        this.lyrics = json;
      } catch (err) {
        console.log(err);
      }
    },
    async shuffle(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      this.getLyrics();
    },
  },
  props: {
    track: {
      type: Object as PropType<{
        artists: { name: string }[];
        name: string;
        album: {
          images: {
            height: number;
            width: number;
            url: string;
          };
        }[];
      }>,
    },
  },
});
</script>
