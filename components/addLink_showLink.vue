<template>
  <v-row no-gutters align="center" class="mb-2">
    <span>
      <b>link:</b>
      <span :style="{ color: '#999' }"> https://linko.io/ </span>
      {{ link }}
    </span>
    <v-spacer />
    <v-btn text small @click="editHandler()">edit</v-btn>
  </v-row>
</template>

<script>
export default {
  props: ['link', 'editHandler'],
}
</script>
