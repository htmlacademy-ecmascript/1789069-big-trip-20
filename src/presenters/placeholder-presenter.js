import Presenter from './presenter.js';

/**
 * @extends {Presenter<PlaceholderView, AppModel>}
 */
class PlaceholderPresenter extends Presenter {
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
}

export default PlaceholderPresenter;
