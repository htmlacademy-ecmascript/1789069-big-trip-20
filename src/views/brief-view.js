import View from './view.js';
import {html} from '../utils.js';

/**
 * @extends {View<BriefViewState>}
 */
class BriefView extends View {
  constructor() {
    super();

    this.classList.add('trip-info');
  }

  /**
   * @override
   */
  createHtml() {
    const trip = this.state;

    return html`
      <div class="trip-info__main">
        <h1 class="trip-info__title">${trip.places}</h1>

        <p class="trip-info__dates">${trip.dates}</p>
      </div>

      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${trip.cost}</span>
      </p>
    `;
  }
}

customElements.define('brief-view', BriefView);

export default BriefView;
