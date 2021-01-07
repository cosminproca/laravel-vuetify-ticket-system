import faq_articles from '@/store/modules/admin/faq_articles';
import categories from '@/store/modules/admin/categories';
import tickets from '@/store/modules/admin/tickets';
import ticket_replies from '@/store/modules/admin/ticket_replies';

export default {
  ['admin/faq_articles']: faq_articles,
  ['admin/categories']: categories,
  ['admin/tickets']: tickets,
  ['admin/ticket_replies']: ticket_replies
};
