<template>
  <v-card min-width="300px" max-width="400px" class="mt-4 pa-2">
    <v-card-title>Register</v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-text-field
          v-model="email"
          type="email"
          :rules="emailRules"
          label="E-mail"
          required
        />

        <v-text-field
          v-model="password"
          type="password"
          :rules="[...passwordRules]"
          label="Password"
          required
        />

        <v-text-field
          v-model="passwordConfirmation"
          :rules="[...passwordConfirmationRules, confirmationRule]"
          type="password"
          label="Password Confirmation"
          required
        />

        <div class="d-flex justify-space-between">
          <v-btn
            type="submit"
            :disabled="!valid || pending"
            :loading="pending"
            color="success"
            class="mr-4 mt-4"
          >
            Register
          </v-btn>
          <v-btn class="mt-4 blue" type="button" to="/login">Login</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      valid: true,
      pending: false,
      password: '',
      passwordConfirmation: '',
      passwordConfirmationRules: [
        (passwordConfirmation) =>
          !!passwordConfirmation || 'Password confirmation is required'
      ],
      passwordRules: [
        (password) => !!password || 'Password is required',
        (password) =>
          (password && password.length >= 6) ||
          'Password must be longer than 6 characters'
      ],
      email: '',
      emailRules: [
        (email) => !!email || 'E-mail is required',
        (email) => /.+@.+\..+/.test(email) || 'E-mail must be valid'
      ]
    };
  },
  computed: {
    confirmationRule() {
      return (
        this.password === this.passwordConfirmation || 'Password must match'
      );
    }
  },
  methods: {
    ...mapActions('auth', {
      register: 'register',
      user: 'user'
    }),
    async submit() {
      if (!this.$refs.form.validate()) return;

      this.pending = true;

      await this.register({
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      });

      this.pending = false;

      await this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped></style>
