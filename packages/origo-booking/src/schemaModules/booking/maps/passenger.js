const AGE_CATEGORIES = [
  { limit: 1, name: 'INFANT' },
  { limit: 11, name: 'CHILD' },
  { limit: 17, name: 'YOUTH' },
  { limit: 999999, name: 'ADULT' },
];

function passengerAgeCategory(age) {
  let i = 0;
  while (i < AGE_CATEGORIES.length - 1 && AGE_CATEGORIES[i].limit < age) {
    i++;
  }

  return AGE_CATEGORIES[i].name;
}

function passengerBirthDay(dateOfBirth, marketUnit = { text: 'VS' }) {
  const dob = dateOfBirth || '';
  const parts = (dob.split('T').shift() || '').split('-');
  if (parts.length !== 3) {
    return null;
  }

  return marketUnit.text === 'VS'
    ? `${parts[0].substr(2, 2)}${parts[1]}${parts[2]}`
    : `${parts[2]}${parts[1]}${parts[0].substr(2, 2)}`;
}

export default ({
  passengerReference, gender = '', age, dateOfBirth, ...rest
} = {}) => ({
  ...rest,
  age: {
    value: age,
    dateOfBirth,
    category: passengerAgeCategory(age),
    dateOfBirthLocale: passengerBirthDay(dateOfBirth),
  },
  gender: gender.toLocaleLowerCase() !== 'unknown' ? gender : null,
  id: passengerReference,
});
