<template>
  <v-card max-width="400px" class="mt-4 pa-2">
    <v-card-title>Login</v-card-title>
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
          :rules="passwordRules"
          label="Password"
          required
        />

        <v-btn
          type="submit"
          :disabled="!valid || pending"
          :loading="pending"
          color="success"
          class="mr-4 mt-4"
        >
          Login
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      valid: true,
      pending: false,
      password: '',
      passwordRules: [(v) => !!v || 'Password is required'],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    };
  },
  methods: {
    ...mapActions('auth', {
      login: 'login',
      user: 'user'
    }),
    async submit() {
      if (!this.$refs.form.validate()) return;

      this.pending = true;

      await this.login({
        email: this.email,
        password: this.password
      });

      await this.user();

      this.pending = false;

      await this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style scoped></style>
