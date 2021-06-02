<template>
  <v-row>
    <v-col cols="12" lg="8">
      <Header />
      <Creator class="creator" />
      <h4 class="mb-3">Your links</h4>
      <Domains />
      <Links />
    </v-col>
    <v-col cols="12" lg="4"> show views </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

import Header from '~/components/header.vue'
import Creator from '~/components/creator.vue'
import Domains from '~/components/groups.vue'
import Links from '~/components/links.vue'

export default {
  components: { Header, Creator, Domains, Links },
  methods: {
    ...mapActions({
      fetchGroupsData: 'groups/fetchData',
      fetchLinksData: 'links/fetchData',
    }),
  },
  async fetch() {
    this.fetchGroupsData()
    this.fetchLinksData()
  },
}
</script>

<style scoped>
.creator {
  margin: 50px 0 100px 0;
}
</style>
