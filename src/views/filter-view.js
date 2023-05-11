import View from './view.js';
import {html} from '../utils.js';

/**
 * @extends {View<FilterViewState>}
 */
class FilterView extends View {
  constructor() {
    super();

    this.classList.add('trip-filters');
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
   * @param {FilterItemViewState} state
   * @return {SafeHtml}
   */
  createItemHtml(state) {
    return html`
      <div class="trip-filters__filter">
        <input ${state.isSelected ? 'checked' : ''} ${state.isDisabled ? 'disabled' : ''} id="filter-${state.value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${state.value}">
        <label class="trip-filters__filter-label" for="filter-${state.value}">${state.value}</label>
      </div>
    `;
  }
}

customElements.define('filter-view', FilterView);

export default FilterView;

