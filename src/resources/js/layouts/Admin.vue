<template>
  <div>
    <v-system-bar app>
      <v-spacer />
    </v-system-bar>

    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>Ticket System</v-toolbar-title>

      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        bottom
        absolute
        color="grey"
      />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" clipped app>
      <v-sheet class="pa-4 d-flex justify-space-between align-center">
        <v-avatar class="grey" size="64">
          <span class="font-weight-bold">J.V</span>
        </v-avatar>
        <div class="d-flex flex-column">
          <span class="text-center font-weight-medium">Super Admin</span>
          <span class="font-weight-light">john@vuetifyjs.com</span>
        </div>
      </v-sheet>

      <v-divider />

      <v-list class="pa-0">
        <v-list-item
          v-for="[icon, route, text] in links"
          :key="icon"
          :to="{ path: route }"
          link
        >
          <v-list-item-icon>
            <v-icon>
              {{ icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="px-6"
        :class="{ 'py-2': drawer, 'py-4': !drawer }"
        fluid
      >
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      cards: ['Today', 'Yesterday'],
      drawer: true,
      loading: true,
      links: [
        ['mdi-home', '/', 'Home'],
        ['mdi-account', '/register', 'Register'],
        ['mdi-login', '/login', 'Login'],
        ['mdi-logout', '/logout', 'Logout']
      ]
    };
  },
  mounted() {
    this.loading = false;
  }
};
</script>

<style scoped></style>
