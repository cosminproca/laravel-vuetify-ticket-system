<template>
  <v-row justify="center" align="center">
    <v-col md="8" sm="12">
      <v-card v-if="!loading" class="pa-2">
        <v-card-title> See FAQ Articles </v-card-title>
        <v-card-subtitle>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          />
        </v-card-subtitle>
        <v-data-table :items="faq_articles" :headers="headers" :search="search">
          <template #item.actions="{ item }">
            <v-btn
              :to="{
                name: 'support.faq_articles.view',
                params: { id: item.id }
              }"
              :aria-label="`View Article ${item.id}`"
            >
              View Article
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
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Category',
          value: 'category.name'
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
    ...mapGetters('support/faq_articles', {
      faq_articles: 'dataArray'
    })
  },
  async mounted() {
    await this.fetchFAQArticles();
    this.loading = false;
  },
  methods: {
    ...mapActions('support/faq_articles', {
      fetchFAQArticles: 'index'
    })
  }
};
</script>

<style scoped></style>
