<template>
  <v-row justify="center" align="center">
    <v-col md="6" sm="12">
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
                  @click="updateStatus(status)"
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
          <TicketReplyBox
            :loading="loading"
            :pending="pending"
            :user="user"
            :ticket="ticket"
            :form="form"
            :form-errors="formErrors"
            :ticket_replies="ticket_replies"
            @reply="reply"
          />
        </v-card-text>
      </v-card>
      <v-skeleton-loader v-else type="card-heading, list-item, list-item" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TicketReplyBox from '@/components/TicketReplyBox';
import { statusColor } from '@/utils/statusColor';
import { ticket_statuses } from '@/utils/constants';

export default {
  name: 'Show',
  components: {
    TicketReplyBox
  },
  data() {
    return {
      loading: true,
      pending: false,
      formErrors: {},
      form: {
        text: ''
      },
      ticket_statuses
    };
  },
  computed: {
    ...mapState('support/tickets', {
      ticket: 'model'
    }),
    ...mapState('support/ticket_replies', {
      ticket_replies: 'data'
    }),
    ...mapState('auth', {
      user: 'user'
    })
  },
  async mounted() {
    await this.fetchTicket(this.$route.params.id);
    this.loading = false;
  },
  methods: {
    ...mapActions('support/tickets', {
      fetchTicket: 'show',
      updateTicket: 'update'
    }),
    ...mapActions('support/ticket_replies', {
      storeTicketReply: 'store'
    }),
    statusColor,
    statusColorNoText(status) {
      return this.statusColor(status).replace('--text', '');
    },
    ticketStatusesExceptCurrent(status) {
      return this.lodash.omit(this.ticket_statuses, status.toUpperCase());
    },
    async updateStatus(status) {
      const res = await this.updateTicket({
        ...this.ticket,
        status
      });

      if (res.status !== true) return;

      this.$swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Ticket status updated successfully!'
      });
    },
    async reply(form) {
      this.pending = true;

      this.form = { ...form };

      const res = await this.storeTicketReply({
        ...this.form,
        user_id: this.user.id,
        ticket_id: this.ticket.id
      });

      this.pending = false;

      if (res.errors) {
        this.formErrors = res.errors;

        return;
      }

      await this.fetchTicket(this.$route.params.id);

      this.form.text = '';
    }
  }
};
</script>

<style scoped></style>
