<template>
  <v-row>
    <v-col cols="6">
      <v-card v-if="!loading">
        <v-card-title>Your last 5 tickets</v-card-title>

        <v-list two-line>
          <template v-for="ticket in lastFiveTickets">
            <v-list-item
              :key="ticket.id"
              :to="{
                name: 'client.tickets.view',
                params: { id: ticket.id }
              }"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="d-flex align-center justify-space-between"
                >
                  <div>
                    {{ ticket.title }}
                  </div>
                  <div>
                    <v-btn :color="statusColorNoText(ticket.status)">
                      {{ ticket.status }}
                    </v-btn>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
      <v-skeleton-loader v-else type="card-heading, list-item, list-item" />
    </v-col>
    <v-col cols="6">
      <v-card v-if="!loading">
        <v-card-title>Most useful FAQ Articles</v-card-title>

        <v-list two-line>
          <template v-for="faq_article in randomFaqArticles">
            <v-list-item
              :key="faq_article.id"
              :to="{
                name: 'client.faq_articles.view',
                params: { id: faq_article.id }
              }"
            >
              <v-list-item-content>
                <v-list-item-title>{{ faq_article.title }}</v-list-item-title>

                <v-list-item-subtitle>
                  {{ faq_article.description }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
      <v-skeleton-loader v-else type="card-heading, list-item, list-item" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { statusColor } from '@/utils/statusColor';

export default {
  name: 'Client',
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapGetters('client/faq_articles', {
      faq_articles: 'dataArray'
    }),
    ...mapGetters('client/tickets', {
      tickets: 'dataArray'
    }),
    randomFaqArticles() {
      return this.lodash.sampleSize(this.faq_articles, 5);
    },
    lastFiveTickets() {
      return this.lodash.takeRight(this.tickets, 5);
    }
  },
  async mounted() {
    await this.fetchFAQArticles();
    await this.fetchTickets();
    this.loading = false;
  },
  methods: {
    ...mapActions('client/faq_articles', {
      fetchFAQArticles: 'index'
    }),
    ...mapActions('client/tickets', {
      fetchTickets: 'index'
    }),
    statusColorNoText(status) {
      return this.statusColor(status).replace('--text', '');
    },
    statusColor
  }
};
</script>

<style scoped></style>
