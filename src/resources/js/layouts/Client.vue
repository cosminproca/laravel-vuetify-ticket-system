<template>
  <v-app>
    <v-system-bar app>
      <v-spacer />
    </v-system-bar>

    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>Client Ticket System</v-toolbar-title>

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
          <v-avatar class="grey" size="64">
            <span class="font-weight-bold">J.V</span>
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

        <v-list-item :to="{ name: 'client.tickets.create' }" link exact>
          <v-list-item-icon>
            <v-icon>mdi-exclamation</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Create Ticket</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'client.tickets.index' }" link exact>
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>View Tickets</v-list-item-title>
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
