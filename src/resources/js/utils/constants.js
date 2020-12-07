export const layouts = {
  GUEST: 'Guest',
  SUPPORT: 'Support',
  ADMIN: 'Admin',
  CLIENT: 'Client'
};

export const roles = {
  CLIENT: 'client',
  SUPPORT: 'support',
  ADMIN: 'admin'
};

export const ticket_statuses = {
  PENDING: 'pending',
  SOLVED: 'solved',
  CLOSED: 'closed'
};

export const status_color = {
  [ticket_statuses.PENDING]: 'orange--text',
  [ticket_statuses.CLOSED]: 'red--text',
  [ticket_statuses.SOLVED]: 'green--text'
};
