<template>
  <div>
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
        <QuillTextEditor v-model="localForm.text" name="reply" />
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
  </div>
</template>

<script>
import QuillTextEditor from '@/components/QuillTextEditor';
import VeeValidateForm from '@/components/VeeValidateForm';

export default {
  name: 'TicketReplyBox',
  components: {
    QuillTextEditor,
    VeeValidateForm
  },
  props: [
    'ticket',
    'ticket_replies',
    'loading',
    'pending',
    'formErrors',
    'form',
    'user'
  ],
  data() {
    return {
      localForm: {
        text: ''
      }
    };
  },
  watch: {
    form: {
      handler(value) {
        this.localForm = { ...value };
      },
      deep: true
    }
  },
  methods: {
    reply() {
      this.$emit('reply', this.localForm);
    }
  }
};
</script>

<style scoped></style>
