import { gql } from 'apollo-server';
import { validateAndFormatDate } from '@tcne/origo-utils/date';

const typeDefs = gql`
  # Date according to general requirements
  type Date {
    # e.g. Mån 11 sep 2017
    long: String
    # e.g. 11 sep 2017
    longNoDay: String

    # Without day name e.g. 11 sep 2017
    short: String

    # e.g. 11
    day: String
    # e.g. Ons
    dayShortName: String
    # e.g. sep
    monthShortName: String
    # e.g. 2017
    year: String
    # Time as a tring e.g. 12:00
    time: String

    # e.g. 3
    month: String

    # Url date e.g. 20121028
    url: String

    # 2018-03-14T18:20:00
    raw: String
  }
`;

// export default [{
export default [
  {
    typeDefs,
    resolvers: {
      Date: {
        long: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, '@longFormat'),
        longNoDay: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, '@longNoDayFormat'),
        short: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, '@shortFormat'),
        day: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, '@dayFormat'),
        dayShortName: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, 'ddd'),
        monthShortName: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, '@monthShortNameFormat'),
        year: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, 'Y'),
        month: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, 'M'),
        time: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, '@timeFormat'),
        url: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, 'YYYYMMDD'),
        raw: (value, _, { marketUnit }) =>
          validateAndFormatDate(value, marketUnit, 'YYYY-MM-DDTHH:mm:ss'),
      },
    },
  },
];
