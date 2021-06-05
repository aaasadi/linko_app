<template>
  <v-list v-show="status && show" class="listGroup">
    <v-row class="mr-4" no-gutters align="center">
      <v-subheader>Select one of the Groups</v-subheader>
      <v-spacer />
      <v-btn icon small @click="closeList"><v-icon>mdi-close</v-icon></v-btn>
    </v-row>
    <v-list-item-group>
      <v-list-item
        v-for="(group, index) in filterItems"
        :key="index"
        @click="setGroupHandler(group)"
      >
        <v-list-item-content>
          <v-list-item-title v-text="group"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['status', 'value', 'setGroupHandler'],
  data() {
    return {
      show: false,
    }
  },
  computed: {
    filterItems() {
      return this.items.filter((group) => group.indexOf(this.value) != -1)
    },
    ...mapState({
      items: (state) => state.groups.list.map((item) => item.name),
    }),
  },
  methods: {
    closeList() {
      this.$root.$emit('groupList', false)
    },
  },
  mounted() {
    this.$root.$on('groupList', (status) => (this.show = status))
  },
}
</script>

<style scoped>
.listGroup {
  margin-top: 1rem;
  background-color: #f7f7f7;
}
</style>
