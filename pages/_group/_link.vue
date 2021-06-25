<template>
  <v-flex>
    <v-breadcrumbs :items="items" />
    <update-link :url="link.url" :slug="link.slug" />
    <v-subheader>Link data</v-subheader>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Key</th>
            <th class="text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>{{ title }}</td>
          </tr>
          <tr>
            <td>link</td>
            <td>{{ link.link }}</td>
          </tr>
          <tr>
            <td>URL</td>
            <td>{{ link.url }}</td>
          </tr>
          <tr>
            <td>views</td>
            <td>{{ link.views }}</td>
          </tr>
          <tr>
            <td>craeted at</td>
            <td>{{ link.created_at }}</td>
          </tr>
          <tr>
            <td>update at</td>
            <td>{{ link.updated_at }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-flex>
</template>

<script>
import updateLink from '~/components/updateLink.vue'
export default {
  components: { updateLink },
  head() {
    return {
      title: this.title,
    }
  },
  data() {
    return {
      link: {},
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/',
        },
        {
          text: 'Link',
          disabled: true,
          to: '/',
        },
      ],
    }
  },
  computed: {
    title() {
      if (this.link.slug) {
        return this.link.slug.split('/')[1]
      }
    },
    slug() {
      const { group, link } = this.$route.params
      return group + '/' + link
    },
  },
  async fetch() {
    const { slug } = this
    try {
      const { data } = await this.$axios.post('/links/slug', { slug })
      this.link = data
    } catch (err) {
      // handle error
    }
  },
}
</script>
