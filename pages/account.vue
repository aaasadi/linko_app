<template>
  <v-flex>
    <v-form>
      <v-subheader>Account Info</v-subheader>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header> Profile </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field label="Email Address" outlined />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> Change Password </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field label="Password" outlined />
            <v-text-field label="Confirm Password" outlined />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row no-gutters align="center" class="mt-5">
        <v-btn>cancle</v-btn>
        <v-spacer />
        <v-btn color="primary">save change</v-btn>
      </v-row>
    </v-form>
  </v-flex>
</template>
