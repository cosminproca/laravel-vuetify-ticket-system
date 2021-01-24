<template>
  <v-row justify="center" align="center">
    <v-col md="8" sm="12">
      <v-card v-if="!loading" class="pa-2">
        <v-card-title> {{ category.name }} </v-card-title>
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
    ...mapState('admin/categories', {
      category: 'model'
    })
  },
  async mounted() {
    await this.fetchFAQArticle(this.$route.params.id);
    this.loading = false;
  },
  methods: {
    ...mapActions('admin/categories', {
      fetchFAQArticle: 'show'
    })
  }
};
</script>

<style scoped></style>
