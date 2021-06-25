<template>
  <v-flex class="container">
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-form @submit.prevent="submit" class="flex-grow-0">
        <validation-provider
          name="email"
          v-slot="{ errors }"
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
        <v-row no-gutters justify="center">
          <v-btn
            class="px-8 py-6"
            max-width="250px"
            width="80%"
            type="submit"
            rounded
            :disabled="invalid"
            color="primary"
            >Send Email</v-btn
          >
        </v-row>
      </v-form>
    </validation-observer>
    <v-row class="mt-5 flex-grow-0" no-gutters justify="center">
      <nuxt-link to="/login" class="link">Back to Login page</nuxt-link>
    </v-row>
  </v-flex>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')
extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})
extend('email', {
  ...email,
  message: 'Email must be valid',
})

export default {
  auth: false,
  layout: 'sample',
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      data: {
        email: '',
      },
    }
  },
  methods: {
    submit() {
      const validation = this.$refs.observer.validate()
      if (validation) {
        try {
          this.$axios.$post('/user/forget_password', this.data)
          this.$router.push({ path: '/send_email' })
        } catch (err) {
          // handle err
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
  justify-content: center;
  height: 100%;
}
.link {
  text-decoration: none;
}
</style>
