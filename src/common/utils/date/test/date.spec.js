import formatDate from '..';

describe('Date', () => {
  it('formats swedish date', () => {
    expect(formatDate('2017-09-11', 1)).to.eql({
      long: 'mån 11 sep 2017',
      short: '2017-09-11',
      day: '11',
      dayShortName: 'mån',
      monthShortName: 'sep',
      year: '2017',
      time: '00:00',
      url: '20170911',
      raw: '2017-09-11T00:00:00',
    });
  });

  it('formats swedish date weird format', () => {
    expect(formatDate('11-2017-09', 1, 'D-Y-MM')).to.eql({
      long: 'mån 11 sep 2017',
      short: '2017-09-11',
      day: '11',
      dayShortName: 'mån',
      monthShortName: 'sep',
      year: '2017',
      time: '00:00',
      url: '20170911',
      raw: '2017-09-11T00:00:00',
    });
  });

  it('formats globetrotter date', () => {
    expect(formatDate('2017-09-11', 18)).to.eql({
      long: 'mån 11 sep 2017',
      short: '2017-09-11',
      day: '11',
      dayShortName: 'mån',
      monthShortName: 'sep',
      year: '2017',
      time: '00:00',
      url: '20170911',
      raw: '2017-09-11T00:00:00',
    });
  });

  it('formats globetrotter date weird format', () => {
    expect(formatDate('11-2017-09', 18, 'D-Y-MM')).to.eql({
      long: 'mån 11 sep 2017',
      short: '2017-09-11',
      day: '11',
      dayShortName: 'mån',
      monthShortName: 'sep',
      year: '2017',
      time: '00:00',
      url: '20170911',
      raw: '2017-09-11T00:00:00',
    });
  });

  it('formats norwegian date', () => {
    expect(formatDate('2017-09-11', 3)).to.eql({
      long: 'ma. 11 sep 2017',
      short: '11.09.2017',
      day: '11.',
      dayShortName: 'ma.',
      monthShortName: 'sep.',
      year: '2017',
      time: '00:00',
      url: '20170911',
      raw: '2017-09-11T00:00:00',
    });
  });

  it('formats norwegian date weird format', () => {
    expect(formatDate('11-2017-09', 3, 'D-Y-MM')).to.eql({
      long: 'ma. 11 sep 2017',
      short: '11.09.2017',
      day: '11.',
      dayShortName: 'ma.',
      monthShortName: 'sep.',
      year: '2017',
      time: '00:00',
      url: '20170911',
      raw: '2017-09-11T00:00:00',
    });
  });

  it('formats danish date', () => {
    expect(formatDate('2017-09-11', 11)).to.eql({
      long: 'man 11 sep 2017',
      short: '11-09-2017',
      day: '11',
      dayShortName: 'man',
      monthShortName: 'sep',
      year: '2017',
      time: '00:00',
      url: '20170911',
      raw: '2017-09-11T00:00:00',
    });
  });

  it('formats danish date weird format', () => {
    expect(formatDate('11-2017-09', 11, 'D-Y-MM')).to.eql({
      long: 'man 11 sep 2017',
      short: '11-09-2017',
      day: '11',
      dayShortName: 'man',
      monthShortName: 'sep',
      year: '2017',
      time: '00:00',
      url: '20170911',
      raw: '2017-09-11T00:00:00',
    });
  });

  it('formats finish date', () => {
    expect(formatDate('2017-09-11', 15)).to.eql({
      long: 'ma 11.9.2017',
      short: '11.9.2017',
      day: '11',
      dayShortName: 'ma',
      monthShortName: 'syys',
      year: '2017',
      time: '0:00',
      url: '20170911',
      raw: '2017-09-11T00:00:00',
    });
  });

  it('formats finish date weird format', () => {
    expect(formatDate('11-2017-09', 15, 'D-Y-MM')).to.eql({
      long: 'ma 11.9.2017',
      short: '11.9.2017',
      day: '11',
      dayShortName: 'ma',
      monthShortName: 'syys',
      year: '2017',
      time: '0:00',
      url: '20170911',
      raw: '2017-09-11T00:00:00',
    });
  });
});
