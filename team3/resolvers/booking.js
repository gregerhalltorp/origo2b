const mappie = require('../maps/booking');

module.exports = {
  booking: async (_, { id }, { dataSources }) => {
    const bookingResult = await dataSources.BH2.getBooking(id);
    return mappie(bookingResult);
  },

  extraGroups: async ({ id }, { views, extraGroupKeys }, { dataSources }) => {
    const BOOKED_EXTRAS_GROUP = 'bookedExtrasGroup';
    const groupKeysToFetch = (extraGroupKeys || [])
      .filter(g => g)
      .find(key => key === BOOKED_EXTRAS_GROUP)
      ? null
      : extraGroupKeys;

    const extraOffersResults = await dataSources.BH2.getExtraOffers(id, views, groupKeysToFetch);
    // console.log(extraOffersResults);
    return null;
  },
};
