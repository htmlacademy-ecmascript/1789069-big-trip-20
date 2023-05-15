import Model from './model.js';
import points from '../data/points.json';
import destinations from '../data/destinations.json';
import offerGroups from '../data/offers.json';

class AppModel extends Model {
  #points = points;
  #destinations = destinations;
  #offerGroups = offerGroups;

  /**
   * @type {Record<SortType, (a: Point, b: Point) => number>}
   */
  #sortCallbackMap = {
    day: (a, b) => Date.parse(a.startDateTime) - Date.parse(b.startDateTime),
    event: () => 0,
    time: (a, b) => AppModel.calcPointDuration(b) - AppModel.calcPointDuration(a),
    price: (a, b) => a.basePrice - b.basePrice,
    offers: () => 0
  };

  /**
   * @param {{sort?: SortType}} [criteria]
   * @return {Array<Point>}
   */
  getPoints(criteria = {}) {
    const adaptedPoints = this.#points.map(AppModel.adaptPointForClient);
    const sortCallback = this.#sortCallbackMap[criteria.sort] ?? this.#sortCallbackMap.day;

    return adaptedPoints.sort(sortCallback);
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
   * @param {Point} point
   * @return {number}
   */
  static calcPointDuration(point) {
    return Date.parse(point.endDateTime) - Date.parse(point.startDateTime);
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
