import { valueIn } from '@tcne/react-utils/common';

export async function flightOffersResolver(_, { key, filterInput }, { dataSources, marketUnit }) {
  let flightOfferResult;
  if (key) {
    flightOfferResult = await dataSources.BH2.getLink(key);
  } else {
    flightOfferResult = await dataSources.BH2.getFlightOffers(filterInput, marketUnit);
  }

  return valueIn(flightOfferResult, '_embedded.flight-offer', []);
}
