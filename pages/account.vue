<template>
  <v-flex>
    <v-breadcrumbs :items="items" />
    <v-subheader>Account Info</v-subheader>
    <v-form>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header> Profile </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              :value="email"
              label="Email Address"
              outlined
              disabled
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> Change Password </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="password"
              label="Password"
              :append-icon="show_password ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show_password ? 'text' : 'password'"
              @click:append="show_password = !show_password"
              outlined
            />
            <v-text-field
              label="Confirm Password"
              :type="show_password ? 'text' : 'password'"
              outlined
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row no-gutters align="center" class="mt-5">
        <v-btn>cancle</v-btn>
        <v-spacer />
        <v-btn color="primary">save change</v-btn>
      </v-row>
    </v-form>
  </v-flex>
</template>

<script>
export default {
  head: {
    title: 'Account page',
  },
  data() {
    return {
      password: '',
      confirm_password: '',
      show_password: false,
      show_confirm_password: false,
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/',
        },
        {
          text: 'Account settings',
          disabled: true,
          to: '/',
        },
      ],
    }
  },
  computed: {
    email() {
      return this.$auth.user.email
    },
  },
}
</script>
