<template>
  <v-flex>
    <v-subheader>Add new Group</v-subheader>
    <v-form @submit.prevent="submit">
      <v-text-field v-model="data.name" label="Name Group" outlined>
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
          <v-row no-gutters align="center">
            <v-subheader>links</v-subheader>
            <v-spacer />
            <v-btn text small color="error">
              <v-icon left>mdi-delete</v-icon>
              delete</v-btn
            >
          </v-row>
          <ul v-for="link in group.links" :key="link.slug">
            <li class="pa-2">{{ link.slug.split('/')[1] }}</li>
          </ul>
          <v-row no-gutters class="mt-4" justify="space-between">
            <span
              ><v-icon left>mdi-link</v-icon
              >{{ group.links.length }} links</span
            >
            <span><v-icon left>mdi-eye</v-icon>632 views</span>
            <span><v-icon left>mdi-account-multiple</v-icon>205 users</span>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-flex>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
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
    showForm() {
      this.status = !this.status
    },
    submit() {
      this.addGroup(this.data)
      this.data.name = ''
    },
    ...mapActions({
      addGroup: 'groups/addGroup',
    }),
  },
}
</script>
