import { valueIn } from '@tcne/react-utils/common';
import uriTemplates from 'uri-templates';
import { RESTDataSource } from 'apollo-datasource-rest';
import os from 'os';

export default class ContentDataSource extends RESTDataSource {
  constructor(url = 'http://contentdata.prod.int/') {
    super();
    this.baseURL = url;
    this.query = {
      caller_machine: os.hostname(),
      caller_system: 'origo2',
      caller_version: '1',
    };
  }

  async getHotel(wvId) {
    const { siteId = 1 } = this.context;
    const result = await this.get('');
    const getLink = valueIn(result, ['_links', 'cd:get', 'href']);
    const hotelLink = uriTemplates(getLink).fill({
      key: `OW:Hotel_${wvId}_${siteId}`,
      ...this.query,
    });

    return this.get(hotelLink);
  }
}
