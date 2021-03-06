<template>
  <v-flex class="container">
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
              placeholder="Your Email"
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
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="showPass = !showPass"
              :error-messages="errors"
              outlined
            />
          </v-row>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="confirm_password"
          rules="required|confirmed:password"
        >
          <v-row no-gutters>
            <v-text-field
              v-model="data.confirm_password"
              placeholder="Repeat Password"
              :type="showPass ? 'text' : 'password'"
              label="Confirm Password"
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
            color="primary"
            :disabled="invalid"
            >Register</v-btn
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
import { required, email, min, confirmed } from 'vee-validate/dist/rules'
import {
  extend,
  setInteractionMode,
  ValidationProvider,
  ValidationObserver,
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
extend('min', {
  ...min,
  message: '{_field_} may not be short than {length} characters',
})
extend('confirmed', {
  ...confirmed,
  message: 'password is not confirm',
})

export default {
  auth: false,
  layout: 'sample',
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      showPass: false,
      data: {
        email: '',
        password: '',
        confirm_password: '',
      },
    }
  },
  methods: {
    async submit() {
      const validation = this.$refs.observer.validate()
      if (validation) {
        try {
          await this.$axios.$post('/user/register', {
            email: this.data.email,
            password: this.data.password,
          })
          this.$router.push({ path: '/send_email' })
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
  justify-content: center;
  height: 100%;
}
.link {
  text-decoration: none;
}
</style>
