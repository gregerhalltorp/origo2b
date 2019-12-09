// import parseDuration from '..';
import { durationHelper, getDurationFromMinutes, texts } from '..';

describe('duration', () => {
  describe('durationHelper', () => {
    const helperFunction = (siteId, string, hours, minutes, seconds) => {
      expect(durationHelper(string, siteId)).toStrictEqual({
        raw: string,
        hours,
        minutes,
        seconds,
        display: `${hours} ${texts[siteId].hour} ${minutes} ${texts[siteId].minute}`,
      });
    };

    test('throws on wrong input string format', () => {
      expect(() => {
        durationHelper('some string');
      }).toThrow(/wrong format/);
    });

    test('throws on siteId left out', () => {
      expect(() => {
        durationHelper('01:04:00');
      }).toThrow(/Invalid siteId/);
    });

    test('throws on wrong siteId', () => {
      expect(() => {
        durationHelper('01:04:00', 23);
      }).toThrow(/Invalid siteId/);
    });

    test('handles empty stringInput', () => {
      expect(durationHelper('', 1)).toStrictEqual({ display: '' });
    });

    test('formats swedish duration', () => {
      [1, 18].forEach(siteId => {
        helperFunction(siteId, '06:10:00', 6, 10, 0);
      });
    });

    test('formats norwegian duration', () => {
      helperFunction(3, '06:10:00', 6, 10, 0);
    });

    test('formats danish duration', () => {
      helperFunction(11, '06:10:00', 6, 10, 0);
    });

    test('formats finish duration', () => {
      helperFunction(15, '06:10:00', 6, 10, 0);
    });
  });

  describe('getDurationFromMinutes', () => {
    const helperFunction = (
      minutesIn,
      siteId,
      raw,
      hours,
      minutes,
      seconds
    ) => {
      expect(getDurationFromMinutes(minutesIn, siteId)).toStrictEqual({
        raw,
        hours,
        minutes,
        seconds,
        display: `${hours} ${texts[siteId].hour} ${minutes} ${texts[siteId].minute}`,
      });
    };

    test('throws when minutesIn is not a number', () => {
      expect(() => {
        getDurationFromMinutes('alsdfkj', 1);
      }).toThrow(/wrong format/);
    });

    test('throws on siteId left out', () => {
      expect(() => {
        getDurationFromMinutes('44');
      }).toThrow(/Invalid siteId/);
    });

    test('throws on wrong siteId', () => {
      expect(() => {
        getDurationFromMinutes('44', 23);
      }).toThrow(/Invalid siteId/);
    });

    test('returns correct for sub-hour span, Sweden', () => {
      [1, 18].forEach(siteId => {
        helperFunction(44, siteId, '00:44:00', 0, 44, 0);
      });
    });

    test('returns correct for sub-hour span, Norway', () => {
      helperFunction(44, 3, '00:44:00', 0, 44, 0);
    });

    test('returns correct for sub-hour span, Denmark', () => {
      helperFunction(44, 11, '00:44:00', 0, 44, 0);
    });

    test('returns correct for sub-hour span, Finland', () => {
      helperFunction(44, 15, '00:44:00', 0, 44, 0);
    });

    test('returns correct for medium span, Sweden', () => {
      [1, 18].forEach(siteId => {
        helperFunction(307, siteId, '05:07:00', 5, 7, 0);
      });
    });

    test('returns correct for medium span, Norway', () => {
      helperFunction(307, 3, '05:07:00', 5, 7, 0);
    });

    test('returns correct for medium span, Denmark', () => {
      helperFunction(307, 11, '05:07:00', 5, 7, 0);
    });

    test('returns correct for medium span, Finland', () => {
      helperFunction(307, 15, '05:07:00', 5, 7, 0);
    });

    test('returns correct for long span, Sweden', () => {
      [1, 18].forEach(siteId => {
        helperFunction(2547, siteId, '42:27:00', 42, 27, 0);
      });
    });

    test('returns correct for long span, Norway', () => {
      helperFunction(2547, 3, '42:27:00', 42, 27, 0);
    });

    test('returns correct for long span, Denmark', () => {
      helperFunction(2547, 11, '42:27:00', 42, 27, 0);
    });

    test('returns correct for long span, Finland', () => {
      helperFunction(2547, 15, '42:27:00', 42, 27, 0);
    });
  });
});
