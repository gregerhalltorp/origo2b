import { valueIn } from '@tcne/react-utils/common';
import bookingMapper from '../maps/booking';
import passengerMapper from '../maps/passenger';

export const bookingResolver = async (_, { id }, { dataSources }) => {
  console.log('alsdkfjalskdfjlkasjdflkajsdflkjaslkfjasldfj');
  const bookingResult = await dataSources.BH2.getBooking(id);
  return bookingResult;
};

export const passengersResolver = async ({ id }, _, { dataSources }) => {
  const passengersResult = await dataSources.BH2.getPassengerInformation(id);
  const passengers = valueIn(passengersResult, 'passengers', []).map(passengerMapper);
  // Här ska in customer grejer
  // /home/greger/projects/origo/src/resolvers/team3Checkout/query/passengersForBooking.js
  return passengers;
};

export const extraGroupsResolver = async (
  { id },
  { views, extraGroupKeys },
  { dataSources: { BH2 } },
) => {
  const BOOKED_EXTRAS_GROUP = 'bookedExtrasGroup';
  const groupKeysToFetch = (extraGroupKeys || [])
    .filter((g) => g)
    .find((key) => key === BOOKED_EXTRAS_GROUP)
    ? null
    : extraGroupKeys;

  const bookingResult = await BH2.getBooking(id);
  const extraOffersResult = await BH2.getExtraOffers(id, views, groupKeysToFetch);
  // console.log(extraOffersResults);
  return null;
};
