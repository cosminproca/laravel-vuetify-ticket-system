<template>
  <v-card max-width="400px" class="mt-4 pa-2">
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
          :rules="[...passwordRules, passwordConfirmationRule]"
          label="Password"
          required
        />

        <v-text-field
          v-model="passwordConfirmation"
          type="password"
          label="Password Confirmation"
          required
        />

        <v-btn
          type="submit"
          :disabled="!valid || pending"
          :loading="pending"
          color="success"
          class="mr-4 mt-4"
        >
          Register
        </v-btn>
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
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          (v && v.length >= 6) || 'Password must be longer than 6 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    };
  },
  computed: {
    passwordConfirmationRule() {
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
