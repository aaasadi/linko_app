<template>
  <v-flex class="container">
    <v-row no-gutters class="flex-grow-1" align="center" justify="center">
      <h2>Linko</h2>
    </v-row>
    <v-form @submit="submit" class="flex-grow-0">
      <v-row no-gutters>
        <v-text-field
          v-model="login.email"
          placeholder="Your Email Address"
          label="Email Address"
          outlined
        />
      </v-row>
      <v-row no-gutters>
        <v-text-field
          v-model="login.password"
          placeholder="Insert Password"
          label="Password"
          type="password"
          outlined
        />
      </v-row>
      <v-row no-gutters align="center" justify="space-between">
        <v-checkbox label="Remember me" />
        <nuxt-link to="/forger_password">Forget Password?</nuxt-link>
      </v-row>
      <v-row no-gutters justify="center">
        <v-btn
          class="px-8 py-6"
          max-width="250px"
          width="80%"
          type="submit"
          rounded
          color="primary"
          >Login</v-btn
        >
      </v-row>
    </v-form>
    <v-row class="mt-5 flex-grow-0" no-gutters justify="center">
      <p>create your account <nuxt-link to="/register">Sign in</nuxt-link></p>
    </v-row>
  </v-flex>
</template>

<script>
export default {
  layout: 'sample',
  auth: 'guest',
  data() {
    return {
      login: {
        email: 'amirabbas@gmail.com',
        password: 'Amir16101373',
      },
    }
  },
  methods: {
    async submit(event) {
      event.preventDefault()
      const result = await this.$auth.loginWith('local', { data: this.login })
      this.$router.push({ path: '/' })
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  width: 95%;
  max-width: 600px;
  flex-direction: column;
  height: 100%;
}
</style>
