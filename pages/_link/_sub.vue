<template>
  <p>
    redirect to: <a :href="data.url">{{ data.url }}</a>
  </p>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    }
  },
  async fetch() {
    try {
      const slug = `${this.$route.params.link}/${this.$route.params.sub}`
      this.data = await this.$axios.$post('/links/slug', { slug })
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
