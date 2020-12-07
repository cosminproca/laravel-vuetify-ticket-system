<template>
  <v-row justify="center" align="center">
    <v-col md="8" sm="12">
      <v-card v-if="!loading" class="pa-2">
        <v-card-title> {{ faq_article.title }} </v-card-title>
        <v-card-subtitle v-show="faq_article.category">
          {{ faq_article.category.name }}
        </v-card-subtitle>
        <v-card-text>
          <div v-html="faq_article.description" />
        </v-card-text>
      </v-card>
      <v-skeleton-loader v-else type="card-heading, list-item, list-item" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Show',
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState('client/faq_articles', {
      faq_article: 'model'
    })
  },
  async mounted() {
    await this.fetchFAQArticle(this.$route.params.id);
    this.loading = false;
  },
  methods: {
    ...mapActions('client/faq_articles', {
      fetchFAQArticle: 'show'
    })
  }
};
</script>

<style scoped></style>
