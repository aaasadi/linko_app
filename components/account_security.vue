<template>
  <div>
    <v-row no-gutters align="center" class="py-3">
      <v-subheader class="pa-0"> Change Password </v-subheader>
      <v-spacer />
      <v-btn
        text
        small
        color="primary"
        @click="showChangePasswordFields = !showChangePasswordFields"
      >
        <template v-if="!showChangePasswordFields">
          change password
          <v-icon right>mdi-key</v-icon>
        </template>
        <template v-else>hide</template>
      </v-btn>
    </v-row>
    <v-expand-transition>
      <div v-show="showChangePasswordFields">
        <v-form>
          <validation-observer ref="observer">
            <validation-provider
              name="current password"
              v-slot="{ errors }"
              rules="required|min:8|max:32"
            >
              <v-text-field
                v-model="security.current_password"
                label="Current Password"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                :error-messages="errors"
                outlined
                @change="changeStatus = true"
              />
            </validation-provider>
            <validation-provider
              name="new password"
              v-slot="{ errors }"
              rules="required|min:8|max:32"
            >
              <v-text-field
                v-model="security.new_password"
                label="New Password"
                :type="showPassword ? 'text' : 'password'"
                :error-messages="errors"
                outlined
              />
            </validation-provider>
            <validation-provider
              name="confirm password"
              v-slot="{ errors }"
              rules="required|confirmed:new password"
            >
              <v-text-field
                v-model="security.confirm_new_password"
                label="Confirm New Password"
                :type="showPassword ? 'text' : 'password'"
                :error-messages="errors"
                outlined
              />
            </validation-provider>
          </validation-observer>
        </v-form>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import { required, min, max, confirmed } from 'vee-validate/dist/rules'
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
extend('min', {
  ...min,
  message: '{_field_} may not be short than {length} characters',
})
extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})
extend('confirmed', {
  ...confirmed,
  message: 'password is not confirm',
})

export default {
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      security: {
        current_password: '',
        new_password: '',
        confirm_new_password: '',
      },
      showPassword: false,
      showChangePasswordFields: false,
      changeStatus: false,
    }
  },
  methods: {
    async chagePassword() {
      if (
        this.security.current_password != '' &&
        this.security.new_password != '' &&
        this.security.confirm_new_password != ''
      ) {
        const isValid = this.$refs.observer.validate()
        if (isValid) {
          try {
            await this.$axios.$put('/user/change_password', {
              current_password: this.security.current_password,
              new_password: this.security.new_password,
            })
          } catch (err) {
            // handle error
          }
          this.security.current_password = ''
          this.security.new_password = ''
          this.security.confirm_new_password = ''
        }
      }
    },
  },
  created() {
    this.$root.$on('accountSecurity', () => {
      this.chagePassword()
    })
  },
}
</script>
