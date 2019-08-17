import parseDuration from '..';

describe('Duration', () => {
  it('formats swedish duration', () => {
    expect(parseDuration('06:10:00', 1)).to.eql({
      raw: '06:10:00',
      hours: 6,
      minutes: 10,
      seconds: 0,
      display: '6 tim 10 min',
    });
  });

  it('formats norwegian duration', () => {
    expect(parseDuration('06:10:00', 3)).to.eql({
      raw: '06:10:00',
      hours: 6,
      minutes: 10,
      seconds: 0,
      display: '6 t 10 min',
    });
  });

  it('formats danish duration', () => {
    expect(parseDuration('06:10:00', 11)).to.eql({
      raw: '06:10:00',
      hours: 6,
      minutes: 10,
      seconds: 0,
      display: '6 t. 10 min',
    });
  });

  it('formats finish duration', () => {
    expect(parseDuration('06:10:00', 15)).to.eql({
      raw: '06:10:00',
      hours: 6,
      minutes: 10,
      seconds: 0,
      display: '6 h 10 min',
    });
  });

  it('throws on bad format', () => {
    expect(() => parseDuration('06a:10:00', 15)).to.throw('Bad formated string 06a:10:00');
  });

  it('throws on wrong siteId', () => {
    [2, '2', 'asd', true, false, [], {}].forEach((siteId) => {
      expect(() => parseDuration('06:10:00', siteId)).to.throw('Invalid siteId');
    });
  });
});
