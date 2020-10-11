<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      defaultLayout: 'Admin'
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout || this.defaultLayout;
    }
  }
};
</script>
