<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
    <snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/snackbar.vue'
export default {
  components: { Snackbar },
}
</script>
