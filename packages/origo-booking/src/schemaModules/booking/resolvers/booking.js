import { valueIn } from '@tcne/react-utils/common';
import passengerMapper from '../maps/passenger';

export const bookingResolver = async (_, { id }, { dataSources }) => {
  const bookingResult = await dataSources.BH2.getBooking(id);
  return bookingResult;
};

export const passengersResolver = async (booking, _, { dataSources }) => {
  const passengersResult = await dataSources.BH2.getPassengerInformation(booking);
  const passengers = valueIn(passengersResult, 'passengers', []).map(passengerMapper);
  // Här ska in customer grejer
  // /home/greger/projects/origo/src/resolvers/team3Checkout/query/passengersForBooking.js
  return passengers;
};
