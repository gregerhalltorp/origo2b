import moment from './extendedMoment';
import { getDurationFromMinutes } from '../duration';

const siteInfos = {
  1: {
    locale: 'sv-tcne',
    longFormat: 'ddd D MMM Y',
    longNoDayFormat: 'D MMM Y',
    shortFormat: 'Y-MM-DD',
    dayFormat: 'D',
    timeFormat: 'HH:mm',
    monthShortNameFormat: 'MMM',
    dayMonthYearFormat: 'D MMM Y',
  },
  3: {
    locale: 'nb-tcne',
    longFormat: 'ddd D MMM Y',
    longNoDayFormat: 'D MMM Y',
    shortFormat: 'DD.MM.Y',
    dayFormat: 'D.',
    timeFormat: 'HH:mm',
    monthShortNameFormat: 'MMM.',
    dayMonthYearFormat: 'D MMM Y',
  },
  11: {
    locale: 'da-tcne',
    longFormat: 'ddd D MMM Y',
    longNoDayFormat: 'D MMM Y',
    shortFormat: 'DD-MM-Y',
    dayFormat: 'D',
    timeFormat: 'HH:mm',
    monthShortNameFormat: 'MMM',
    dayMonthYearFormat: 'D MMM Y',
  },
  15: {
    locale: 'fi-tcne',
    longFormat: 'ddd D.M.Y',
    longNoDayFormat: 'D.M.YYYY',
    shortFormat: 'D.M.Y',
    dayFormat: 'D',
    timeFormat: 'H:mm',
    monthShortNameFormat: 'MMM',
    dayMonthYearFormat: 'D MMM Y',
  },
  18: {
    locale: 'sv-tcne',
    longFormat: 'ddd D MMM Y',
    longNoDayFormat: 'D MMM Y',
    shortFormat: 'Y-MM-DD',
    dayFormat: 'D',
    timeFormat: 'HH:mm',
    monthShortNameFormat: 'MMM',
    dayMonthYearFormat: 'D MMM Y',
  },
};

const textsPerSiteId = {
  1: {
    day: 'dag',
    days: 'dagar',
    week: 'vecka',
    weeks: 'veckor',
    night: 'natt',
    nights: 'nätter',
  },
  3: {
    day: 'dag',
    days: 'dager',
    week: 'uke',
    weeks: 'uker',
    night: 'natt',
    nights: 'netter',
  },
  11: {
    day: 'dag',
    days: 'dage',
    week: 'uge',
    weeks: 'uger',
    night: 'nat',
    nights: 'nætter',
  },
  15: {
    day: 'päivä',
    days: 'päivää',
    week: 'viikko',
    weeks: 'viikkoa',
    night: 'yö',
    nights: 'yötä',
  },
  18: {
    day: 'dag',
    days: 'dagar',
    week: 'vecka',
    weeks: 'veckor',
    night: 'natt',
    nights: 'nätter',
  },
};

export { moment, siteInfos };

export default (dateInput, siteId, format) => {
  if (!dateInput) {
    return {};
  }

  const siteInfo = siteInfos[siteId];
  moment.locale(siteInfo.locale);
  const date = moment(dateInput, format);
  if (!date.isValid) {
    throw new Error('Invalid date');
  }
  if (!siteInfo) {
    throw new Error('Invalid siteId');
  }
  date.locale(siteInfo.locale);
  return {
    long: date.format(siteInfo.longFormat),
    longNoDay: date.format(siteInfo.longNoDayFormat),
    short: date.format(siteInfo.shortFormat),
    day: date.format(siteInfo.dayFormat),
    dayShortName: date.format('ddd'),
    monthShortName: date.format(siteInfo.monthShortNameFormat),
    year: date.format('Y'),
    month: date.format('M'),
    time: date.format(siteInfo.timeFormat),
    url: date.format('YYYYMMDD'),
    raw: date.format('YYYY-MM-DDTHH:mm:ss'),
    dayMonthYearFormat: date.format(siteInfo.dayMonthYearFormat),
  };
};

export const getDurationInWeekFromDays = (duration, siteId = 1) => {
  const texts = textsPerSiteId[siteId];
  if (!duration || !texts) {
    return null;
  }

  if (duration === 1) {
    return `1 ${texts.day}`;
  }
  if (duration < 11 && duration >= 7) {
    return `1 ${texts.week}`;
  }
  if (duration < 19 && duration >= 11) {
    return `2 ${texts.weeks}`;
  }
  if (duration < 26 && duration >= 19) {
    return `3 ${texts.weeks}`;
  }
  if (duration < 33 && duration >= 26) {
    return `4 ${texts.weeks}`;
  }
  return `${duration} ${texts.days}`;
};

export const getDpDurationInWeeksFromDays = (duration, siteId = 1) => {
  const texts = textsPerSiteId[siteId];
  if (!duration || !texts) {
    return null;
  }

  if (duration === 1) {
    return `1 ${texts.day}`;
  }
  if (duration === 8) {
    return `1 ${texts.week}`;
  }
  if (duration % 7 === 1) {
    const numberOfWeeks = (duration - 1) / 7;
    return `${numberOfWeeks} ${texts.weeks}`;
  }
  return `${duration} ${texts.days}`;
};

export const getNumberOfDaysString = (numberOfDays, siteId = 1) => {
  const texts = textsPerSiteId[siteId];
  if (!numberOfDays || !texts) {
    return null;
  }

  if (numberOfDays === 1) {
    return `${numberOfDays} ${texts.day}`;
  }

  return `${numberOfDays} ${texts.days}`;
};

export const getDuration = (fromDateString, toDateString, siteId, format = undefined) => {
  const fromDate = moment(fromDateString, format);
  const toDate = moment(toDateString, format);
  const duration = moment.duration(toDate.diff(fromDate));
  return getDurationFromMinutes(duration.asMinutes(), siteId);
};

export const getMonthNamesForSiteId = siteId => {
  const siteInfo = siteInfos[siteId];
  if (!siteInfo) {
    return null;
  }
  moment.locale(siteInfo.locale);
  return moment.months();
};

export const getDaysShortForSiteId = siteId => {
  const siteInfo = siteInfos[siteId];
  if (!siteInfo) {
    return null;
  }
  moment.locale(siteInfo.locale);
  const sundayFirst = moment.weekdaysShort();
  return [...sundayFirst.splice(1), sundayFirst[0]];
};
