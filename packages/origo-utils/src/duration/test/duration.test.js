// import parseDuration from '..';
import { durationHelper, texts } from '..';

describe('duration', () => {
  describe('durationHelper', () => {
    const helperFunction = siteId => {
      expect(durationHelper('06:10:00', siteId)).toStrictEqual({
        raw: '06:10:00',
        hours: 6,
        minutes: 10,
        seconds: 0,
        display: `6 ${texts[siteId].hour} 10 ${texts[siteId].minute}`,
      });
    };

    it('throws on wrong input string format', () => {
      expect(() => {
        durationHelper('some string');
      }).toThrow(/wrong format/);
    });

    it('throws on siteId left out', () => {
      expect(() => {
        durationHelper('01:04:00');
      }).toThrow(/Invalid siteId/);
    });

    it('throws on wrong siteId', () => {
      expect(() => {
        durationHelper('01:04:00', 23);
      }).toThrow(/Invalid siteId/);
    });

    it('formats swedish duration', () => {
      [1, 18].forEach(siteId => {
        helperFunction(siteId);
      });
      // helperFunction(1);
    });

    it('formats norwegian duration', () => {
      helperFunction(3);
    });

    it('formats danish duration', () => {
      helperFunction(11);
    });

    it('formats finish duration', () => {
      helperFunction(15);
    });
  });
});
