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
          <div
            v-for="ticket_reply in ticket.ticket_replies"
            :key="ticket_reply.id"
            class="d-flex flex-column"
            :style="
              ticket_reply.user_id === user.id
                ? 'align-items: end'
                : 'align-items: start'
            "
          >
            <div
              v-if="ticket_reply.user_id === user.id"
              class="d-flex justify-space-between pa-5 ma-5 blue rounded"
              style="width: 50%"
            >
              <div class="mb-4" v-html="ticket_reply.text" />
              <div
                class="d-flex font-italic"
                style="align-items: end; font-size: 0.7rem"
              >
                {{ ticket_reply.updated_at }}
              </div>
            </div>
            <div
              v-if="ticket_reply.user_id !== user.id"
              class="d-flex justify-space-between pa-5 ma-5 green rounded"
              style="width: 50%"
            >
              <div class="mb-4" v-html="ticket_reply.text" />
              <div
                class="d-flex font-italic"
                style="align-items: end; font-size: 0.7rem"
              >
                {{ ticket_reply.updated_at }}
              </div>
            </div>
          </div>
          <v-divider class="my-4" />
          <VeeValidateForm
            v-slot="{ handleSubmit, validated, invalid }"
            :errors="formErrors"
          >
            <v-form @submit.prevent="handleSubmit(reply)">
              <QuillTextEditor v-model="form.text" name="reply" />
              <input
                data-automation="hidden_submit_input"
                type="submit"
                :disabled="invalid || !validated || pending"
                class="d-none"
              />
              <v-btn
                class="mt-6"
                data-automation="submit_button"
                :disabled="invalid || !validated || pending"
                :loading="pending"
                color="success"
                aria-label="Create"
                @click="handleSubmit(reply)"
              >
                Reply
              </v-btn>
            </v-form>
          </VeeValidateForm>
        </v-card-text>
      </v-card>
      <v-skeleton-loader v-else type="card-heading, list-item, list-item" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import QuillTextEditor from '@/components/QuillTextEditor';
import VeeValidateForm from '@/components/VeeValidateForm';
import { statusColor } from '@/utils/statusColor';
import { ticket_statuses } from '@/utils/constants';

export default {
  name: 'Show',
  components: {
    QuillTextEditor,
    VeeValidateForm
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
    ...mapState('client/tickets', {
      ticket: 'model'
    }),
    ...mapState('client/ticket_replies', {
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
    ...mapActions('client/tickets', {
      fetchTicket: 'show'
    }),
    ...mapActions('client/ticket_replies', {
      storeTicketReply: 'store'
    }),
    statusColor,
    statusColorNoText(status) {
      return this.statusColor(status).replace('--text', '');
    },
    ticketStatusesExceptCurrent(status) {
      return this.lodash.omit(this.ticket_statuses, status.toUpperCase());
    },
    async reply() {
      this.pending = true;

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
