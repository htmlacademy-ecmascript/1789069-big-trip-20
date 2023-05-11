import View from './view.js';
import {html} from '../utils.js';

/**
 * @extends {View<SortViewState>}
 */
class SortView extends View {
  constructor() {
    super();

    this.classList.add('trip-sort');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      ${this.state.items.map(this.createItemHtml)}
    `;
  }

  /**
   * @param {SortItemViewState} state
   * @return {SafeHtml}
   */
  createItemHtml(state) {
    return html`
      <div class="trip-sort__item  trip-sort__item--${state.value}">
        <input ${state.isSelected ? 'checked' : ''} ${state.isDisabled ? 'disabled' : ''} id="sort-${state.value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${state.value}">
        <label class="trip-sort__btn" for="sort-${state.value}">${state.value}</label>
      </div>
    `;
  }
}

customElements.define('sort-view', SortView);

export default SortView;
