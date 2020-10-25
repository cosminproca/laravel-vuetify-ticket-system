<template>
  <VeeValidateForm
    v-slot="{ handleSubmit, validated, invalid }"
    :errors="errors"
  >
    <v-card min-width="300px" max-width="400px" class="mt-4 pa-2">
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit(submit)">
          <VeeValidateTextInput
            v-model="email"
            data-automation="email"
            type="email"
            name="email"
            label="E-mail"
            rules="email|required"
            required
          />

          <VeeValidateTextInput
            v-model="password"
            data-automation="password"
            type="password"
            name="password"
            label="Password"
            rules="min:6|required"
            required
          />

          <VeeValidateTextInput
            v-model="passwordConfirmation"
            data-automation="password_confirmation"
            type="password"
            name="passwordConfirmation"
            label="Password Confirmation"
            rules="min:6|required|confirmed:password"
            required
          />

          <input
            data-automation="hidden_submit_input"
            type="submit"
            :disabled="invalid || !validated || pending"
            class="d-none"
          />

          <div
            v-if="successMessage"
            class="d-flex align-center justify-space-between"
          >
            <v-progress-circular indeterminate color="green" />
            <p class="ml-3 mb-0 green--text">
              {{ successMessage }}
            </p>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="mx-2 d-flex justify-space-between align-center">
        <v-btn
          data-automation="submit_button"
          :disabled="invalid || !validated || pending"
          :loading="pending"
          color="success"
          @click="handleSubmit(submit)"
        >
          Register
        </v-btn>
        <v-btn
          data-automation="register_link"
          class="blue"
          type="button"
          :to="{ name: 'login' }"
        >
          Sign In
        </v-btn>
      </v-card-actions>
    </v-card>
  </VeeValidateForm>
</template>

<script>
import { mapActions } from 'vuex';
import VeeValidateTextInput from '@/components/VeeValidateTextInput';
import VeeValidateForm from '@/components/VeeValidateForm';

export default {
  name: 'Register',
  components: {
    VeeValidateTextInput,
    VeeValidateForm
  },
  data() {
    return {
      pending: false,
      errors: null,
      successMessage: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  },
  methods: {
    ...mapActions('auth', {
      register: 'register',
      user: 'user'
    }),
    async submit() {
      this.pending = true;

      const res = await this.register({
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      });

      this.pending = false;

      if (res.errors) {
        this.errors = res.errors;

        return;
      }

      this.successMessage =
        'Account created successfully, redirecting to the login page.';

      setTimeout(() => {
        this.$router.push({ name: 'login' });
      }, 2000);
    }
  }
};
</script>

<style scoped></style>
