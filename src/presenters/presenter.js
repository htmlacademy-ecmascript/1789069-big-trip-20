/**
 * @abstract
 * @template {View} V
 * @template {Model} M
 */
class Presenter {
  /**
   * @param {V} view
   * @param {M} model
   */
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.updateView();
  }

  updateView() {
    this.view.state = this.createViewState();
    this.view.render();
  }

  /**
   * @abstract
   */
  createViewState() {
    return null;
  }
}

export default Presenter;
