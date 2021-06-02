<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer>
      <span :style="{ marginRight: '5px' }">power by</span>
      <a href="https://www.asadi.app">www.asadi.app</a>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
