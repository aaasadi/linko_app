<template>
  <v-flex class="addGroup">
    <v-row no-gutters align="center">
      <v-subheader>Your Links</v-subheader>
      <v-spacer />
      <v-btn text small color="primary" @click="showForm">{{
        textButton
      }}</v-btn>
    </v-row>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-show="status"
        v-model="data.name"
        label="Name Group"
        outlined
      >
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
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      status: false, // open or close
      data: {
        name: '',
      },
    }
  },
  computed: {
    textButton() {
      return this.status ? 'Hide' : 'Create Group'
    },
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

<style scoped>
.addGroup {
  flex-direction: column;
}
</style>
