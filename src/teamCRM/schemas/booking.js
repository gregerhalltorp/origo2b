import { gql } from 'apollo-server';
import { paymentResolver } from '../resolvers/booking';

const typeDefs = gql`
  extend type Booking @key(fields: "id") {
    id: ID! @external
    payments: PaymentInfo
  }

  type PaymentInfo {
    finalPaymentDate: Date
    finalAmount: Int!
    # depositDate: Date
    depositAmount: Int
    currencyCode: String
    immediatePayment: Boolean
  }
`;

const resolvers = {
  Booking: {
    payments: paymentResolver,
  },
};

export default [{ typeDefs, resolvers }];
