import './overlay-view.css';
import View from './view.js';

/**
 * @extends {View<OverlayViewState>}
 * @implements {EventListenerObject}
 */
class OverlayView extends View {
  constructor() {
    super();

    this.classList.add('overlay');
  }

  /**
   * @override
   */
  render() {
    const overlay = this.state;

    if (overlay.isActive) {
      this.classList.add('overlay--active');
      document.addEventListener('keydown', this);
    } else {
      this.classList.remove('overlay--active');
      document.removeEventListener('keydown', this);
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    event.preventDefault();
  }
}

customElements.define('overlay-view', OverlayView);

export default OverlayView;
