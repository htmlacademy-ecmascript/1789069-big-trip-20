import View from './view.js';
import {html} from '../utils.js';

class AddView extends View {

  /**
   * @override
   */
  createHtml() {
    return html`
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    `;
  }
}

customElements.define('add-view', AddView);

export default AddView;
