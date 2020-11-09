<template>
  <VeeValidateForm
    v-slot="{ handleSubmit, validated, invalid }"
    :errors="errors"
  >
    <v-card min-width="300px" max-width="400px" class="pa-2">
      <v-card-title>Reset Password</v-card-title>
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
          :disabled="invalid || !validated || pending || successMessage !== ''"
          :loading="pending"
          color="success"
          @click="handleSubmit(submit)"
        >
          Reset Password
        </v-btn>
        <v-btn
          data-automation="register_link"
          :disabled="pending || successMessage !== ''"
          color="blue"
          type="button"
          :to="{ name: 'login' }"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </VeeValidateForm>
</template>

<script>
import VeeValidateTextInput from '@/components/VeeValidateTextInput';
import VeeValidateForm from '@/components/VeeValidateForm';
import { mapActions } from 'vuex';

export default {
  name: 'ForgotPassword',
  components: {
    VeeValidateForm,
    VeeValidateTextInput
  },
  data() {
    return {
      pending: false,
      errors: null,
      successMessage: '',
      email: ''
    };
  },
  methods: {
    ...mapActions('auth', {
      resetPassword: 'login'
    }),
    async submit() {
      this.pending = true;

      const res = await this.resetPassword({
        email: this.email
      });

      this.pending = false;

      if (res.errors) {
        this.errors = res.errors;

        return;
      }

      this.successMessage = 'Password reset successfully.';

      await this.$router.push({ name: this.userRole.name });
    }
  }
};
</script>

<style scoped></style>
