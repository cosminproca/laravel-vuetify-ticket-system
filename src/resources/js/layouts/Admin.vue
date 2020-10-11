<template>
  <div>
    <v-system-bar app>
      <v-spacer />
    </v-system-bar>

    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>Ticket System</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" clipped app>
      <v-sheet class="pa-4 d-flex justify-space-between align-center">
        <v-avatar class="grey" size="64" />
        <span class="font-weight-light">john@vuetifyjs.com</span>
      </v-sheet>

      <v-divider />

      <v-list class="pa-0">
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-6 px-6" fluid>
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
      links: [
        ['mdi-inbox-arrow-down', 'Inbox'],
        ['mdi-send', 'Send'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
        ['mdi-logout', 'Logout']
      ]
    };
  }
};
</script>

<style scoped></style>
