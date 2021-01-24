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
      <v-card-actions>
        <v-container class="mx-2">
          <v-row justify="space-between">
            <v-btn
              data-automation="submit_button"
              :disabled="
                invalid || !validated || pending || successMessage !== ''
              "
              :loading="pending"
              color="success"
              @click="handleSubmit(submit)"
            >
              Login
            </v-btn>
            <v-btn
              data-automation="register_link"
              :disabled="pending || successMessage !== ''"
              color="blue"
              type="button"
              :to="{ name: 'register' }"
            >
              Sign Up
            </v-btn>
          </v-row>
          <v-row class="mt-4" justify="center">
            <v-btn color="red"><v-icon>mdi-google</v-icon></v-btn>
            <v-btn class="mx-4" color="blue">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </VeeValidateForm>
</template>

<script>
import VeeValidateTextInput from '@/components/VeeValidateTextInput';
import VeeValidateForm from '@/components/VeeValidateForm';
import { mapState, mapGetters, mapActions } from 'vuex';

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
      successMessage: '',
      email: '',
      password: ''
    };
  },
  computed: {
    ...mapState('auth', {
      user: 'user'
    }),
    ...mapGetters('auth', {
      userRole: 'userRole'
    })
  },
  methods: {
    ...mapActions('auth', {
      login: 'login',
      fetchUser: 'user'
    }),
    async submit() {
      this.pending = true;

      const res = await this.login({
        email: this.email,
        password: this.password
      });

      this.pending = false;

      if (res.errors) {
        this.errors = res.errors;

        return;
      }

      this.successMessage = 'Logged in, you will be redirected soon.';

      await this.$router.push({ name: this.userRole.name });
    }
  }
};
</script>

<style scoped></style>
