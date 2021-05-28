<template>
  <div>
    <Header />
    <Creator />
    <h4 class="mb-3">Your links</h4>
    <Domains />
    <v-row>
      <v-col cols="12" md="6" v-for="(link, index) in links" :key="index">
        <LinkItem :link="link" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Header from '~/components/header.vue'
import Creator from '~/components/creator.vue'
import Domains from '~/components/domains.vue'
import LinkItem from '~/components/linkItem.vue'
export default {
  components: { Header, Creator, Domains, LinkItem },
  data() {
    return {
      links: [],
    }
  },

  async fetch() {
    this.links = await this.$axios.$get('/links')
  },
}
</script>
