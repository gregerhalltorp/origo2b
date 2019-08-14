const { RESTDataSource } = require('apollo-datasource-rest');
const { valueIn } = require('@tcne/react-utils/common');
var uriTemplates = require('uri-templates');

class BH2DataSource extends RESTDataSource {
  constructor(url = 'http://bookinghub-2.test.int/api/') {
    super();
    this.baseURL = url;
  }

  willSendRequest(request) {
    console.log(this.context.bookingMeta);
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
    const result = await this.get(bookingLink);
    if (result.modelVersion) {
      this.context.bookingMeta = this.context.bookingMeta || {};
      this.context.bookingMeta.modelVersion = result.modelVersion;
    }
    return result;
  }

  async getExtraOffers(id, views = [], groupKeys = []) {
    const booking = await this.getBooking(id);
    const changeExtrasLink = valueIn(booking, ['_links', 'change-extras', 'href']);
    const changeExtras = await this.get(changeExtrasLink);
    const offersLink = valueIn(changeExtras, ['_links', 'extra-offers', 'href']);
    const extraOffersLinks = views.map(view =>
      uriTemplates(offersLink).fill({ View: view, ExtraGroupKeys: groupKeys })
    );
    const extraOffersResults = await Promise.all(
      extraOffersLinks.map(link => this.get(link))
    ).catch(error => {
      console.log('Unable to get extra offers ', error);
    });
    return extraOffersResults;
  }
}

module.exports = BH2DataSource;
