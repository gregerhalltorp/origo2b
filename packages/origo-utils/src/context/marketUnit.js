/* eslint-disable import/prefer-default-export */
export const LOOKUP = {
  VS: { siteId: 1, code: 'VS' },
  1: { siteId: 1, code: 'VS' },
  VN: { siteId: 3, code: 'VN' },
  3: { siteId: 3, code: 'VN' },
  SD: { siteId: 11, code: 'SD' },
  11: { siteId: 11, code: 'SD' },
  TF: { siteId: 15, code: 'TF' },
  15: { siteId: 15, code: 'TF' },
  DS: { siteId: 18, code: 'DS' },
  18: { siteId: 18, code: 'DS' },
};

const normalizeString = str => {
  if (typeof str !== 'string') {
    return false;
  }

  return str.trim().toUpperCase();
};

export const getMarketUnit = (value = 'VS') => {
  let normalizedValue = +value;
  normalizedValue = Number.isNaN(normalizedValue)
    ? normalizeString(value)
    : normalizedValue;
  return LOOKUP[normalizedValue] || LOOKUP.VS;
};
