<template>
  <v-row justify="center" align="center">
    <v-col md="4" sm="12">
      <v-card v-if="!loading" class="pa-2">
        <v-card-title class="d-flex justify-space-between">
          <span>{{ ticket.title }}</span>
          <span>
            <v-menu offset-y>
              <template #activator="{ on, attrs }">
                <v-btn
                  :color="statusColorNoText(ticket.status)"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ ticket.status }}
                </v-btn>
              </template>
              <v-list class="pa-0">
                <v-list-item
                  v-for="(status, index) in ticketStatusesExceptCurrent(
                    ticket.status
                  )"
                  :key="index"
                >
                  <span :class="statusColor(status)" class="mx-auto">
                    {{ status.toUpperCase() }}
                  </span>
                </v-list-item>
              </v-list>
            </v-menu>
          </span>
        </v-card-title>
        <v-card-subtitle v-show="ticket.category">
          {{ ticket.category.name }}
        </v-card-subtitle>
        <v-card-text>
          <div v-html="ticket.description" />
          <v-divider class="my-4" />
          <div class="font-weight-light">Ticket Replies</div>
          <QuillTextEditor name="reply" />
        </v-card-text>
      </v-card>
      <v-skeleton-loader v-else type="card-heading, list-item, list-item" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import QuillTextEditor from '@/components/QuillTextEditor';
import { statusColor } from '@/utils/statusColor';
import { ticket_statuses } from '@/utils/constants';

export default {
  name: 'Show',
  components: {
    QuillTextEditor
  },
  data() {
    return {
      loading: true,
      ticket_statuses
    };
  },
  computed: {
    ...mapState('client/tickets', {
      ticket: 'model'
    })
  },
  async mounted() {
    await this.fetchTicket(this.$route.params.id);
    this.loading = false;
  },
  methods: {
    ...mapActions('client/tickets', {
      fetchTicket: 'show'
    }),
    statusColor,
    statusColorNoText(status) {
      return this.statusColor(status).replace('--text', '');
    },
    ticketStatusesExceptCurrent(status) {
      return this.lodash.omit(this.ticket_statuses, status.toUpperCase());
    }
  }
};
</script>

<style scoped></style>
