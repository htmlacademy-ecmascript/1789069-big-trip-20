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

  /**
   * @param {string} [selector]
   * @param {SafeHtml} [outerHtml]
   */
  render(selector, outerHtml) {
    if (arguments.length === 2) {
      this.querySelector(selector).outerHTML = String(outerHtml);
    } else {
      this.innerHTML = String(this.createHtml());
    }
  }

  /**
   * @return {SafeHtml}
   */
  createHtml() {
    return null;
  }

  /**
   * @param {string} type
   * @param {any} [detail]
   * @return {boolean}
   */
  notify(type, detail = null) {
    const cancelable = true;
    const bubbles = true;
    const event = new CustomEvent(type, {detail, cancelable, bubbles});

    return this.dispatchEvent(event);
  }

  /**
   * @param {KeyframeAnimationOptions} [options]
   */
  shake(options) {
    const keyframes = {
      transform: [0, -5, 0, 5, 0].map((it) => `translateX(${it}px)`)
    };

    return this.animate(keyframes, {
      duration: 150,
      iterations: 4,
      ...options
    });
  }

}

export default View;
