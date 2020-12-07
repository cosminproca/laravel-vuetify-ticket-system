<template>
  <v-app>
    <v-system-bar app>
      <v-spacer />
    </v-system-bar>

    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon
        aria-label="Menu Burger"
        @click.stop="drawer = !drawer"
      />

      <v-btn class="mx-5" text aria-label="Back Button" @click="$router.back()">
        <v-icon> mdi-keyboard-backspace </v-icon>
      </v-btn>

      <v-toolbar-title>Client Ticket System</v-toolbar-title>

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
        color="grey"
      />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" clipped app>
      <v-sheet class="pa-4">
        <div class="d-flex align-center mb-4">
          <v-avatar style="background: #363636" size="64">
            <span>J.V</span>
          </v-avatar>

          <div class="text-center font-weight-medium ml-10">
            {{ userRole.name }}
          </div>
        </div>

        <div v-if="user" class="font-weight-light">
          {{ user.email }}
        </div>
      </v-sheet>

      <v-divider />

      <v-list class="pa-0">
        <v-list-item :to="{ name: 'client' }" link exact>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'client.faq_articles.index' }" link exact>
          <v-list-item-icon>
            <v-icon>mdi-exclamation</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>See FAQ Articles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'client.tickets.create' }" link exact>
          <v-list-item-icon>
            <v-icon>mdi-ticket-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Create Ticket</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'client.tickets.index' }" link exact>
          <v-list-item-icon>
            <v-icon>mdi-table</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Your Tickets</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logoutUser">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="px-6"
        fill-height
        :class="{ 'py-2': drawer, 'py-4': !drawer }"
        fluid
      >
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Client',
  data() {
    return {
      drawer: true,
      loading: true
    };
  },
  computed: {
    ...mapGetters('auth', {
      isLogged: 'isLogged',
      userRole: 'userRole'
    }),
    ...mapState('auth', {
      user: 'user'
    })
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    ...mapActions('auth', {
      logout: 'logout'
    }),
    async logoutUser() {
      await this.logout();

      await this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped></style>
