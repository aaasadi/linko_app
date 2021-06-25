<template>
  <v-flex class="container">
    <h1 class="display-3 text-center">Check your email</h1>
    <v-row class="mt-5 flex-grow-0" no-gutters justify="center">
      <p>
        Email could not be sent?
        <a @click="$router.go(-1)" class="link">back</a>
      </p>
    </v-row>
  </v-flex>
</template>

<script>
export default {
  auth: false,
  layout: 'sample',
}
</script>

<style scoped>
.container {
  display: flex;
  width: 95%;
  max-width: 600px;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.link {
  text-decoration: none;
}
</style>
