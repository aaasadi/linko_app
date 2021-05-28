<template>
  <v-tabs class="mb-3">
    <v-tab v-for="domain in domains" :key="domain">{{ domain }}</v-tab>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      domains: [],
    }
  },
  async fetch() {
    const result = await this.$axios.$get('domains')
    this.domains = ['all', ...result.map((domain) => domain.name)]
  },
}
</script>
