import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

console.log('setting');
const gateway = new ApolloGateway({
  serviceList: [{ name: 'team3', url: 'http://localhost:4001' }],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
