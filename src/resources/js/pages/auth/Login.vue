<template>
  <VeeValidateForm
    v-slot="{ handleSubmit, validated, invalid }"
    :errors="errors"
  >
    <v-card min-width="300px" max-width="400px" class="pa-2">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit(submit)">
          <VeeValidateTextInput
            v-model="email"
            type="email"
            name="email"
            label="E-mail"
            rules="email|required"
            required
          />

          <VeeValidateTextInput
            v-model="password"
            type="password"
            name="password"
            label="Password"
            rules="min:6|required"
            required
          />

          <input type="submit" class="d-none" />
        </v-form>
      </v-card-text>
      <v-card-actions class="mx-2 d-flex justify-space-between align-center">
        <v-btn
          :disabled="invalid || !validated || pending"
          :loading="pending"
          color="success"
          @click="handleSubmit(submit)"
        >
          Login
        </v-btn>
        <v-btn class="blue" type="button" :to="{ name: 'Register' }">
          Sign Up
        </v-btn>
      </v-card-actions>
    </v-card>
  </VeeValidateForm>
</template>

<script>
import VeeValidateForm from '@/components/VeeValidateForm';
import VeeValidateTextInput from '@/components/VeeValidateTextInput';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {
    VeeValidateForm,
    VeeValidateTextInput
  },
  data() {
    return {
      pending: false,
      errors: null,
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions('auth', {
      login: 'login',
      user: 'user'
    }),
    async submit() {
      this.pending = true;

      const res = await this.login({
        email: this.email,
        password: this.password
      });

      this.pending = false;

      if (res.password) {
        this.errors = res;

        return;
      }

      await this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style scoped></style>
