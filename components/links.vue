<template>
  <v-row justify="center">
    <v-col cols="12" md="6" v-for="(link, index) in links" :key="index">
      <LinkItem :link="link" />
    </v-col>
    <v-btn color="primary" text>show more</v-btn>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import LinkItem from '~/components/linkItem.vue'
export default {
  components: { LinkItem },
  computed: {
    ...mapState({
      links: (state) => state.links.list,
    }),
  },
}
</script>
