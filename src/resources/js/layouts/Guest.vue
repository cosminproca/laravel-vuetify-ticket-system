<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Ticket System</v-toolbar-title>

      <v-spacer />

      <v-btn
        text
        aria-label="Theme Button"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon> mdi-theme-light-dark </v-icon>
      </v-btn>

      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        bottom
        absolute
        color="blue"
      />
    </v-app-bar>

    <v-main>
      <v-container fill-height fluid class="d-flex justify-center align-center">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Guest',
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    this.loading = false;
  }
};
</script>

<style scoped></style>
