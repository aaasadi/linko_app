<template>
  <v-app>
    <Header />
    <div v-if="navStatus && $vuetify.breakpoint.mdAndDown" class="nav">
      <Navigation class="nav" />
    </div>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" lg="4" v-if="$vuetify.breakpoint.lgAndUp">
            <Navigation />
          </v-col>
          <v-col cols="12" lg="8">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '~/components/header.vue'
import Navigation from '~/components/navigation.vue'
import Footer from '~/components/footer.vue'
export default {
  components: { Header, Navigation, Footer },
  data() {
    return {
      navStatus: false,
    }
  },
  methods: {
    toggleNavigation() {
      this.navStatus = !this.navStatus
    },
    handleNavigation(status) {
      this.navStatus = status
    },
    ...mapActions({
      fetchGroupsData: 'groups/getGroups',
      fetchLinksData: 'links/fetchData',
    }),
  },
  created() {
    this.$root.$on('toggleNavigation', this.toggleNavigation)
    this.$root.$on('handleNavigation', this.handleNavigation)
  },
  async fetch() {
    this.fetchGroupsData()
    this.fetchLinksData()
  },
}
</script>

<style scoped>
.nav {
  position: fixed;
  z-index: 8;
  top: 56px;
  right: 10px;
  left: 10px;
}
</style>
