import moment from './extendedMoment';
import { getDurationFromMinutes } from '../duration';
import siteInfos from './siteInfos';
import textsPerSiteId from './textsPerSiteId';

export { moment, siteInfos };

// This function deprecated - use validateAndFormatDate instead
// export default (dateInput, siteId, format) => {
//   if (!dateInput) {
//     return {};
//   }

//   const siteInfo = siteInfos[siteId];
//   moment.locale(siteInfo.locale);
//   const date = moment(dateInput, format);
//   if (!date.isValid) {
//     throw new Error('Invalid date');
//   }
//   if (!siteInfo) {
//     throw new Error('Invalid siteId');
//   }
//   date.locale(siteInfo.locale);
//   return {
//     long: date.format(siteInfo.longFormat),
//     longNoDay: date.format(siteInfo.longNoDayFormat),
//     short: date.format(siteInfo.shortFormat),
//     day: date.format(siteInfo.dayFormat),
//     dayShortName: date.format('ddd'),
//     monthShortName: date.format(siteInfo.monthShortNameFormat),
//     year: date.format('Y'),
//     month: date.format('M'),
//     time: date.format(siteInfo.timeFormat),
//     url: date.format('YYYYMMDD'),
//     raw: date.format('YYYY-MM-DDTHH:mm:ss'),
//     dayMonthYearFormat: date.format(siteInfo.dayMonthYearFormat),
//   };
// };

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

export const getDuration = (
  fromDateString,
  toDateString,
  siteId,
  format = undefined
) => {
  const fromDate = moment(fromDateString, format);
  const toDate = moment(toDateString, format);
  const duration = moment.duration(toDate.diff(fromDate));
  return getDurationFromMinutes(Math.round(duration.asMinutes()), siteId);
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
  // From momentjs.com: As of 2.13.0 you can pass a bool as the first parameter of the weekday functions.
  // If true, the weekdays will be returned in locale specific order.
  return moment.weekdaysShort(true);
};

export function validateAndFormatDate(value, marketUnit, format) {
  const allowedRepresentations = [
    'YYYY-MM-DD',
    'YYYY-MM-DDTHH:mm:ss',
    'YYYY-MM-DDTHH:mm:ssZ',
    'YYYY-MM-DDTHH:mm:ss.SSS',
    'YYYY-MM-DDTHH:mm:ss.SSSZ',
    'YYYY-MM-DDTHH:mm:ss.SSSSSSS',
    'YYYY-MM-DDTHH:mm:ss.SSSSSSSZ',
    'DD-YYYY-MM',
  ];
  const siteId = marketUnit && marketUnit.siteId;
  if (!siteId) {
    throw new Error('Invalid marketUnit');
  }

  const siteInfo = siteInfos[siteId];

  if (!siteInfo) {
    throw new Error('Invalid siteId');
  }

  moment.locale(siteInfo.locale);
  // Moment warns about not passing a representation for the date
  // The third boolean induces strict mode and this will apparently
  // be made mandatory in a future release
  const date = moment(value, allowedRepresentations, true);

  if (!date.isValid()) {
    throw new Error(
      `Invalid date - 
         check that the input value representation is present in the array 
         of allowed datetime representations in 
         origo-utils/src/date/index.js/validateAndFormatDate`
    );
  }
  date.locale(siteInfo.locale);

  if (format.substr(0, 1) === '@') {
    return date.format(siteInfo[format.substr(1)]);
  }

  return date.format(format);
}

export const formatDateForBH2 = value =>
  moment(value, ['YYYYMMDD', 'D.M.YYYY', 'D-M-YYYY', 'YYYY-M-D']).format(
    'YYYY-MM-DD'
  );
