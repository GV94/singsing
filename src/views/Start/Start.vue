<template>
  <v-container class="d-flex flex-column" :class="`${name}-Container`">
    <h1 class="text-h1 text-center mb-16">Lyra</h1>
    <div class="d-flex flex-column mt-4">
      <v-row>
        <v-col cols="12">
          <v-btn class="col-12">Start game</v-btn>
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
export default Vue.extend({
  name,
  data: () => ({
    name,
  }),
});
</script>

<style></style>
