const mappie = require('../maps/booking');

module.exports = {
  booking: async (_, { id }, { dataSources }) => {
    const bookingResult = await dataSources.BH2.getBooking(id);
    return mappie(bookingResult);
  },

  extraGroups: async ({ id }, _, { dataSources }) => {
    const extrasResult = await dataSources.BH2.getExtraOffers(id);
    return null;
  },
};
