<template>
  <v-app>
    <component :is="layout" v-if="$route.meta.layout">
      <router-view />
    </component>
    <v-progress-circular
      v-else
      class="center-spinner"
      size="75"
      absolute
      active
      indeterminate
      bottom
      color="grey"
    />
  </v-app>
</template>

<script>
export default {
  metaInfo: {
    description: 'Laravel Ticket System with Vue JS, Vuetify and Docker'
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    }
  }
};
</script>

<style lang="scss">
.center-spinner {
  top: 45%;
  left: 50%;
}
</style>
