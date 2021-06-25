<template>
  <v-card class="mx-auto">
    <v-card-text class="pb-2">
      <v-row no-gutters>
        <div>
          <h4 class="title">{{ title }}</h4>
          <a
            :href="'http://localhost:8000/redirect/' + link.slug"
            ref="link"
            class="link"
            ><span class="address">https://linko.ir/</span>{{ link.slug }}</a
          >
        </div>
        <v-spacer />
        <v-tooltip v-model="showCopied" top>
          <template v-slot:activator="{ attrs }">
            <v-btn icon ripple @click="copy" v-bind="attrs">
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </template>
          <span>Copied!</span>
        </v-tooltip>
      </v-row>
    </v-card-text>
    <v-card-actions class="pa-4 pt-0">
      <v-row no-gutters align="center">
        <span><v-icon left>mdi-eye</v-icon>{{ link.views }} views</span>
        <v-spacer />
        <v-btn text small color="primary" :to="link.slug">
          More
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['link'],
  data() {
    return {
      showCopied: false,
    }
  },
  computed: {
    title() {
      const title = this.link.slug.split('/')[1]
      return title.charAt(0).toUpperCase() + title.slice(1)
    },
  },
  methods: {
    async copy() {
      this.showCopied = true
      setTimeout(() => (this.showCopied = false), 600)
      await navigator.clipboard.writeText(this.link.link)
    },
  },
}
</script>

<style scoped>
.title {
  font-weight: 300;
  font-size: 2em !important;
  margin-bottom: 0.5rem;
}
.link {
  color: #333;
  text-decoration: none;
}
.link .address {
  color: #aaa;
}
</style>
