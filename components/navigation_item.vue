<template>
  <v-list-item @click="goToPage(to)" :class="acrive ? 'active' : 'item'">
    <v-list-item-icon>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: ['title', 'icon', 'to'],
  computed: {
    acrive() {
      return this.$route.path === this.to
    },
  },
  methods: {
    goToPage(path) {
      this.$root.$emit('handleNavigation', false)
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
.item {
  opacity: 0.5;
}
.active {
  opacity: 1;
}
</style>
