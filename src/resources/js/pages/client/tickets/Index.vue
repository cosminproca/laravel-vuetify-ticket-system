<template>
  <v-row justify="center" align="center">
    <v-col cols="4">
      <v-card v-if="!loading" class="pa-2">
        <v-card-title> View Your Tickets </v-card-title>
        <v-card-subtitle>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          />
        </v-card-subtitle>
        <v-data-table :items="tickets" :headers="headers" :search="search" />
      </v-card>
      <v-skeleton-loader v-else type="table" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Index',
  data() {
    return {
      loading: true,
      search: '',
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Category',
          value: 'category.name'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Created At',
          value: 'created_at'
        },
        {
          text: 'Update At',
          value: 'updated_at'
        }
      ]
    };
  },
  computed: {
    ...mapGetters('tickets', {
      tickets: 'dataArray'
    }),
    ...mapState('auth', {
      user: 'user'
    })
  },
  async mounted() {
    await this.fetchTickets();
    this.loading = false;
  },
  methods: {
    ...mapActions('tickets', {
      fetchTickets: 'index'
    })
  }
};
</script>

<style scoped></style>
