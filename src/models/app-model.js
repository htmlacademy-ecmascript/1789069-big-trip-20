import Model from './model.js';

class AppModel extends Model {
  #apiService;
  /**
   * @type {Array<PointInSnakeCase>}
   */
  #points;

  /**
   * @type {Array<Destination>}
   */
  #destinations;

  /**
   * @type {Array<OfferGroup>}
   */
  #offerGroups;

  /**
   * @type {Record<FilterType, (it: Point) => boolean>}
   */
  #filterCallbackMap = {
    everything: () => true,
    future: (it) => Date.parse(it.startDateTime) > Date.now(),
    present: (it) => !this.#filterCallbackMap.past(it) && !this.#filterCallbackMap.future(it),
    past: (it) => Date.parse(it.endDateTime) < Date.now()
  };

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
   * @param {ApiService} apiService
   */
  constructor(apiService) {
    super();

    this.#apiService = apiService;
  }

  /**
   * @return {Promise<void>}
   */
  async load() {
    try {
      const data = await Promise.all([
        this.#apiService.getPoints(),
        this.#apiService.getDestinations(),
        this.#apiService.getOfferGroups()
      ]);

      const [points, destinations, offerGroups] = data;

      this.#points = points;
      this.#destinations = destinations;
      this.#offerGroups = offerGroups;
      this.notify('load');

    } catch (error) {
      this.notify('error', error);
      throw error;
    }
  }

  /**
   * @param {{filter?: FilterType, sort?: SortType}} [criteria]
   * @return {Array<Point>}
   */
  getPoints(criteria = {}) {
    const adaptedPoints = this.#points.map(AppModel.adaptPointForClient);
    const filterCallback = this.#filterCallbackMap[criteria.filter] ?? this.#filterCallbackMap.everything;
    const sortCallback = this.#sortCallbackMap[criteria.sort] ?? this.#sortCallbackMap.day;

    return adaptedPoints.filter(filterCallback).sort(sortCallback);
  }

  /**
   * @param {Point} point
   */
  async addPoint(point) {
    try {
      this.notify('busy');

      const adaptedPoint = AppModel.adaptPointForServer(point);
      const addedPoint = await this.#apiService.addPoint(adaptedPoint);

      this.#points.push(addedPoint);

    } finally {
      this.notify('idle');
    }
  }

  /**
   * @param {Point} point
   */
  async updatePoint(point) {
    try {
      this.notify('busy');

      const adaptedPoint = AppModel.adaptPointForServer(point);
      const updatedPoint = await this.#apiService.updatePoint(adaptedPoint);
      const index = this.#points.findIndex((it) => it.id === adaptedPoint.id);

      this.#points.splice(index, 1, updatedPoint);

    } finally {
      this.notify('idle');
    }
  }

  /**
   * @param {string} id
   */
  async deletePoint(id) {
    try {
      this.notify('busy');

      await this.#apiService.deletePoint(id);
      const index = this.#points.findIndex((it) => it.id === id);

      this.#points.splice(index, 1);

    } finally {
      this.notify('idle');
    }
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

  /**
   * @param {Point} point
   * @return {PointInSnakeCase}
   */
  static adaptPointForServer(point) {
    return {
      'id': point.id,
      'type': point.type,
      'destination': point.destinationId,
      'date_from': point.startDateTime,
      'date_to': point.endDateTime,
      'base_price': point.basePrice,
      'offers': point.offerIds,
      'is_favorite': point.isFavorite
    };
  }

}

export default AppModel;
