import tickets from '@/store/modules/client/tickets';
import ticket_replies from '@/store/modules/client/ticket_replies';
import categories from '@/store/modules/client/categories';
import faq_articles from '@/store/modules/client/faq_articles';

export default {
  ['client/tickets']: tickets,
  ['client/categories']: categories,
  ['client/faq_articles']: faq_articles,
  ['client/ticket_replies']: ticket_replies
};
