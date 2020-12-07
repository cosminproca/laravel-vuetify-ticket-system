<template>
  <v-row justify="center" align="center">
    <v-col md="4" sm="12">
      <VeeValidateForm
        v-slot="{ handleSubmit, validated, invalid }"
        :errors="formErrors"
      >
        <v-card v-if="!loading" class="pa-2">
          <v-card-title>Create Category</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit(create)">
              <VeeValidateTextInput
                v-model="form.name"
                data-automation="name"
                name="name"
                label="Name"
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
import { mapActions } from 'vuex';

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
        name: ''
      },
      successMessage: ''
    };
  },
  async mounted() {
    this.loading = false;
  },
  methods: {
    ...mapActions('admin/categories', {
      storeCategory: 'store'
    }),
    async create() {
      this.pending = true;

      const res = await this.storeCategory(this.form);

      this.pending = false;

      if (res.errors) {
        this.formErrors = res.errors;

        return;
      }

      this.successMessage = 'Category created successfully!';

      this.$swal.fire({
        icon: 'success',
        title: 'Success',
        text: this.successMessage
      });
    }
  }
};
</script>

<style scoped></style>
