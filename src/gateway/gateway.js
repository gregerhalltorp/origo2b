/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'team1', url: 'http://localhost:4003' }, // Todo: skapa config för urlar i olika miljöer?
    { name: 'team3', url: 'http://localhost:4001' },
    { name: 'teamCRM', url: 'http://localhost:4002' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  tracing: true,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
