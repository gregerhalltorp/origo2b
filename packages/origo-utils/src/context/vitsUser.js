/* eslint-disable import/prefer-default-export */

export const defaultUserForMucd = {
  1: '2384',
  3: '2588',
  11: '2645',
  15: '2589',
  18: '2188',
};

export const getVitsUser = (headers = {}, { siteId = 1 } = {}) => {
  return (
    headers['auth-userid'] ||
    defaultUserForMucd[siteId] ||
    defaultUserForMucd[1]
  );
};
