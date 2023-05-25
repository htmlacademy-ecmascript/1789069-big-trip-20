import Presenter from './presenter.js';

/**
 * @extends {Presenter<FilterView>}
 */
class FilterPresenter extends Presenter {
  /**
   * @override
   * @return {FilterViewState}
   */
  createViewState() {
    /**
     * @type {UrlParams}
     */
    const {filter = 'everything'} = this.getUrlParams();

    /**
     * @type {Array<FilterType>}
     */
    const types = ['everything', 'future', 'present', 'past'];

    const items = types.map((it) => ({
      value: it,
      isSelected: it === filter,
      isDisabled: false
    }));

    return {items};
  }

  /**
   * @override
   */
  addEventListeners() {
    this.view.addEventListener('change', this.handleViewChange.bind(this));
  }

  /**
   * @param {Event & {target: {value: FilterType}}} event
   */
  handleViewChange(event) {
  /**
   * @type {UrlParams}
   */
    const urlParams = {
      filter: event.target.value
    };

    this.setUrlParams(urlParams);
  }
}

export default FilterPresenter;
