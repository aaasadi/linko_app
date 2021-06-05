<template>
  <v-card class="mx-auto">
    <v-card-text class="pb-2">
      <v-row no-gutters>
        <div>
          <h4 class="title">my Website</h4>
          <nuxt-link :to="link.slug" class="link"
            ><span class="address">https://linko.ir/</span
            >{{ link.slug }}</nuxt-link
          >
        </div>
        <v-spacer />
        <v-btn icon ripple>
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
      </v-row>
    </v-card-text>
    <v-card-actions class="pa-4 pt-0">
      <v-row no-gutters align="center">
        <span><v-icon left>mdi-eye</v-icon> 108</span>
        <v-spacer />
        <v-btn text small color="primary">
          More
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['link'],
}
</script>

<style scoped>
.title {
  font-weight: 300;
  font-size: 2em !important;
  margin-bottom: 0.5rem;
}
.link {
  color: #333;
  text-decoration: none;
}
.link .address {
  color: #aaa;
}
</style>
