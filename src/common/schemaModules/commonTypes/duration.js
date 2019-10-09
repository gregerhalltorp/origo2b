import { gql } from 'apollo-server';
import durationHelper from '../../utils/duration';

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


export default [{
  typeDefs,
  resolvers: {
    Duration: {
      hours: (value, _, { marketUnit }) => durationHelper(value, marketUnit.code).hours,
      minutes: (value, _, { marketUnit }) => durationHelper(value, marketUnit.code).minutes,
      seconds: (value, _, { marketUnit }) => durationHelper(value, marketUnit.code).seconds,
      display: (value, _, { marketUnit }) => durationHelper(value, marketUnit.code).display,
      raw: (value, _, { marketUnit }) => durationHelper(value, marketUnit.code).raw,
    },
  },
}];
