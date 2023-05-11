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
    // TODO: Создать динамически
    return {
      isDisabled: false
    };
  }
}

export default AddPresenter;
