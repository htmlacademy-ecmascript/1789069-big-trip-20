import './editor-view.css';
import View from './view.js';
import {html} from '../utils.js';

/**
 * @extends {View<PointViewState>}
 */
class EditorView extends View {

  /**
   * @override
   */
  createHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${this.createTypeFieldHtml()}
          ${this.createDestinationFieldHtml()}
          ${this.createScheduleFieldHtml()}
          ${this.createPriceFieldHtml()}
          ${this.createSubmitButtonHtml()}
          ${this.createResetButtonHtml()}
          ${this.createCloseButtonHtml()}
        </header>
        <section class="event__details">
          ${this.createOfferListFieldHtml()}
          ${this.createDestinationHtml()}
        </section>
      </form>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createTypeFieldHtml() {
    const point = this.state;
    const type = point.types.find((it) => it.isSelected);

    return html`
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.value}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            ${point.types.map((it) => html`
              <div class="event__type-item">
                <input id="event-type-${it.value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.value}" ${it.isSelected ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--${it.value}" for="event-type-${it.value}-1">${it.value}</label>
              </div>
            `)}
          </fieldset>
        </div>
    </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createDestinationFieldHtml() {
    const point = this.state;
    const type = point.types.find((it) => it.isSelected);
    const destination = point.destinations.find((it) => it.isSelected);

    return html`
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type.value}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${point.destinations.map((it) => html`
            <option value="${it.name}"></option>
          `)}
        </datalist>
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createScheduleFieldHtml() {
    const point = this.state;

    return html`
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${point.startDateTime}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${point.endDateTime}">
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createPriceFieldHtml() {
    const point = this.state;

    return html`
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createSubmitButtonHtml() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createResetButtonHtml() {
    return html`
      <button class="event__reset-btn" type="reset">Delete</button>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createCloseButtonHtml() {
    return html`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createOfferListFieldHtml() {
    const point = this.state;

    return html`
      <section class="event__section  event__section--offers" ${point.offers.length ? '' : 'hidden'}>
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${point.offers.map((it) => html`
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.id}" type="checkbox" name="event-offer" ${it.isSelected ? 'checked' : ''}>
              <label class="event__offer-label" for="event-offer-${it.id}">
                <span class="event__offer-title">${it.title}</span>
                +€&nbsp;
                <span class="event__offer-price">${it.price}</span>
              </label>
            </div>
          `)}

        </div>
    </section>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createDestinationHtml() {
    const point = this.state;
    const destination = point.destinations.find((it) => it.isSelected);

    return html`
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        ${destination.pictures.length ? html`
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destination.pictures.map((it) => html`
                <img class="event__photo" src="${it.src}" alt="${it.description}">
              `)}
            </div>
          </div>
        ` : ''}
      </section>
    `;
  }
}

customElements.define('editor-view', EditorView);

export default EditorView;
