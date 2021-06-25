<template>
  <v-flex class="container">
    <v-row no-gutters class="flex-grow-1" align="center" justify="center">
      <logo :size="2" />
    </v-row>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-form @submit.prevent="submit" class="flex-grow-0">
        <validation-provider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-row no-gutters>
            <v-text-field
              v-model="data.email"
              placeholder="Your Email Address"
              label="Email Address"
              :error-messages="errors"
              outlined
            />
          </v-row>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="password"
          rules="required|min:8"
        >
          <v-row no-gutters>
            <v-text-field
              v-model="data.password"
              placeholder="Your Password"
              label="Password"
              :append-icon="show_password ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show_password ? 'text' : 'password'"
              @click:append="show_password = !show_password"
              :error-messages="errors"
              outlined
            />
          </v-row>
        </validation-provider>
        <v-row no-gutters align="center" justify="space-between">
          <v-checkbox v-model="remember_me" label="Remember me" />
          <nuxt-link to="/forget_password" class="link"
            >Forget Password?</nuxt-link
          >
        </v-row>
        <v-row no-gutters justify="center">
          <v-btn
            class="px-8 py-6"
            max-width="250px"
            width="80%"
            type="submit"
            rounded
            color="primary"
            :disabled="invalid"
            >Login</v-btn
          >
        </v-row>
      </v-form>
    </validation-observer>
    <v-row class="mt-5 flex-grow-0" no-gutters justify="center">
      <p>
        create your account
        <nuxt-link to="/register" class="link">Sign up</nuxt-link>
      </p>
    </v-row>
  </v-flex>
</template>

<script>
import { required, email, min } from 'vee-validate/dist/rules'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  setInteractionMode,
} from 'vee-validate'
import Logo from '~/components/logo.vue'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})
extend('email', {
  ...email,
  message: 'Email must be valid',
})
extend('min', {
  ...min,
  message: '{_field_} may not be short than {length} characters',
})

export default {
  layout: 'sample',
  auth: 'guest',
  components: { Logo, ValidationObserver, ValidationProvider },
  head: {
    title: 'Login page',
  },
  data() {
    return {
      show_password: false,
      remember_me: true,
      data: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async submit() {
      const validation = this.$refs.observer.validate()
      if (validation) {
        try {
          await this.$auth.loginWith('local', { data: this.data })
        } catch (err) {
          // handle error
        }
      }
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
.link {
  text-decoration: none;
}
</style>
