<template>
  <v-list v-show="status && show" class="listGroup">
    <v-subheader>Select one of the Groups</v-subheader>
    <v-list-item-group>
      <v-list-item
        v-for="(group, index) in items.filter(
          (group) => group.indexOf(value) != -1
        )"
        :key="index"
        @click="setGroupHandler(group)"
      >
        <v-list-item-content>
          <v-list-item-title v-text="group"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-icon left>mdi-plus</v-icon>
        Add new sub link
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: ['status', 'items', 'value', 'setGroupHandler'],
  data() {
    return {
      show: false,
    }
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
