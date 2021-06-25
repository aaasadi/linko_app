<template>
  <v-card color="primary" dark>
    <v-list v-model="selectedItem" color="primary" nav dense>
      <v-subheader>Navigation</v-subheader>
      <v-list-item-group color="white">
        <nav-item
          v-for="item in items"
          :key="item.text"
          :to="item.to"
          :title="item.title"
          :icon="item.icon"
        />
        <a href="http://localhost:8000/help">
          <nav-item title="Help" icon="mdi-help" />
        </a>
        <nav-item @click.native="logout" title="Logout" icon="mdi-power" />
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import NavItem from './navigation_item.vue'

export default {
  components: { NavItem },
  data() {
    return {
      selectedItem: 1,
      items: [
        { title: 'Dashboard', to: '/', icon: 'mdi-view-dashboard' },
        { title: 'Groups', to: '/groups', icon: 'mdi-shape' },
        { title: 'Account', to: '/account', icon: 'mdi-account' },
      ],
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push({ path: '/login' })
    },
  },
}
</script>
