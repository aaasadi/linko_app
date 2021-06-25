<template>
  <v-flex>
    <v-subheader>Add new Group</v-subheader>
    <v-form @submit.prevent="submit">
      <v-text-field v-model="data.name" label="Group Name" outlined>
        <template v-slot:append>
          <v-btn
            small
            color="primary"
            type="submit"
            text
            :style="{ marginTop: '-2px' }"
          >
            Add
          </v-btn>
        </template>
      </v-text-field>
    </v-form>
    <v-subheader>Your Groups</v-subheader>
    <v-expansion-panels>
      <v-expansion-panel v-for="group in groups" :key="group.name">
        <v-expansion-panel-header> {{ group.name }} </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="link in group.links"
                :to="`/${link.slug}`"
                :key="link.slug"
              >
                <v-list-item-icon>
                  <v-icon>mdi-link</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{
                    link.slug.split('/')[1]
                  }}</v-list-item-title>
                </v-list-item-content>
                <span>{{ link.views }} views</span>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-row no-gutters class="mt-4" align="center">
            <span class="mr-3">{{ group.links.length }} links</span>
            <span>{{ totalView(group) }} views</span>
            <v-spacer />
            <v-btn text small color="error" @click="deleteGroup(group.name)">
              <v-icon left>mdi-delete</v-icon>
              delete group</v-btn
            >
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-flex>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  head: {
    title: 'Groups page',
  },
  data() {
    return {
      data: {
        name: '',
      },
    }
  },
  computed: {
    ...mapState({
      groups: (state) => state.groups.list,
    }),
  },
  methods: {
    totalView(group) {
      return group.links.reduce((total, link) => total + link.views, 0)
    },
    showForm() {
      this.status = !this.status
    },
    // deleteGroup(name) {
    //   console.log(name)
    //   // this.delete(group)
    // },
    submit() {
      this.addGroup(this.data)
      this.data.name = ''
    },
    ...mapActions({
      addGroup: 'groups/addGroup',
      deleteGroup: 'groups/deleteGroup',
      fetchGroupsData: 'groups/getGroups',
    }),
  },
  async fetch() {
    await this.fetchGroupsData()
  },
}
</script>
