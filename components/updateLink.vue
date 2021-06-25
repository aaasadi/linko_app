<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="url"
      outlined
      label="URL Address"
      hide-details="auto"
    >
      <template v-slot:append>
        <v-btn
          color="primary"
          text
          small
          :style="{ marginTop: '-2px' }"
          type="submit"
        >
          update
        </v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
export default {
  props: ['url', 'slug'],
  methods: {
    async submit() {
      const { url, slug } = this
      await this.$axios.$put('/links', { url, slug })
    },
  },
}
</script>
