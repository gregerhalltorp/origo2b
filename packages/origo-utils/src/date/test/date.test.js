import {
  formatDateForBH2,
  validateAndFormatDate,
  getDaysShortForSiteId,
  getMonthNamesForSiteId,
  getDuration,
  getNumberOfDaysString,
  getDpDurationInWeeksFromDays,
  getDurationInWeekFromDays,
} from '..';
import textsPerSiteId from '../textsPerSiteId';

describe('date', () => {
  describe('formatDateForBH2', () => {
    test('returns "Invalid date" for invalid date', () => {
      expect(formatDateForBH2('lsdkfj')).toBe('Invalid date');
    });

    test('works for stipulated date formats', () => {
      ['20191206', '06.12.2019', '06-12-2019', '2019-12-06'].forEach(date => {
        expect(formatDateForBH2(date)).toBe('2019-12-06');
      });
    });
  });

  describe('validateAndFormatDate', () => {
    test('throws on undefined marketUnit', () => {
      expect(() => {
        validateAndFormatDate('value', undefined, 'format');
      }).toThrow(/Invalid marketUnit/);
    });

    test('throws on invalid siteId', () => {
      expect(() => {
        validateAndFormatDate('value', { siteId: 23 }, 'format');
      }).toThrow(/Invalid siteId/);
    });

    test('throws on invalid date', () => {
      expect(() => {
        validateAndFormatDate('value', { siteId: 1 }, 'format');
      }).toThrow(/Invalid date/);
    });

    test('throws on invalid representation', () => {
      expect(() => {
        validateAndFormatDate('20191207', { siteId: 1 }, 'format');
      }).toThrow(/Invalid date/);
    });

    test.each`
      representation                    | result
      ${'2019-12-07'}                   | ${'2019-12-07'}
      ${'2019-12-07T08:30:38'}          | ${'2019-12-07'}
      ${'2019-12-07T08:30:38Z'}         | ${'2019-12-07'}
      ${'2019-12-07T08:30:38.851'}      | ${'2019-12-07'}
      ${'2019-12-07T08:30:38.851Z'}     | ${'2019-12-07'}
      ${'2019-12-07T08:30:38.8517667'}  | ${'2019-12-07'}
      ${'2019-12-07T08:30:38.8517667Z'} | ${'2019-12-07'}
      ${'07-2019-12'}                   | ${'2019-12-07'}
    `(
      'handles representation $representation',
      ({ representation, result }) => {
        expect(
          validateAndFormatDate(representation, { siteId: 1 }, 'YYYY-MM-DD')
        ).toBe(result);
      }
    );

    test.each`
      siteId | date            | format                     | expected
      ${1}   | ${'2017-09-13'} | ${'@longFormat'}           | ${'ons 13 sep 2017'}
      ${1}   | ${'2017-09-13'} | ${'@longNoDayFormat'}      | ${'13 sep 2017'}
      ${1}   | ${'2017-09-13'} | ${'@shortFormat'}          | ${'2017-09-13'}
      ${1}   | ${'2017-09-13'} | ${'@dayFormat'}            | ${'13'}
      ${1}   | ${'2017-09-13'} | ${'@timeFormat'}           | ${'00:00'}
      ${1}   | ${'2017-09-13'} | ${'@monthShortNameFormat'} | ${'sep'}
      ${1}   | ${'2017-09-13'} | ${'@dayMonthYearFormat'}   | ${'13 sep 2017'}
      ${18}  | ${'2017-09-13'} | ${'@longFormat'}           | ${'ons 13 sep 2017'}
      ${18}  | ${'2017-09-13'} | ${'@longNoDayFormat'}      | ${'13 sep 2017'}
      ${18}  | ${'2017-09-13'} | ${'@shortFormat'}          | ${'2017-09-13'}
      ${18}  | ${'2017-09-13'} | ${'@dayFormat'}            | ${'13'}
      ${18}  | ${'2017-09-13'} | ${'@timeFormat'}           | ${'00:00'}
      ${18}  | ${'2017-09-13'} | ${'@monthShortNameFormat'} | ${'sep'}
      ${18}  | ${'2017-09-13'} | ${'@dayMonthYearFormat'}   | ${'13 sep 2017'}
      ${3}   | ${'2017-09-13'} | ${'@longFormat'}           | ${'on. 13 sep 2017'}
      ${3}   | ${'2017-09-13'} | ${'@longNoDayFormat'}      | ${'13 sep 2017'}
      ${3}   | ${'2017-09-13'} | ${'@shortFormat'}          | ${'13.09.2017'}
      ${3}   | ${'2017-09-13'} | ${'@dayFormat'}            | ${'13.'}
      ${3}   | ${'2017-09-13'} | ${'@timeFormat'}           | ${'00:00'}
      ${3}   | ${'2017-09-13'} | ${'@monthShortNameFormat'} | ${'sep.'}
      ${3}   | ${'2017-09-13'} | ${'@dayMonthYearFormat'}   | ${'13 sep 2017'}
      ${11}  | ${'2017-09-13'} | ${'@longFormat'}           | ${'ons 13 sep 2017'}
      ${11}  | ${'2017-09-13'} | ${'@longNoDayFormat'}      | ${'13 sep 2017'}
      ${11}  | ${'2017-09-13'} | ${'@shortFormat'}          | ${'13-09-2017'}
      ${11}  | ${'2017-09-13'} | ${'@dayFormat'}            | ${'13'}
      ${11}  | ${'2017-09-13'} | ${'@timeFormat'}           | ${'00:00'}
      ${11}  | ${'2017-09-13'} | ${'@monthShortNameFormat'} | ${'sep'}
      ${11}  | ${'2017-09-13'} | ${'@dayMonthYearFormat'}   | ${'13 sep 2017'}
      ${15}  | ${'2017-09-13'} | ${'@longFormat'}           | ${'ke 13.9.2017'}
      ${15}  | ${'2017-09-13'} | ${'@longNoDayFormat'}      | ${'13.9.2017'}
      ${15}  | ${'2017-09-13'} | ${'@shortFormat'}          | ${'13.9.2017'}
      ${15}  | ${'2017-09-13'} | ${'@dayFormat'}            | ${'13'}
      ${15}  | ${'2017-09-13'} | ${'@timeFormat'}           | ${'0:00'}
      ${15}  | ${'2017-09-13'} | ${'@monthShortNameFormat'} | ${'syys'}
      ${15}  | ${'2017-09-13'} | ${'@dayMonthYearFormat'}   | ${'13 syys 2017'}
    `(
      'returns $expected for siteId $siteId with $date and $format',
      ({ siteId, date, format, expected }) => {
        expect(validateAndFormatDate(date, { siteId }, format)).toBe(expected);
      }
    );
  });

  describe('getDaysShortForSiteId', () => {
    test('returns null for non-existant siteId', () => {
      expect(getDaysShortForSiteId(23)).toBe(null);
    });

    test.each`
      siteId | days
      ${1}   | ${['mån', 'tis', 'ons', 'tors', 'fre', 'lör', 'sön']}
      ${18}  | ${['mån', 'tis', 'ons', 'tors', 'fre', 'lör', 'sön']}
      ${3}   | ${['ma.', 'ti.', 'on.', 'to.', 'fr.', 'lø.', 'sø.']}
      ${11}  | ${['man', 'tir', 'ons', 'tor', 'fre', 'lør', 'søn']}
      ${15}  | ${['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su']}
    `('returns $days for siteId $siteId', ({ siteId, days }) => {
      expect(getDaysShortForSiteId(siteId)).toStrictEqual(days);
    });
  });

  describe('getMonthNamesForSiteId', () => {
    test('returns null for non-existant siteId', () => {
      expect(getMonthNamesForSiteId(23)).toBe(null);
    });

    test.each`
      siteId | months
      ${1}   | ${['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']}
      ${18}  | ${['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']}
      ${3}   | ${['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']}
      ${11}  | ${['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december']}
      ${15}  | ${['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu']}
    `('returns $months for siteId $siteId', ({ siteId, months }) => {
      expect(getMonthNamesForSiteId(siteId)).toStrictEqual(months);
    });
  });

  describe('getDuration', () => {
    test('Handles minutes and seconds', () => {
      // Duration is tested in duration tests
      expect(
        getDuration('2019-12-07T08:30:38', '2019-12-07T08:35:43', 1)
      ).toStrictEqual({
        raw: '00:05:00',
        hours: 0,
        minutes: 5,
        seconds: 0,
        display: `0 tim 5 min`,
      });
    });
  });

  describe('getNumberOfDaysString', () => {
    test('it returns null if no numberOfDays or non-existant siteId', () => {
      expect(getNumberOfDaysString(undefined, 1)).toBe(null);
      expect(getNumberOfDaysString(1, 23)).toBe(null);
    });

    test.each`
      siteId       | numberOfDays | result
      ${undefined} | ${1}         | ${`1 ${textsPerSiteId[1].day}`}
      ${undefined} | ${2}         | ${`2 ${textsPerSiteId[1].days}`}
      ${1}         | ${1}         | ${`1 ${textsPerSiteId[1].day}`}
      ${1}         | ${2}         | ${`2 ${textsPerSiteId[1].days}`}
      ${18}        | ${1}         | ${`1 ${textsPerSiteId[18].day}`}
      ${18}        | ${2}         | ${`2 ${textsPerSiteId[18].days}`}
      ${3}         | ${1}         | ${`1 ${textsPerSiteId[3].day}`}
      ${3}         | ${2}         | ${`2 ${textsPerSiteId[3].days}`}
      ${11}        | ${1}         | ${`1 ${textsPerSiteId[11].day}`}
      ${11}        | ${2}         | ${`2 ${textsPerSiteId[11].days}`}
      ${15}        | ${1}         | ${`1 ${textsPerSiteId[15].day}`}
      ${15}        | ${2}         | ${`2 ${textsPerSiteId[15].days}`}
    `(
      'returns $result for $siteId and $numberOfDays',
      ({ siteId, numberOfDays, result }) => {
        expect(getNumberOfDaysString(numberOfDays, siteId)).toBe(result);
      }
    );
  });

  describe('getDpDurationInWeeksFromDays', () => {
    test('it returns null if no numberOfDays or non-existant siteId', () => {
      expect(getDpDurationInWeeksFromDays(undefined, 1)).toBe(null);
      expect(getDpDurationInWeeksFromDays(1, 23)).toBe(null);
    });

    test.each`
      siteId       | result
      ${undefined} | ${`1 ${textsPerSiteId[1].day}`}
      ${1}         | ${`1 ${textsPerSiteId[1].day}`}
      ${3}         | ${`1 ${textsPerSiteId[3].day}`}
      ${11}        | ${`1 ${textsPerSiteId[11].day}`}
      ${15}        | ${`1 ${textsPerSiteId[15].day}`}
      ${18}        | ${`1 ${textsPerSiteId[18].day}`}
    `('returns $result for $siteId with one day trip', ({ siteId, result }) => {
      expect(getDpDurationInWeeksFromDays(1, siteId)).toBe(result);
    });

    test.each`
      siteId | result
      ${1}   | ${`1 ${textsPerSiteId[1].week}`}
      ${3}   | ${`1 ${textsPerSiteId[3].week}`}
      ${11}  | ${`1 ${textsPerSiteId[11].week}`}
      ${15}  | ${`1 ${textsPerSiteId[15].week}`}
      ${18}  | ${`1 ${textsPerSiteId[18].week}`}
    `(
      'returns $result for $siteId with one week trip',
      ({ siteId, result }) => {
        expect(getDpDurationInWeeksFromDays(8, siteId)).toBe(result);
      }
    );

    test.each`
      siteId | result
      ${1}   | ${`2 ${textsPerSiteId[1].weeks}`}
      ${3}   | ${`2 ${textsPerSiteId[3].weeks}`}
      ${11}  | ${`2 ${textsPerSiteId[11].weeks}`}
      ${15}  | ${`2 ${textsPerSiteId[15].weeks}`}
      ${18}  | ${`2 ${textsPerSiteId[18].weeks}`}
    `('returns $result for $siteId with 15 day trip', ({ siteId, result }) => {
      expect(getDpDurationInWeeksFromDays(15, siteId)).toBe(result);
    });

    test.each`
      siteId | result
      ${1}   | ${`16 ${textsPerSiteId[1].days}`}
      ${3}   | ${`16 ${textsPerSiteId[3].days}`}
      ${11}  | ${`16 ${textsPerSiteId[11].days}`}
      ${15}  | ${`16 ${textsPerSiteId[15].days}`}
      ${18}  | ${`16 ${textsPerSiteId[18].days}`}
    `('returns $result for $siteId with 16 day trip', ({ siteId, result }) => {
      expect(getDpDurationInWeeksFromDays(16, siteId)).toBe(result);
    });
  });

  describe('getDurationInWeekFromDays', () => {
    test('it returns null if no numberOfDays or non-existant siteId', () => {
      expect(getDurationInWeekFromDays(undefined, 1)).toBe(null);
      expect(getDurationInWeekFromDays(1, 23)).toBe(null);
    });

    test.each`
      siteId       | result
      ${undefined} | ${`1 ${textsPerSiteId[1].day}`}
      ${1}         | ${`1 ${textsPerSiteId[1].day}`}
      ${3}         | ${`1 ${textsPerSiteId[3].day}`}
      ${11}        | ${`1 ${textsPerSiteId[11].day}`}
      ${15}        | ${`1 ${textsPerSiteId[15].day}`}
      ${18}        | ${`1 ${textsPerSiteId[18].day}`}
    `('returns $result for $siteId with one day trip', ({ siteId, result }) => {
      expect(getDurationInWeekFromDays(1, siteId)).toBe(result);
    });

    test.each`
      siteId | result
      ${1}   | ${`1 ${textsPerSiteId[1].week}`}
      ${3}   | ${`1 ${textsPerSiteId[3].week}`}
      ${11}  | ${`1 ${textsPerSiteId[11].week}`}
      ${15}  | ${`1 ${textsPerSiteId[15].week}`}
      ${18}  | ${`1 ${textsPerSiteId[18].week}`}
    `(
      'returns $result for $siteId with one "week" (9 days) trip',
      ({ siteId, result }) => {
        expect(getDurationInWeekFromDays(9, siteId)).toBe(result);
      }
    );

    test.each`
      siteId | result
      ${1}   | ${`2 ${textsPerSiteId[1].weeks}`}
      ${3}   | ${`2 ${textsPerSiteId[3].weeks}`}
      ${11}  | ${`2 ${textsPerSiteId[11].weeks}`}
      ${15}  | ${`2 ${textsPerSiteId[15].weeks}`}
      ${18}  | ${`2 ${textsPerSiteId[18].weeks}`}
    `(
      'returns $result for $siteId with two "week" (18 days) trip',
      ({ siteId, result }) => {
        expect(getDurationInWeekFromDays(18, siteId)).toBe(result);
      }
    );

    test.each`
      siteId | result
      ${1}   | ${`3 ${textsPerSiteId[1].weeks}`}
      ${3}   | ${`3 ${textsPerSiteId[3].weeks}`}
      ${11}  | ${`3 ${textsPerSiteId[11].weeks}`}
      ${15}  | ${`3 ${textsPerSiteId[15].weeks}`}
      ${18}  | ${`3 ${textsPerSiteId[18].weeks}`}
    `(
      'returns $result for $siteId with three "week" (25 days) trip',
      ({ siteId, result }) => {
        expect(getDurationInWeekFromDays(25, siteId)).toBe(result);
      }
    );

    test.each`
      siteId | result
      ${1}   | ${`4 ${textsPerSiteId[1].weeks}`}
      ${3}   | ${`4 ${textsPerSiteId[3].weeks}`}
      ${11}  | ${`4 ${textsPerSiteId[11].weeks}`}
      ${15}  | ${`4 ${textsPerSiteId[15].weeks}`}
      ${18}  | ${`4 ${textsPerSiteId[18].weeks}`}
    `(
      'returns $result for $siteId with four "week" (32 days) trip',
      ({ siteId, result }) => {
        expect(getDurationInWeekFromDays(32, siteId)).toBe(result);
      }
    );

    test.each`
      siteId | duration | result
      ${1}   | ${4}     | ${`4 ${textsPerSiteId[1].days}`}
      ${1}   | ${35}    | ${`35 ${textsPerSiteId[1].days}`}
      ${3}   | ${4}     | ${`4 ${textsPerSiteId[3].days}`}
      ${3}   | ${35}    | ${`35 ${textsPerSiteId[3].days}`}
      ${11}  | ${4}     | ${`4 ${textsPerSiteId[11].days}`}
      ${11}  | ${35}    | ${`35 ${textsPerSiteId[11].days}`}
      ${15}  | ${4}     | ${`4 ${textsPerSiteId[15].days}`}
      ${15}  | ${35}    | ${`35 ${textsPerSiteId[15].days}`}
      ${18}  | ${4}     | ${`4 ${textsPerSiteId[18].days}`}
      ${18}  | ${35}    | ${`35 ${textsPerSiteId[18].days}`}
    `(
      'returns $result for $siteId with $duration days trip',
      ({ siteId, duration, result }) => {
        expect(getDurationInWeekFromDays(duration, siteId)).toBe(result);
      }
    );
  });
});
