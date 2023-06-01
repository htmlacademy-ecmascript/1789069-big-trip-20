import Presenter from './presenter.js';

/**
 * @extends {Presenter<AddView>}
 */
class AddPresenter extends Presenter {
  /**
   * @override
   * @return {AddViewState}
   */
  createViewState() {
    /**
     * @type {UrlParams}
     */
    const urlParams = this.getUrlParams();

    return {
      isDisabled: urlParams.edit === 'draft'
    };
  }

  /**
   * @override
   */
  addEventListeners() {
    this.view.addEventListener('click', this.handleViewClick.bind(this));
  }

  handleViewClick() {
    /**
     * @type {UrlParams}
     */
    const urlParams = {
      edit: 'draft'
    };

    this.setUrlParams(urlParams);
  }
}

export default AddPresenter;
