import { gql } from '@tcne/origo-server';
import { bookingResolver, extraGroupsResolver, passengersResolver } from '../resolvers';

const typeDefs = gql`
  type Query {
    booking(id: ID!, modelVersion: ID): Booking
  }

  type Booking @key(fields: "id") {
    id: ID!
    modelVersion: Int
    isThisWorking: Boolean
    passengers: [Passenger]
    extraGroups(views: [ID]!, extraGroupKeys: [ID]): [PassengerExtraGroup]
  }

  type Passenger {
    id: ID!
    firstName: String
    lastName: String
    name: String
    age: PassengerAge
    number: Int
    gender: String
    leadPassenger: Boolean
  }

  type PassengerAge {
    value: Int
    category: PassengerAgeCategory
    dateOfBirth: String
    # Correct 6 digit format for market unit
    dateOfBirthLocale: String
  }

  enum PassengerAgeCategory {
    ADULT
    YOUTH
    CHILD
    INFANT
  }

  type PassengerExtraGroup {
    id: ID!
    groupKey: ID!
    groupCode: ID!
    groupName: String!
  }
`;

const resolvers = {
  Query: {
    booking: bookingResolver,
  },
  Booking: {
    __resolveReference(b, { dataSources }) {
      console.log('__resolveReference');
      return dataSources.BH2.getBooking(b.id);
    },
    isThisWorking: () => true,
    id: ({ bookingId }) => bookingId,
    passengers: passengersResolver,
    extraGroups: extraGroupsResolver,
  },
};

export default [{ typeDefs, resolvers }];
