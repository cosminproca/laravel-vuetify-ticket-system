<template>
  <v-row justify="center" align="center">
    <v-col cols="4">
      <VeeValidateForm
        v-slot="{ handleSubmit, validated, invalid }"
        :errors="formErrors"
      >
        <v-card v-if="!loading" class="pa-2">
          <v-card-title>Create Ticket</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit(create)">
              <validation-provider
                v-slot="{ errors }"
                name="category"
                rules="required"
              >
                <v-autocomplete
                  v-model="category_id"
                  :items="categories"
                  data-automation="category"
                  item-text="name"
                  item-value="id"
                  :error-messages="errors"
                  label="Category"
                />
              </validation-provider>

              <VeeValidateTextInput
                v-model="title"
                data-automation="title"
                name="title"
                label="Title"
                rules="required"
                required
              />

              <VeeValidateTextAreaInput
                v-model="description"
                data-automation="description"
                name="description"
                label="Description"
                rules="required"
                required
              />

              <input
                data-automation="hidden_submit_input"
                type="submit"
                :disabled="invalid || !validated || pending"
                class="d-none"
              />

              <div v-if="successMessage">
                <p class="ml-3 mb-0 green--text">
                  {{ successMessage }}
                </p>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions
            class="mx-2 d-flex justify-space-between align-center"
          >
            <v-btn
              data-automation="submit_button"
              :disabled="
                invalid || !validated || pending || successMessage !== ''
              "
              :loading="pending"
              color="success"
              @click="handleSubmit(create)"
            >
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-skeleton-loader
          v-else
          type="card-heading, list-item, list-item, list-item, actions"
        />
      </VeeValidateForm>
    </v-col>
  </v-row>
</template>

<script>
import VeeValidateForm from '@/components/VeeValidateForm';
import VeeValidateTextInput from '@/components/VeeValidateTextInput';
import VeeValidateTextAreaInput from '@/components/VeeValidateTextAreaInput';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Create',
  components: {
    VeeValidateForm,
    VeeValidateTextInput,
    VeeValidateTextAreaInput
  },
  data() {
    return {
      pending: false,
      loading: true,
      formErrors: {},
      successMessage: '',
      category_id: '',
      title: '',
      description: ''
    };
  },
  computed: {
    ...mapGetters('categories', {
      categories: 'dataArray'
    }),
    ...mapState('auth', {
      user: 'user'
    })
  },
  async mounted() {
    await this.fetchCategories();
    this.loading = false;
  },
  methods: {
    ...mapActions('tickets', {
      storeTicket: 'store'
    }),
    ...mapActions('categories', {
      fetchCategories: 'index'
    }),
    async create() {
      this.pending = true;

      const res = await this.storeTicket({
        user_id: this.user.id,
        category_id: this.category_id,
        title: this.title,
        description: this.description
      });

      this.pending = false;

      if (res.errors) {
        this.formErrors = res.errors;

        return;
      }

      this.successMessage = 'Ticket created successfully!';
    }
  }
};
</script>

<style scoped></style>
