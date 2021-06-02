<template>
  <v-row>
    <v-col cols="12" lg="8">
      <Header />
      <Creator class="creator" />
      <h4 class="mb-3">Your links</h4>
      <Domains />
      <v-row justify="center">
        <v-col cols="12" md="6" v-for="(link, index) in links" :key="index">
          <LinkItem :link="link" />
        </v-col>
        <v-btn color="primary" text>show more</v-btn>
      </v-row>
    </v-col>
    <v-col cols="12" lg="4"> show views </v-col>
  </v-row>
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

<style scoped>
.creator {
  margin: 50px 0 100px 0;
}
</style>
