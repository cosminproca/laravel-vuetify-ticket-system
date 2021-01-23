<template>
  <v-row justify="center" align="center">
    <v-col md="8" sm="12">
      <v-card v-if="!loading" class="pa-2">
        <v-card-title> Your Tickets </v-card-title>
        <v-card-subtitle>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          />
        </v-card-subtitle>
        <v-data-table :items="tickets" :headers="headers" :search="search">
          <template #item.status="{ item }">
            <span :class="statusColor(item.status)">{{ item.status }}</span>
          </template>
          <template #item.actions="{ item }">
            <v-btn
              :to="{
                name: 'admin.tickets.view',
                params: { id: item.id }
              }"
              :aria-label="`View Ticket ${item.id}`"
            >
              View Ticket
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
      <v-skeleton-loader v-else type="table" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { statusColor } from '@/utils/statusColor';

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
          text: 'Updated At',
          value: 'updated_at'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters('admin/tickets', {
      tickets: 'dataArray'
    })
  },
  async mounted() {
    await this.fetchTickets();
    this.loading = false;
  },
  methods: {
    ...mapActions('admin/tickets', {
      fetchTickets: 'index'
    }),
    statusColor
  }
};
</script>

<style scoped></style>
