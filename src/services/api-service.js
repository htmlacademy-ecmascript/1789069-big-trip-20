import Service from './service.js';

class ApiService extends Service {
  /**
   * @param {Partial<ServiceOptions>} options
   */
  constructor(options) {
    super({
      baseUrl: 'https://20.ecmascript.pages.academy/big-trip/',
      minResponseTime: 500,
      authorization: '',
      ...options
    });

  }

  /**
   * @return {Promise<Array<PointInSnakeCase>>}
   */
  async getPoints() {
    const response = await this.request('points');

    return response.json();
  }

  /**
   * @return {Promise<Array<Destination>>}
   */
  async getDestinations() {
    const response = await this.request('destinations');

    return response.json();
  }

  /**
   * @return {Promise<Array<OfferGroup>>}
   */
  async getOfferGroups() {
    const response = await this.request('offers');

    return response.json();
  }
}

export default ApiService;
