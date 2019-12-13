import { getMarketUnit, LOOKUP } from '../marketUnit';
import { getVitsUser, defaultUserForMucd } from '../vitsUser';

describe('context', () => {
  describe('getMarketUnit', () => {
    test('it returns VS value with no value', () => {
      expect(getMarketUnit()).toStrictEqual(LOOKUP.VS);
    });

    test('it returns VS value when value is not known', () => {
      expect(getMarketUnit('hej')).toStrictEqual(LOOKUP.VS);
    });

    test('it returns VS value when value is not string or number', () => {
      expect(getMarketUnit({ foo: 'bar' })).toStrictEqual(LOOKUP.VS);
    });

    test.each`
      input
      ${'VS'}
      ${1}
      ${'VN'}
      ${3}
      ${'SD'}
      ${11}
      ${'TF'}
      ${15}
      ${'DS'}
      ${18}
    `('returns correctly for $input', ({ input }) => {
      expect(getMarketUnit(input)).toStrictEqual(LOOKUP[input]);
    });
  });

  describe('vitsUser', () => {
    test('returns header "auth-userid" if present', () => {
      const authUserId = 'authUserId';
      expect(getVitsUser({ 'auth-userid': authUserId })).toBe(authUserId);
    });

    test('returns VS value if no arguments', () => {
      expect(getVitsUser()).toBe(defaultUserForMucd[1]);
    });

    test('returns VS value if no match on siteId', () => {
      expect(getVitsUser({}, { siteId: 23 })).toBe(defaultUserForMucd[1]);
    });

    test.each`
      siteId
      ${1}
      ${3}
      ${11}
      ${15}
      ${18}
    `('returns correctly for provided siteId', ({ siteId }) => {
      expect(getVitsUser({}, { siteId })).toBe(defaultUserForMucd[siteId]);
    });
  });
});
