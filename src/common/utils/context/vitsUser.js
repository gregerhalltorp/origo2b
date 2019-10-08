const defaultUserForMucd = {
  1: '2384',
  3: '2588',
  11: '2645',
  15: '2589',
  18: '2188',
};


export default function getVitsUser(headers, marketUnit) {
  return headers['auth-userid']
    || defaultUserForMucd[marketUnit.code]
    || defaultUserForMucd[1];
}
