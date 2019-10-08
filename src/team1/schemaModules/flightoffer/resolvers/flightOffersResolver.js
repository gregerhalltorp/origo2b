import { valueIn } from '@tcne/react-utils/common';

export async function flightOffersResolver(_, { key, filterInput }, { dataSources }) {
  let flightOfferResult;
  if (key) {
    flightOfferResult = await dataSources.BH2.getLink(key);
  } else {
    flightOfferResult = await dataSources.BH2.getFlightOffers(filterInput);
  }

  return valueIn(flightOfferResult, '_embedded.flight-offer', []);
}
