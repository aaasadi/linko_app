<template>
  <v-app-bar app flat color="white">
    <h2>Linko</h2>
    <v-spacer />
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn text to="/">Account</v-btn>
      <v-btn text to="/">Help</v-btn>
      <v-btn text @click="logout()">Logout</v-btn>
    </div>
    <div v-else>
      <v-app-bar-nav-icon />
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push({ path: '/' })
    },
  },
}
</script>
