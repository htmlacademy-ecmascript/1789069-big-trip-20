import Model from './model.js';
import points from '../data/points.json';
import destinations from '../data/destinations.json';
import offerGroups from '../data/offers.json';

class AppModel extends Model {
  #points;
  #destinations;
  #offerGroups;

  constructor() {
    super();

    this.#points = points;
    this.#destinations = destinations;
    this.#offerGroups = offerGroups;
  }

  /**
   * @return {Array<Point>}
   */
  getPoints() {
    return this.#points.map(AppModel.adaptPointForClient);
  }

  /**
   * @return {Array<Destination>}
   */
  getDestinations() {
    return structuredClone(this.#destinations);
  }

  /**
   * @return {Array<OfferGroup>}
   */
  getOfferGroups() {
    // @ts-ignore
    return structuredClone(this.#offerGroups);
  }

  /**
   * @param {PointInSnakeCase} point
   * @return {Point}
   */
  static adaptPointForClient(point) {
    return {
      id: point.id,
      type: point.type,
      destinationId: point.destination,
      startDateTime: point.date_from,
      endDateTime: point.date_to,
      basePrice: point.base_price,
      offerIds: point.offers,
      isFavorite: point.is_favorite
    };
  }

}

export default AppModel;
