import Presenter from './presenter.js';

/**
 * @extends {Presenter<PlaceholderView, AppModel>}
 */
class PlaceholderPresenter extends Presenter {
  /**
   * @type {boolean}
   */
  isModelLoaded;

  /**
   * @type {Error}
   */
  modelError;

  /**
   * @type {Record<FilterType, string>}
   */
  textMap = {
    everything: 'Click New Event to create your first point',
    past: 'There are no past events now',
    present: 'There are no present events now',
    future: 'There are no future events now'
  };

  /**
   * @override
   * @return {PlaceholderViewState}
   */
  createViewState() {
    if (this.isModelLoaded) {
      /**
       * @type {UrlParams}
       */
      const urlParams = this.getUrlParams();
      const points = this.model.getPoints(urlParams);

      return {
        text: this.textMap[urlParams.filter] ?? this.textMap.everything,
        isHidden: points.length > 0
      };
    }

    if (this.modelError) {
      return {
        text: String(this.modelError)
      };
    }

    return {
      text: 'Loading...'
    };
  }

  /**
   * @override
   */
  addEventListeners() {
    this.model.addEventListener('load', this.handleModelLoad.bind(this));
    this.model.addEventListener('error', this.handleModelError.bind(this));
  }

  handleModelLoad() {
    this.isModelLoaded = true;
    this.updateView();
  }

  /**
   * @param {CustomEvent<Error>} event
   */
  handleModelError(event) {
    this.modelError = event.detail;
    this.updateView();
  }
}

export default PlaceholderPresenter;
