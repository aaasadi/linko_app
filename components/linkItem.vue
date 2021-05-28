<template>
  <v-card class="mx-auto">
    <v-card-text class="pb-0">
      <v-row no-gutters>
        <div>
          <p class="display-1 text--primary">website</p>
          <nuxt-link :to="link.slug">{{ link.url }}</nuxt-link>
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
        <v-btn text color="primary">
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
