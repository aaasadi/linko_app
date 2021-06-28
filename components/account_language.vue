<template>
  <div>
    <v-select
      label="Language"
      :items="language_item"
      v-model="language"
      return-object
      hide-details="auto"
      @change="setLanguage"
      outlined
    ></v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      language: { text: 'English', value: 'en' },
      language_item: [
        { text: 'English', value: 'en' },
        { text: 'Persian', value: 'pr' },
      ],
    }
  },
  methods: {
    setLanguage() {
      localStorage.setItem('language', this.language.value)
      this.$i18n.setLocale(this.language.value)
    },
  },
  created() {
    // if (eval(localStorage.getItem('language'))) {
    //   this.language = eval(localStorage.getItem('language'))
    //   this.$i18n.setLocale(this.language.value)
    // }
  },
}
</script>
