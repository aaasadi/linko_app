<template>
  <v-tabs value="selected" @change="selectGroup" class="mb-3">
    <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
  </v-tabs>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    items() {
      return ['all', ...this.list.map((item) => item.name)]
    },
    ...mapState({
      list: (state) => state.groups.list,
      selected: (state) => state.groups.selected,
    }),
  },
  methods: {
    ...mapMutations({
      selectGroup: 'groups/selectGroup',
    }),
  },
}
</script>
