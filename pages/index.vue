<template>
  <v-flex justify="center" align="center">
    <v-row no-gutters>
      <h2>Linko</h2>
      <v-spacer />
      <div v-if="$auth.loggedIn">
        <v-btn text to="/panel">Panel</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </div>
    </v-row>
  </v-flex>
</template>

<script>
export default {
  auth: false,
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
