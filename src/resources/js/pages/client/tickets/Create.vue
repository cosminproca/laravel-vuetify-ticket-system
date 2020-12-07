<template>
  <v-row justify="center" align="center">
    <v-col md="4" sm="12">
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
                  v-model="form.category_id"
                  :items="categories"
                  data-automation="category"
                  item-text="name"
                  item-value="id"
                  :error-messages="errors"
                  label="Category"
                />
              </validation-provider>

              <VeeValidateTextInput
                v-model="form.title"
                data-automation="title"
                name="title"
                label="Title"
                rules="required"
                required
              />

              <QuillTextEditor
                v-model="form.description"
                label="Description "
                name="description"
                rules="required"
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
              aria-label="Create"
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
import QuillTextEditor from '@/components/QuillTextEditor';
import VeeValidateForm from '@/components/VeeValidateForm';
import VeeValidateTextInput from '@/components/VeeValidateTextInput';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Create',
  components: {
    QuillTextEditor,
    VeeValidateForm,
    VeeValidateTextInput
  },
  data() {
    return {
      pending: false,
      loading: true,
      formErrors: {},
      form: {
        title: '',
        description: '',
        category_id: ''
      },
      successMessage: ''
    };
  },
  computed: {
    ...mapGetters('client/categories', {
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
    ...mapActions('client/tickets', {
      storeTicket: 'store'
    }),
    ...mapActions('client/categories', {
      fetchCategories: 'index'
    }),
    async create() {
      this.pending = true;

      const res = await this.storeTicket({
        ...this.form,
        user_id: this.user.id
      });

      this.pending = false;

      if (res.errors) {
        this.formErrors = res.errors;

        return;
      }

      this.$swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Ticket created successfully!'
      });

      this.form = {
        title: '',
        description: '',
        category_id: ''
      };
    }
  }
};
</script>

<style scoped></style>
