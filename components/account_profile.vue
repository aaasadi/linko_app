<template>
  <div>
    <v-row no-gutters align="center">
      <v-subheader class="pa-0"> Fullname </v-subheader>
      <v-spacer />
      {{ profile.name }}
      <v-btn
        class="ml-2"
        color="primary"
        @click="nameFieldStatus = !nameFieldStatus"
        text
        @change="changedData = true"
        small
      >
        <template v-if="!nameFieldStatus">
          {{ profile.name ? 'edit' : 'set' }}
          <v-icon right small>mdi-pencil</v-icon>
        </template>
        <template v-else>hide</template>
      </v-btn>
    </v-row>
    <v-expand-transition>
      <validation-observer ref="observer">
        <validation-provider name="name" v-slot="{ errors }" rules="required">
          <v-text-field
            v-model="profile.name"
            v-show="nameFieldStatus"
            ref="nameField"
            :error-messages="errors"
            autofocus
            outlined
          />
        </validation-provider>
      </validation-observer>
    </v-expand-transition>
    <v-row no-gutters align="center">
      <v-subheader class="pa-0"> Email Address </v-subheader>
      <v-spacer />
      {{ email }}
    </v-row>
    <v-row no-gutters align="center">
      <v-subheader class="pa-0"> Avatar </v-subheader>
      <v-spacer />
      <v-btn class="mr-2" text small color="primary" @click="callfileInput">
        set avatar
        <v-icon right small>mdi-camera</v-icon>
      </v-btn>
      <input
        type="file"
        ref="upload_avatar"
        accept="image/*"
        @change="uploadAvatar"
        hidden
      />
      <v-avatar size="42">
        <img :src="profile.avatar" :alt="profile.name" />
      </v-avatar>
    </v-row>
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

export default {
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      profile: {
        name: '',
        avatar: '',
      },
      nameFieldStatus: false,
      changedData: false,
    }
  },
  computed: {
    email() {
      return this.$auth.user.email
    },
  },
  methods: {
    callfileInput() {
      this.$refs.upload_avatar.click()
    },
    async uploadAvatar(event) {
      this.changedData = true
      const image = event.target.files[0]
      let formData = new FormData()
      formData.append('avatar', image)
      const { url } = await this.$axios.$post('/upload/avatar', formData)
      this.profile.avatar = url
    },
    async setProfileData() {
      const isValid = this.$refs.observer.validate()
      if (isValid && this.changedData) {
        try {
          await this.$axios.$put('/user/edit', this.profile)
        } catch (err) {
          // handel error
        }
      }
    },
  },
  created() {
    this.profile.name = this.$auth.user.name
    this.profile.avatar = this.$auth.user.avatar
    this.$root.$on('accountProfile', () => {
      this.setProfileData()
    })
  },
}
</script>
