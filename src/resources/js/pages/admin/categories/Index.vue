<template>
  <v-row justify="center" align="center">
    <v-col md="8" sm="12">
      <v-card v-if="!loading" class="pa-2">
        <v-card-title> Categories </v-card-title>
        <v-card-subtitle>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          />
        </v-card-subtitle>
        <v-data-table :items="categories" :headers="headers" :search="search">
          <template #item.actions="{ item }">
            <v-btn
              :to="{
                name: 'admin.categories.view',
                params: { id: item.id }
              }"
              :aria-label="`View Category ${item.id}`"
            >
              View Category
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
      <v-skeleton-loader v-else type="table" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Index',
  data() {
    return {
      loading: true,
      search: '',
      headers: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Created At',
          value: 'created_at'
        },
        {
          text: 'Updated At',
          value: 'updated_at'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters('admin/categories', {
      categories: 'dataArray'
    })
  },
  async mounted() {
    await this.fetchCategories();
    this.loading = false;
  },
  methods: {
    ...mapActions('admin/categories', {
      fetchCategories: 'index'
    })
  }
};
</script>

<style scoped></style>
