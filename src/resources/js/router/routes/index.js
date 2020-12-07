import client from '@/router/routes/client';
import support from '@/router/routes/support';
import admin from '@/router/routes/admin';
import auth from '@/router/routes/auth';

export default auth.concat(client).concat(support).concat(admin);
