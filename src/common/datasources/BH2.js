/* eslint-disable no-console */
import { RESTDataSource } from 'apollo-datasource-rest';
import { valueIn } from '@tcne/react-utils/common';
import uriTemplates from 'uri-templates';

// TODO: Move link stuff to reducers?
class BH2DataSource extends RESTDataSource {
  constructor(url = 'http://bookinghub-2.test.int/api/') {
    super();
    this.baseURL = url;
  }

  willSendRequest(request) {
    console.log('metaData', this.context.bookingMeta);
    const modelVersion = valueIn(this.context, ['bookingMeta', 'modelVersion']);
    if (modelVersion) {
      request.headers.append('modelVersion', modelVersion);
    }
  }

  cacheKeyFor(request) {
    const modelVersion = valueIn(this.context, ['bookingMeta', 'modelVersion']);
    const cacheKey = `${request.url}|${modelVersion || ''}`;
    console.log('cacheKey', cacheKey);
    return cacheKey;
  }

  async getBooking(id) {
    this.context.bookingMeta = this.context.bookingMeta || { bookingId: id };
    const bookingResult = await this.get('');
    const bLink = valueIn(bookingResult, ['_links', 'booking', 'href']);
    const bResult = await this.get(bLink);
    const sbLink = valueIn(bResult, ['_links', 'single-booking', 'href']);
    const bookingLink = uriTemplates(sbLink).fill({ BookingId: id });
    console.log('bookingLink', bookingLink);
    const result = await this.get(bookingLink);
    if (result.modelVersion) {
      this.context.bookingMeta = this.context.bookingMeta || {};
      this.context.bookingMeta.modelVersion = result.modelVersion;
    }
    return result;
  }

  async getExtraOffers(booking, views = [], groupKeys = []) {
    const changeExtrasLink = valueIn(booking, ['_links', 'change-extras', 'href']);
    const changeExtras = await this.get(changeExtrasLink);
    const offersLink = valueIn(changeExtras, ['_links', 'extra-offers', 'href']);
    const extraOffersLinks = views.map((view) => uriTemplates(offersLink).fill({
      View: view,
      ExtraGroupKeys: groupKeys,
    }));
    const extraOffersResults = await Promise.all(
      extraOffersLinks.map((link) => this.get(link)),
    ).catch((error) => {
      console.log('Unable to get extra offers ', error);
    });
    return extraOffersResults;
  }

  async getPassengerInformation(booking) {
    const passengerInformationLink = valueIn(booking, ['_links', 'passenger-information', 'href']);
    const passengerInformation = await this.get(passengerInformationLink);
    return passengerInformation;
  }

  async getPaymentInformation(booking) {
    let link = valueIn(booking, ['_links', 'payment-information', 'href']);
    if (!link) {
      const id = valueIn(booking, 'bookingId') || valueIn(booking, 'id');
      const fetchedBooking = await this.getBooking(id);
      link = valueIn(fetchedBooking, ['_links', 'payment-information', 'href']);
    }
    const paymentInformation = await this.get(link);
    return paymentInformation;
  }

  async getLink(link) {
    const result = await this.get(link);
    return result;
  }
}

export default BH2DataSource;
