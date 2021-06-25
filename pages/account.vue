<template>
  <v-flex>
    <v-form @submit.prevent="submit">
      <v-subheader>Account Info</v-subheader>
      <v-expansion-panels v-model="selected">
        <v-expansion-panel>
          <v-expansion-panel-header> Profile </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters align="center">
              <v-subheader class="pa-0"> Fullname </v-subheader>
              <v-spacer />
              {{ data.name }}
              <v-btn
                class="ml-2"
                text
                small
                color="primary"
                @click="editName = !editName"
              >
                {{ data.name ? 'edit' : 'set' }}
                <v-icon right small>mdi-pencil</v-icon>
              </v-btn>
            </v-row>
            <v-text-field
              v-model="data.name"
              outlined
              v-show="editName"
              @blur="editName = false"
            >
            </v-text-field>
            <v-row no-gutters align="center">
              <v-subheader class="pa-0"> Email Address </v-subheader>
              <v-spacer />
              {{ this.email }}
            </v-row>
            <v-row no-gutters align="center">
              <v-subheader class="pa-0"> Avatar </v-subheader>
              <v-spacer />
              <v-btn class="ml-2" text small color="primary">
                set avatar
                <v-icon right small>mdi-camera</v-icon>
              </v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> Security </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters align="center" class="py-3">
              <v-subheader class="pa-0"> Password </v-subheader>
              <v-spacer />
              <v-btn color="primary" text small>
                change password
                <v-icon right small>mdi-key</v-icon>
              </v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> Translate </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
              label="Language"
              :items="language_item"
              v-model="data.language"
              return-object
              outlined
            ></v-select>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> Theme </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters align="center">
              <v-subheader class="pa-0"> Dark mode </v-subheader>
              <v-spacer />
              <v-switch v-model="dark_mode" @change="setDarkMode"></v-switch>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> Advance </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters align="center">
              <v-subheader class="pa-0"> Reset Settings </v-subheader>
              <v-spacer />
              <v-btn color="primary" text small>reset</v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row no-gutters align="center" class="mt-5">
        <v-btn>cancle</v-btn>
        <v-spacer />
        <v-btn color="primary" type="submit">save change</v-btn>
      </v-row>
    </v-form>
  </v-flex>
</template>

<script>
export default {
  head: {
    title: 'Account page',
  },
  data() {
    return {
      dark_mode: true,
      data: {
        name: '',
        language: { text: 'English', value: 'en' },
      },
      language_item: [
        { text: 'English', value: 'en' },
        { text: 'Persian', value: 'pr' },
      ],
      editName: false,
      selected: 0,
    }
  },
  computed: {
    email() {
      return this.$auth.user.email
    },
  },
  methods: {
    setDarkMode() {
      localStorage.setItem('dark_mode', this.dark_mode)
      this.$vuetify.theme.isDark = this.dark_mode
    },
    submit() {},
  },
  created() {
    this.dark_mode = eval(localStorage.getItem('dark_mode'))
  },
}
</script>
