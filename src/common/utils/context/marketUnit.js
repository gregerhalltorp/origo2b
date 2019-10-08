
const LOOKUP = {
  VS: { code: 1, text: 'VS' },
  1: { code: 1, text: 'VS' },
  VN: { code: 3, text: 'VN' },
  3: { code: 3, text: 'VN' },
  SD: { code: 11, text: 'SD' },
  11: { code: 11, text: 'SD' },
  TF: { code: 15, text: 'TF' },
  15: { code: 15, text: 'TF' },
  DS: { code: 18, text: 'DS' },
  18: { code: 18, text: 'DS' },
};

const normalizeString = (str) => {
  if (typeof str !== 'string') {
    return false;
  }

  return str.trim().toUpperCase();
};

export default (value = 'VS') => {
  let normalizedValue = +value;
  normalizedValue = Number.isNaN(normalizedValue) ? normalizeString(value) : normalizedValue;
  return LOOKUP[normalizedValue] || LOOKUP.VS;
};
