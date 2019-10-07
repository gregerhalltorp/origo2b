import { gql } from 'apollo-server';
import * as r from '../resolvers';

const typeDefs = gql`
  type Query {
    hotelwebHotel(wvId: ID): HotelwebHotel
  }

  type HotelwebHotel @key(fields: "wvId") {
    wvId: ID!
    name: String
  }
`;

const resolvers = {
  Query: {
    hotelwebHotel: r.hotelwebHotelResolver,
  },
  // Booking: {
  //   __resolveReference(b, { dataSources }) {
  //     return dataSources.BH2.getBooking(b.id);
  //   },
  //   id: ({ bookingId }) => bookingId,
  // },
};

export default [{ typeDefs, resolvers }];
