<template>
  <v-app-bar app flat color="white">
    <logo />
    <v-spacer />
    <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
    <div v-if="$vuetify.breakpoint.mdAndDown">
      <v-app-bar-nav-icon @click="toggleNav" />
    </div>
  </v-app-bar>
</template>

<script>
import Logo from './logo.vue'

export default {
  components: { Logo },
  methods: {
    toggleNav() {
      this.$root.$emit('toggleNavigation')
    },
  },
}
</script>

<style scoped>
.navgation {
  top: 80px;
  left: 10px;
  right: 10px;
}
</style>
