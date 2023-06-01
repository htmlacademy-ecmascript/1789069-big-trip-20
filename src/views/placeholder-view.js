import View from './view.js';
import {html} from '../utils.js';

/**
 * @extends {View<PlaceholderViewState>}
 */
class PlaceholderView extends View {
  /**
   * @override
   */
  createHtml() {
    const placeholder = this.state;

    if (placeholder.isHidden) {
      return '';
    }

    return html`
      <p class="trip-events__msg">${placeholder.text}</p>
    `;
  }
}

customElements.define('placeholder-view', PlaceholderView);

export default PlaceholderView;
