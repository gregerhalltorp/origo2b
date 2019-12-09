import { formatDateForBH2, validateAndFormatDate } from '..';
import { validate } from '@babel/types';

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

    test('handles all valid representations', () => {
      [
        '2019-12-07',
        '2019-12-07T08:30:38',
        '2019-12-07T08:30:38Z',
        '2019-12-07T08:30:38.851',
        '2019-12-07T08:30:38.851Z',
        '2019-12-07T08:30:38.8517667',
        '2019-12-07T08:30:38.8517667Z',
        '07-2019-12',
      ].forEach(representation => {
        expect(
          validateAndFormatDate(representation, { siteId: 1 }, 'YYYY-MM-DD')
        ).toBe('2019-12-07');
      });
    });

    test.each`
      siteId | date            | format                     | expected
      ${1}   | ${'2017-09-13'} | ${'@longFormat'}           | ${'ons 13 sep 2017'}
      ${1}   | ${'2017-09-13'} | ${'@longNoDayFormat'}      | ${'13 sep 2017'}
      ${1}   | ${'2017-09-13'} | ${'@shortFormat'}          | ${'2017-09-13'}
      ${1}   | ${'2017-09-13'} | ${'@dayFormat'}            | ${'13'}
      ${1}   | ${'2017-09-13'} | ${'@timeFormat'}           | ${'00:00'}
      ${1}   | ${'2017-09-13'} | ${'@monthShortNameFormat'} | ${'sep'}
      ${1}   | ${'2017-09-13'} | ${'@dayMonthYearFormat'}   | ${'13 sep 2017'}
      ${18}   | ${'2017-09-13'} | ${'@longFormat'}           | ${'ons 13 sep 2017'}
      ${18}   | ${'2017-09-13'} | ${'@longNoDayFormat'}      | ${'13 sep 2017'}
      ${18}   | ${'2017-09-13'} | ${'@shortFormat'}          | ${'2017-09-13'}
      ${18}   | ${'2017-09-13'} | ${'@dayFormat'}            | ${'13'}
      ${18}   | ${'2017-09-13'} | ${'@timeFormat'}           | ${'00:00'}
      ${18}   | ${'2017-09-13'} | ${'@monthShortNameFormat'} | ${'sep'}
      ${18}   | ${'2017-09-13'} | ${'@dayMonthYearFormat'}   | ${'13 sep 2017'}
      ${3}   | ${'2017-09-13'} | ${'@longFormat'}           | ${'on. 13 sep 2017'}
      ${3}   | ${'2017-09-13'} | ${'@longNoDayFormat'}      | ${'13 sep 2017'}
      ${3}   | ${'2017-09-13'} | ${'@shortFormat'}          | ${'13.09.2017'}
      ${3}   | ${'2017-09-13'} | ${'@dayFormat'}            | ${'13.'}
      ${3}   | ${'2017-09-13'} | ${'@timeFormat'}           | ${'00:00'}
      ${3}   | ${'2017-09-13'} | ${'@monthShortNameFormat'} | ${'sep.'}
      ${3}   | ${'2017-09-13'} | ${'@dayMonthYearFormat'}   | ${'13 sep 2017'}
      ${11}   | ${'2017-09-13'} | ${'@longFormat'}           | ${'ons 13 sep 2017'}
      ${11}   | ${'2017-09-13'} | ${'@longNoDayFormat'}      | ${'13 sep 2017'}
      ${11}   | ${'2017-09-13'} | ${'@shortFormat'}          | ${'13-09-2017'}
      ${11}   | ${'2017-09-13'} | ${'@dayFormat'}            | ${'13'}
      ${11}   | ${'2017-09-13'} | ${'@timeFormat'}           | ${'00:00'}
      ${11}   | ${'2017-09-13'} | ${'@monthShortNameFormat'} | ${'sep'}
      ${11}   | ${'2017-09-13'} | ${'@dayMonthYearFormat'}   | ${'13 sep 2017'}
      ${15}   | ${'2017-09-13'} | ${'@longFormat'}           | ${'ke 13.9.2017'}
      ${15}   | ${'2017-09-13'} | ${'@longNoDayFormat'}      | ${'13.9.2017'}
      ${15}   | ${'2017-09-13'} | ${'@shortFormat'}          | ${'13.9.2017'}
      ${15}   | ${'2017-09-13'} | ${'@dayFormat'}            | ${'13'}
      ${15}   | ${'2017-09-13'} | ${'@timeFormat'}           | ${'0:00'}
      ${15}   | ${'2017-09-13'} | ${'@monthShortNameFormat'} | ${'syys'}
      ${15}   | ${'2017-09-13'} | ${'@dayMonthYearFormat'}   | ${'13 syys 2017'}
    `(
      'returns $expected for siteId $siteId with $date and $format',
      ({ siteId, date, format, expected }) => {
        expect(validateAndFormatDate(date, { siteId }, format)).toBe(expected);
      }
    );
  });
});