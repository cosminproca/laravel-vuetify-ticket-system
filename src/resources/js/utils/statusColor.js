import { status_color } from '@/utils/constants';

export function statusColor(status) {
  console.log(status);
  return status_color[status.toLowerCase()];
}
