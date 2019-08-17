import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    aliveTeamCRM: String
  }
`;

const resolvers = {
  Query: {
    aliveTeamCRM: () => 'Hello, Team CRM',
  },
};

export default [{ typeDefs, resolvers }];
