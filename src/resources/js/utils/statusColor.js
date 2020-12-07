import { status_color } from '@/utils/constants';

export function statusColor(status) {
  return status_color[status.toLowerCase()];
}
