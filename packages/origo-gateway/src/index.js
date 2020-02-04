/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

// TODO: Bör denna hårdkodning tas bort?
// Vore bra att kunna deploya en ny service utan att behöva deploya gateway samtidigt
// Men: då måste det finnas ett sätt att starta om så att ny config laddas in. Värt att undersöka
// TODO: skapa config för urlar i olika miljöer

// const gateway = new ApolloGateway({
//   serviceList: [
//     { name: 'booking', url: 'http://localhost:4001' },
//     { name: 'search', url: 'http://localhost:4002' },
//     // { name: 'payments', url: 'http://localhost:4002' },
//   ],
//   debug: true,
// });
const gateway = new ApolloGateway();

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  // tracing: true,
  // context: ({ req }) => {
  //   console.log(req.headers);
  //   return {};
  // },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
