/**
 * @typedef {import('./utils.js').SafeHtml} SafeHtml
 */

/**
 * @typedef {import('./views/brief-view.js').default} BriefView
 * @typedef {import('./views/add-view.js').default} AddView
 * @typedef {import('./views/filter-view.js').default} FilterView
 * @typedef {import('./views/sort-view.js').default} SortView
 * @typedef {import('./views/list-view.js').default} ListView
 * @typedef {import('./views/card-view.js').default} CardView
 * @typedef {import('./views/editor-view.js').default} EditorView
 * @typedef {import('./views/view.js').default} View
 */

/**
 * @typedef ListViewState
 * @prop {Array<PointViewState>} items
 */

/**
 * @typedef PointViewState
 * @prop {string} id
 * @prop {Array<{value: PointType, isSelected: boolean}>} types
 * @prop {Array<Destination & {isSelected: boolean}>} destinations
 * @prop {string} startDateTime
 * @prop {string} endDateTime
 * @prop {string} startDate
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {string} duration
 * @prop {number} basePrice
 * @prop {Array<Offer & {isSelected: boolean}>} offers
 * @prop {boolean} isFavorite
 * @prop {boolean} isEditable
 */

/**
 * @typedef UrlParams
 * @prop {string} [edit]
 */

/**
 * @typedef {import('./models/model.js').default} Model
 * @typedef {import('./models/app-model.js').default} AppModel
 */

/**
 * @typedef Point
 * @prop {string} id
 * @prop {PointType} type
 * @prop {string} destinationId
 * @prop {string} startDateTime
 * @prop {string} endDateTime
 * @prop {number} basePrice
 * @prop {Array<string>} offerIds
 * @prop {boolean} isFavorite
 */

/**
 * @typedef PointInSnakeCase
 * @prop {string} id
 * @prop {PointType} type
 * @prop {string} destination
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} base_price
 * @prop {Array<string>} offers
 * @prop {boolean} is_favorite
 */

/**
 * @typedef Destination
 * @prop {string} id
 * @prop {string} name
 * @prop {string} description
 * @prop {Array<Picture>} pictures
 */

/**
 * @typedef Picture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef OfferGroup
 * @prop {PointType} type
 * @prop {Array<Offer>} offers
 */

/**
 * @typedef Offer
 * @prop {string} id
 * @prop {string} title
 * @prop {number} price
 */

/**
 * @typedef {'taxi' | 'bus' | 'train' | 'ship' | 'drive' | 'flight' | 'check-in' | 'sightseeing' | 'restaurant'} PointType
 */
