<template>
  <div>
    <v-row no-gutters align="center">
      <v-subheader class="pa-0"> Dark mode </v-subheader>
      <v-spacer />
      <v-switch v-model="dark_mode" @change="setDarkMode"></v-switch>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dark_mode: false,
    }
  },
  methods: {
    setDarkMode() {
      localStorage.setItem('dark_mode', this.dark_mode)
      this.$vuetify.theme.isDark = this.dark_mode
    },
  },
  created() {
    this.dark_mode = eval(localStorage.getItem('dark_mode'))
    this.$vuetify.theme.isDark = this.dark_mode
  },
}
</script>
