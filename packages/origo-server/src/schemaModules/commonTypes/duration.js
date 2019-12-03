import { gql } from 'apollo-server';
import { durationHelper } from '@tcne/origo-utils/duration';

const typeDefs = gql`
  # Duration according to general requirements
  type Duration {
    hours: Int
    minutes: Int
    seconds: Int
    display: String
    raw: String
  }
`;

export default [
  {
    typeDefs,
    resolvers: {
      Duration: {
        hours: (value, _, { marketUnit }) =>
          durationHelper(value, marketUnit.siteId).hours,
        minutes: (value, _, { marketUnit }) =>
          durationHelper(value, marketUnit.siteId).minutes,
        seconds: (value, _, { marketUnit }) =>
          durationHelper(value, marketUnit.siteId).seconds,
        display: (value, _, { marketUnit }) =>
          durationHelper(value, marketUnit.siteId).display,
        raw: (value, _, { marketUnit }) =>
          durationHelper(value, marketUnit.siteId).raw,
      },
    },
  },
];
