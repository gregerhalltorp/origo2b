import { valueIn } from '@tcne/react-utils/common';

export async function flightResolver(parent, direction) {
  return {
    flightKey: valueIn(parent, ['_embedded', direction, '0', 'flightKey'], ''),
  };
}
