<template>
  <v-flex>
    <v-row no-gutters align="center">
      Settings
      <v-spacer />
      <v-btn color="primary" small @click="submit">
        save changes
        <v-icon small right>mdi-content-save</v-icon>
      </v-btn>
    </v-row>
    <v-subheader>Profile</v-subheader>
    <v-sheet elevation="3" rounded="lg" class="pa-4">
      <Profile />
    </v-sheet>
    <v-subheader>Security</v-subheader>
    <v-sheet elevation="3" rounded="lg" class="pa-4">
      <Security />
    </v-sheet>
    <v-subheader>Translate</v-subheader>
    <v-sheet elevation="3" rounded="lg" class="pa-4">
      <Language />
    </v-sheet>
    <v-subheader>Theme</v-subheader>
    <v-sheet elevation="3" rounded="lg" class="pa-4">
      <Theme />
    </v-sheet>
    <v-row no-gutters align="center" class="mt-5">
      <v-btn small>cancle</v-btn>
      <v-spacer />
      <v-btn color="primary" small @click="submit">
        save changes
        <v-icon small right>mdi-content-save</v-icon>
      </v-btn>
    </v-row>
  </v-flex>
</template>

<script>
import Profile from '~/components/account_profile.vue'
import Security from '~/components/account_security.vue'
import Language from '~/components/account_language.vue'
import Theme from '~/components/account_theme.vue'
export default {
  components: { Profile, Security, Language, Theme },
  head: {
    title: 'Account page',
  },
  data() {
    return {
      selected: 0,
    }
  },
  methods: {
    editProfile() {
      this.$root.$emit('accountProfile')
    },
    security() {
      this.$root.$emit('accountSecurity')
    },
    submit() {
      this.editProfile()
      this.security()
    },
  },
}
</script>
