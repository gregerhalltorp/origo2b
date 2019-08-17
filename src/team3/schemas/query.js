import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    aliveTeam3: String
  }
`;

const resolvers = {
  Query: {
    aliveTeam3: () => 'Hello, Team3',
  },
};

export default [{ typeDefs, resolvers }];
