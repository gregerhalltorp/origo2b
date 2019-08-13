const { ApolloServer, gql } = require('apollo-server');
const BH2DataSource = require('./datasources/booking.js');
const schema = require('./team3/schemas');
const resolverMappings = require('./team3/resolvers');
const mergeResolvers = require('./utils/mergeResolvers');

const resolvers = mergeResolvers(
  {
    Query: {
      alive: () => 'Hello',
    },
  },
  resolverMappings
);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => {
    return {
      BH2: new BH2DataSource(),
    };
  },
  tracing: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
