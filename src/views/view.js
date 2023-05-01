/**
 * @abstract
 * @template S
 */
class View extends HTMLElement {
  constructor() {
    super();

    /**
     * @type {S}
     */
    this.state = null;
  }

  render() {
    this.innerHTML = String(this.createHtml());
  }

  /**
   * @return {SafeHtml}
   */
  createHtml() {
    return null;
  }
}

export default View;
