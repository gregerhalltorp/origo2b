/* eslint-disable import/prefer-default-export */

const defaultUserForMucd = {
  1: '2384',
  3: '2588',
  11: '2645',
  15: '2589',
  18: '2188',
};

export const getVitsUser = (headers, marketUnit) => {
  return (
    headers['auth-userid'] ||
    defaultUserForMucd[marketUnit.siteId] ||
    defaultUserForMucd[1]
  );
};
