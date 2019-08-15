const bookingMapper = require('../maps/booking');
const passengerMapper = require('../maps/passenger');
const {valueIn} = require('@tcne/react-utils/common');

module.exports = {
  booking: async (_, { id }, { dataSources }) => {
    const bookingResult = await dataSources.BH2.getBooking(id);
    return bookingMapper(bookingResult);
  },

  passengers: async ({ id }, _, { dataSources }) => {
    const passengersResult = await dataSources.BH2.getPassengerInformation(id);
    const passengers = valueIn(passengersResult, 'passengers', []).map(passengerMapper);
    // Här ska in customer grejer /home/greger/projects/origo/src/resolvers/team3Checkout/query/passengersForBooking.js
    return passengers;
  },

  extraGroups: async ({ id }, { views, extraGroupKeys }, { dataSources: { BH2 } }) => {
    const BOOKED_EXTRAS_GROUP = 'bookedExtrasGroup';
    const groupKeysToFetch = (extraGroupKeys || [])
      .filter(g => g)
      .find(key => key === BOOKED_EXTRAS_GROUP)
      ? null
      : extraGroupKeys;

    const bookingResult = await BH2.getBooking(id);
    const extraOffersResult = await BH2.getExtraOffers(id, views, groupKeysToFetch);
    // console.log(extraOffersResults);
    return null;
  },
};
