import { gql } from 'apollo-server';
import { bookingResolver, extraGroupsResolver, passengersResolver } from '../resolvers/booking';

const booking = gql`
  type Booking {
    id: ID!
    modelVersion: Int
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

const query = gql`
  extend type Query {
    booking(id: ID!, modelVersion: ID): Booking
  }
`;

export const schema = [booking, query];

export const resolverMappings = [
  {
    Query: {
      booking: bookingResolver,
    },
    Booking: {
      passengers: passengersResolver,
      extraGroups: extraGroupsResolver,
    },
  },
];
