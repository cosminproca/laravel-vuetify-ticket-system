import tickets from '@/store/modules/support/tickets';
import categories from '@/store/modules/support/categories';
import faq_articles from '@/store/modules/support/faq_articles';
import ticket_replies from '@/store/modules/support/ticket_replies';

export default {
  ['support/tickets']: tickets,
  ['support/categories']: categories,
  ['support/faq_articles']: faq_articles,
  ['support/ticket_replies']: ticket_replies
};
