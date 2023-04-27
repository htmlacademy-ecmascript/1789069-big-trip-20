/**
 * @abstract
 */
class View extends HTMLElement {
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
