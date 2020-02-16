import { createHmac } from 'crypto';

const SECRET =
  'origo schema registry secret for hashing (not very secret perhaps)';

export default function createHash(data) {
  return createHmac('SHA3-512', SECRET)
    .update(data)
    .digest('hex');
}
