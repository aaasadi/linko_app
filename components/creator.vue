<template>
  <v-form @submit.prevent="submit" class="form">
    <show-link
      :status="status === 'GET_URL'"
      :link="getSlug"
      :editHandler="editLink"
    />
    <v-text-field
      :value="input"
      @input="setInput"
      ref="creator"
      :placeholder="placeholder"
      :prefix="prefix"
      hide-details="auto"
      color="primary"
      outlined
      :error-messages="errors"
      @focus="focus = true"
    >
      <template #append>
        <v-btn
          v-on="on"
          small
          color="primary"
          type="submit"
          :style="{ marginTop: '-2px' }"
        >
          {{ textSubmitButton }}
        </v-btn>
      </template>
    </v-text-field>
    <list-group
      v-show="status === 'GET_GROUP' && focus"
      :items="items"
      :value="input"
      :setGroupHandler="setGroup"
    />
  </v-form>
</template>

<script>
import ShowLink from './creator_show_link'
import ListGroup from './creator_list_group'
export default {
  components: { ShowLink, ListGroup },
  data() {
    return {
      input: '',
      errors: [],
      items: [],
      focus: false,
      status: 'GET_GROUP',
      data: {
        group: null,
        link: null,
        url: null,
      },
    }
  },
  computed: {
    placeholder() {
      return this.status === 'GET_URL'
        ? 'https://www.example.com'
        : 'Group/Link'
    },
    prefix() {
      return this.status === 'GET_URL' ? 'URL' : 'https://linko.io/'
    },
    textSubmitButton() {
      return this.status === 'GET_URL' ? 'create' : 'check'
    },
    getSlug() {
      return `${this.data.group}/${this.data.link}`
    },
  },
  methods: {
    setInput(value) {
      this.input = value.toLowerCase()
      if (this.status !== 'GET_URL') {
        if (value.indexOf('/') > -1) {
          this.status = 'GET_LINK'
        } else {
          this.status = 'GET_GROUP'
        }
      }
      switch (this.status) {
        case 'GET_URL':
          this.data.url = value
          break
        case 'GET_LINK':
          this.data.link = value.split('/')[1]
          break
        case 'GET_GROUP':
          this.data.group = value
          break
      }
      this.validation()
    },
    setGroup(group) {
      this.data.group = group
      this.input = `${group}/`
      this.status = 'GET_LINK'
      this.$refs.creator.focus()
    },
    editLink() {
      this.status = 'GET_LINK'
      this.input = this.getSlug
      this.$refs.creator.focus()
    },
    validation(submit = false) {
      this.errors = []
      if (!this.data.group && this.status === 'GET_GROUP' && submit) {
        this.errors.push('group is empty')
      }
      if (
        this.items.indexOf(this.data.group) === -1 &&
        this.status === 'GET_LINK'
      ) {
        this.errors.push('domain is not registerd')
      }
      if (this.input.split('/').length > 2 && this.status === 'GET_LINK') {
        this.errors.push('address is false')
      }
      if (!this.data.link && this.status === 'GET_LINK' && submit) {
        this.errors.push('link is empty')
      }
    },
    async checkLink() {
      const link = this.getSlug
      const result = await this.$axios.$post('/links/check', { link })
      if (result) {
        this.status = 'GET_URL'
        this.input = null
      } else {
        this.errors.push('link is already')
      }
    },
    async createLink() {
      const slug = this.data.link
      const url = this.data.url
      await this.$axios.$post(`/links/${this.data.group}`, { slug, url })
    },
    async submit() {
      this.validation(true)
      if (this.errors.length === 0) {
        switch (this.status) {
          case 'GET_URL':
            await this.createLink()
            this.input = ''
          case 'GET_LINK':
            await this.checkLink()
        }
      }
    },
  },
  async fetch() {
    const result = await this.$axios.$get('/domains')
    this.items = result.map((item) => item.name)
  },
}
</script>

<style scoped>
.form {
  margin: 50px 0 100px 0;
}
.listGroup {
  margin-top: 1rem;
  background-color: #f7f7f7;
}
</style>
