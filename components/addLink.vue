<template>
  <v-form @submit.prevent="submit" class="mb-5">
    <!-- SHOW LINK AFTER SET -->
    <v-subheader>Create new Link</v-subheader>
    <show-link
      v-if="status === 'GET_URL'"
      :link="getSlug"
      :editHandler="editLink"
    />
    <!-- INPUT SET GROUP, LINK AND URL -->
    <v-text-field
      ref="creator"
      @input="setInput"
      @focus="showGroupsList(true)"
      :value="input"
      :error-messages="errors"
      :placeholder="placeholder"
      :prefix="prefix"
      hide-details="auto"
      color="primary"
      outlined
    >
      <!-- SUBMIT BUTTON -->
      <template v-slot:append>
        <v-btn
          small
          color="primary"
          type="submit"
          text
          :style="{ marginTop: '-2px' }"
        >
          {{ textSubmitButton }}
        </v-btn>
      </template>
    </v-text-field>
    <!-- LIST OF GROUPS OF USER -->
    <list-group
      :status="status === 'GET_GROUP'"
      :value="input"
      :setGroupHandler="setGroup"
    />
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ShowLink from './addLink_showLink.vue'
import ListGroup from './addLink_listGroup.vue'
export default {
  components: { ShowLink, ListGroup },
  data() {
    return {
      input: '', // text of input
      errors: [], // error validation
      status: 'GET_GROUP', // status input | option: GET_GROUP, GET_LINK or GET_URL
      data: {
        group: '', // example: social
        link: '', // example: instagram
        url: '', // example: https://www.instagram.com/linko
      },
    }
  },
  computed: {
    // set placeholder input
    placeholder() {
      return this.status === 'GET_URL'
        ? 'https://www.example.com'
        : 'Group/Link'
    },
    // set prefix input
    prefix() {
      return this.status === 'GET_URL' ? 'Your URL' : 'https://linko.io/'
    },
    // set text submit button
    textSubmitButton() {
      return this.status === 'GET_URL' ? 'create' : 'check'
    },
    // set slug. example: /group/link
    getSlug() {
      return `${this.data.group}/${this.data.link}`
    },
    ...mapState({
      items: (state) => state.groups.list.map((item) => item.name),
    }),
  },
  methods: {
    // open/close the group list
    showGroupsList(status) {
      this.$root.$emit('groupList', status)
    },
    // set status GET_GROUP, GET_LINK or GET_URL
    setStatus() {
      const { status, input } = this
      if (status !== 'GET_URL') {
        if (input.indexOf('/') > -1) {
          this.status = 'GET_LINK'
        } else {
          this.status = 'GET_GROUP'
        }
      }
    },
    // set group, link and url
    setData(value) {
      const { status, data } = this
      switch (status) {
        case 'GET_URL':
          data.url = value
          break
        case 'GET_LINK':
          data.link = value.split('/')[1]
          break
        case 'GET_GROUP':
          data.group = value
          break
      }
    },
    // set text of input
    setInput(value) {
      this.showGroupsList(value.length > 0)
      this.input = value = value.toLowerCase()
      this.setStatus()
      this.setData(value)
      this.validation()
    },
    // set group by list
    setGroup(group) {
      this.data.group = group
      this.input = `${group}/`
      this.status = 'GET_LINK'
      this.$refs.creator.focus()
      this.validation()
    },
    // edit group and link
    editLink() {
      this.errors = []
      this.status = 'GET_LINK'
      this.input = this.getSlug
      this.$refs.creator.focus()
    },
    // validation data
    validation(option = { submit: false }) {
      const { input, items, data, status } = this
      const { submit } = option
      this.errors = []
      if (items.indexOf(data.group) === -1 && input !== data.group) {
        this.errors.push('The group has not been registered')
      }
      if (input.split('/').length > 2 && status === 'GET_LINK') {
        this.errors.push('The link entered is incorrect')
      }
      if (!data.link && submit) {
        this.errors.push('The link entered is incorrect')
      }
      if (!data.url && submit && status === 'GET_URL') {
        this.errors.push('The URL address could not be empty')
      }
      return this.errors.length === 0
    },
    // check group and link by API
    async checkLink() {
      const link = this.getSlug
      try {
        const result = await this.$axios.$post('/links/check', { link })
        if (result) {
          this.status = 'GET_URL'
          this.input = ''
        } else {
          this.errors.push('The link is already registered')
        }
      } catch (error) {
        this.errors.push('Server Error')
      }
    },
    // create link function
    async createLink() {
      try {
        await this.addLink(this.data)
        this.input = ''
        this.status = 'GET_GROUP'
      } catch (error) {
        this.errors.push('The address entered is incorrect')
      }
    },
    // submit input function
    async submit() {
      const { status } = this
      if (this.validation({ submit: true })) {
        switch (status) {
          case 'GET_LINK':
            await this.checkLink()
            break
          case 'GET_URL':
            await this.createLink()
            break
        }
      }
    },
    ...mapActions({
      addLink: 'links/createLink',
    }),
  },
}
</script>
