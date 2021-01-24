<template>
  <div>
    <v-speed-dial color="blue" direction="top">
      <template #activator>
        <v-btn color="blue darken-2" large fixed right bottom fab>
          <v-icon> mdi-chat </v-icon>
        </v-btn>
      </template>
      <v-card
        rounded
        :ripple="false"
        class="elevation-5 shades pa-6"
        style="
          position: fixed;
          cursor: auto;
          top: 30%;
          left: 68.7%;
          width: 30%;
          height: 60%;
          overflow-y: scroll;
        "
        @click.stop
      >
        <v-card-title>Chat</v-card-title>
        <div
          v-for="message in messages"
          :key="message.id"
          class="d-flex flex-column"
          :style="
            message.user_id !== 0 ? 'align-items: end' : 'align-items: start'
          "
        >
          <div
            v-if="message.user_id !== 0"
            class="d-flex flex-column green pa-5 ma-5 rounded"
            style="width: 50%"
          >
            <div class="mb-4" v-html="message.text" />
            <div
              class="d-flex justify-space-between font-italic"
              style="align-items: end; font-size: 0.7rem"
            >
              <div>
                Sent by
                <span class="font-weight-bold">{{ user.email }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="message.user_id === 0"
            class="d-flex flex-column blue pa-5 ma-5 rounded"
            style="width: 50%"
          >
            <div class="mb-4" v-html="message.text" />
            <div
              class="d-flex justify-space-between font-italic"
              style="align-items: end; font-size: 0.7rem"
            >
              <div>
                Sent by
                <span class="font-weight-bold"> Bot</span>
              </div>
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <VeeValidateForm v-slot="{ handleSubmit, validated, invalid }">
          <v-form @submit.prevent="handleSubmit(reply)">
            <VeeValidateTextInput
              v-model="form.text"
              name="reply"
              rules="required"
              append-outer-icon="mdi-send"
              @click:append-outer="handleSubmit(reply)"
            />
            <input
              data-automation="hidden_submit_input"
              type="submit"
              :disabled="invalid || !validated || pending"
              class="d-none"
            />
          </v-form>
        </VeeValidateForm>
      </v-card>
    </v-speed-dial>
  </div>
</template>

<script>
import VeeValidateForm from '@/components/VeeValidateForm';
import VeeValidateTextInput from '@/components/VeeValidateTextInput';
import { ticket_statuses, user_role_color } from '@/utils/constants';
import { mapState } from 'vuex';

export default {
  name: 'ChatBot',
  components: {
    VeeValidateTextInput,
    VeeValidateForm
  },
  data() {
    return {
      pending: false,
      botMessages: [
        {
          user_id: 0,
          text: '<p>Hello</p>'
        },
        {
          user_id: 0,
          text: `
            <p>Here are some of the most useful FAQ articles
              <ul>
                <li><a class="white--text" href="/client/faq_articles/10">Test1</a></li>
                <li><a class="white--text" href="/client/faq_articles/3">Test2</a></li>
                <li><a class="white--text" href="/client/faq_articles/2">Test3</a></li>
              </ul>
            </p>
          `
        }
      ],
      allMessages: [],
      form: {
        text: ''
      },
      formErrors: null,
      ticket_statuses,
      user_role_color
    };
  },
  computed: {
    ...mapState('auth', {
      user: 'user'
    }),
    messages() {
      return [...this.botMessages, ...this.allMessages];
    }
  },
  methods: {
    generateLinks(articles) {
      let list = '';

      if (articles.length === 0) {
        return `<p>I'm sorry but I haven't found anything useful to help solve your problem</p>`;
      }

      articles.forEach((article) => {
        list += `<li><a class="white--text" href="/client/faq_articles/${article.id}">${article.title}</a></li>`;
      });

      return `<p>Here are some articles which I found to be relevant to your problem <ul>${list}</ul></p>`;
    },
    async reply() {
      this.pending = true;

      this.allMessages.push({
        user_id: this.user.id,
        text: this.form.text
      });

      const res = await this.$axios.post(
        '/api/client/generate-reply',
        this.form
      );

      const botResponse = this.generateLinks(res.data);

      this.allMessages.push({
        user_id: 0,
        text: botResponse
      });

      this.pending = false;

      this.form.text = '';
    },
    userRoleColor(role) {
      return user_role_color[role];
    }
  }
};
</script>

<style scoped></style>
