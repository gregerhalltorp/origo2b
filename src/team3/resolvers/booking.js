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

export const extraGroupsResolver = async (
  booking,
  { views, extraGroupKeys },
  { dataSources: { BH2 } },
) => {
  const BOOKED_EXTRAS_GROUP = 'bookedExtrasGroup';
  const groupKeysToFetch = (extraGroupKeys || [])
    .filter((g) => g)
    .find((key) => key === BOOKED_EXTRAS_GROUP)
    ? null
    : extraGroupKeys;

  const extraOffersResult = await BH2.getExtraOffers(booking, views, groupKeysToFetch);
  // console.log(extraOffersResults);
  return null;
};
