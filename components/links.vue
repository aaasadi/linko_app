<template>
  <v-row>
    <v-col cols="12" v-if="!linksFilter[selected]" class="notFound">
      <v-subheader>Empty!</v-subheader>
    </v-col>
    <v-col
      cols="12"
      md="6"
      v-for="(link, index) in linksFilter[selected]"
      :key="index"
    >
      <LinkItem :link="link" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import LinkItem from '~/components/linkItem.vue'
export default {
  components: { LinkItem },
  computed: {
    linksFilter() {
      return this.links.reduce(
        (total, item) => {
          const { link, url, slug, group, views } = item
          if (!total[group.name]) total[group.name] = []
          total['all'].push({ link, url, slug, views })
          total[group.name].push({ link, url, slug, views })
          return total
        },
        { all: [] }
      )
    },
    ...mapState({
      links: (state) => state.links.list,
      selected: (state) => state.groups.selected,
    }),
  },
}
</script>

<style scoped>
.notFound {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
