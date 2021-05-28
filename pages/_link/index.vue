<template>
  <h2>redirect your link</h2>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    }
  },
  computed: {
    link() {
      return this.$route.params.link
    },
  },
  async fetch() {
    try {
      this.data = this.$axios.$post('/links/slug', {
        slug: this.$route.params.link,
      })
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
