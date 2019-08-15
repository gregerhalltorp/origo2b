/* eslint-disable no-console */

import { ApolloServer } from 'apollo-server';
import BH2DataSource from './datasources/booking';
import schema from './team3/schemas';
import resolverMappings from './team3/resolvers';
import mergeResolvers from './utils/mergeResolvers';

const resolvers = mergeResolvers(
  {
    Query: {
      alive: () => 'Hello',
    },
  },
  resolverMappings,
);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({
    BH2: new BH2DataSource(),
  }),
  tracing: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
