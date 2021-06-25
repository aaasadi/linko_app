<template>
  <v-snackbar v-model="visible" :timeout="timeout" text right top color="error">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="red" icon v-bind="attrs" @click="visible = false">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    timeout: 3000,
    visible: false,
    text: 'error',
  }),
  methods: {
    setText(text) {
      this.text = text
      this.visible = true
    },
  },
  created() {
    this.$root.$on('snackbar', this.setText)
  },
}
</script>
