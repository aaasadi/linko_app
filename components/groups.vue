<template>
  <v-tabs value="selected" class="mb-3" show-arrows>
    <v-tab
      grow
      v-for="item in sorted"
      :key="item.name"
      @click.native="selectGroupByName(item.name)"
      >{{ item.name }}</v-tab
    >
  </v-tabs>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    items() {
      return [
        ...this.list.map((item) => ({
          name: item.name,
          links: item.links.length,
        })),
      ]
    },
    allLinksNumber() {
      return this.items.reduce((total, item) => total + item.links, 0)
    },
    sorted() {
      return [
        { name: 'all', links: this.allLinksNumber },
        ...this.items.sort((a, b) => b.links - a.links),
      ]
    },
    ...mapState({
      list: (state) => state.groups.list,
      selected: (state) => state.groups.selected,
    }),
  },
  methods: {
    selectGroupByName(name) {
      this.selectGroup(name)
    },
    ...mapMutations({
      selectGroup: 'groups/selectGroup',
    }),
  },
}
</script>
