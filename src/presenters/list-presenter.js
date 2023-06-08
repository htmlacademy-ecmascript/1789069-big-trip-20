import {formatDate, formatDuration, formatTime} from '../utils.js';
import Presenter from './presenter.js';

/**
 * @extends {Presenter<ListView, AppModel>}
 */
class ListPresenter extends Presenter {
  /**
   * @override
   * @return {ListViewState}
   */
  createViewState() {
    /**
     * @type {UrlParams}
     */
    const urlParams = this.getUrlParams();
    const points = this.model.getPoints(urlParams);
    const items = points.map(this.createPointViewState, this);

    if (urlParams.edit === 'draft') {
      /**
       * @type {Partial<Point>}
       */
      const draftPoint = {
        type: 'taxi',
        offerIds: [],
        isFavorite: false
      };

      items.unshift(this.createPointViewState(draftPoint));
    }

    return {items};
  }

  /**
   * @param {Partial<Point>} point
   * @return {PointViewState}
   */
  createPointViewState(point) {
    const offerGroups = this.model.getOfferGroups();

    const types = offerGroups.map((it) => ({
      value: it.type,
      isSelected: it.type === point.type
    }));

    const destinations = this.model.getDestinations().map((it) => ({
      ...it,
      isSelected: it.id === point.destinationId
    }));

    const group = offerGroups.find((it) => it.type === point.type);
    const offers = group.offers.map((it) => ({
      ...it,
      isSelected: point.offerIds.includes(it.id)
    }));

    /**
     * @type {UrlParams}
     */
    const urlParams = this.getUrlParams();
    const isDraft = point.id === undefined;
    const isEditable = isDraft || point.id === urlParams.edit;

    return {
      id: point.id,
      types,
      destinations,
      startDateTime: point.startDateTime,
      endDateTime: point.endDateTime,
      startDate: formatDate(point.startDateTime),
      startTime: formatTime(point.startDateTime),
      endTime: formatTime(point.endDateTime),
      duration: formatDuration(point.startDateTime, point.endDateTime),
      basePrice: point.basePrice,
      offers,
      isFavorite: point.isFavorite,
      isEditable,
      isDraft
    };
  }

  /**
   * @param {PointViewState} point
   * @return {Point}
   */
  serializePointViewState(point) {
    return {
      id: point.id,
      type: point.types.find((it) => it.isSelected).value,
      destinationId: point.destinations.find((it) => it.isSelected)?.id,
      startDateTime: point.startDateTime,
      endDateTime: point.endDateTime,
      basePrice: point.basePrice,
      offerIds: point.offers.filter((it) => it.isSelected).map((it) => it.id),
      isFavorite: point.isFavorite
    };
  }

  /**
   * @override
   */
  addEventListeners() {
    this.view.addEventListener('open', this.handleViewOpen.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
    this.view.addEventListener('favorite', this.handleViewFavorite.bind(this));
    this.view.addEventListener('edit', this.handleViewEdit.bind(this));
    this.view.addEventListener('save', this.handleViewSave.bind(this));
    this.view.addEventListener('delete', this.handleViewDelete.bind(this));
  }

  /**
   * @param {CustomEvent & {target: CardView}} event
   */
  handleViewOpen(event) {
    /**
     * @type {UrlParams}
     */
    const urlParams = this.getUrlParams();

    urlParams.edit = event.target.state.id;
    this.setUrlParams(urlParams);
  }

  handleViewClose() {
    /**
     * @type {UrlParams}
     */
    const urlParams = this.getUrlParams();

    delete urlParams.edit;
    this.setUrlParams(urlParams);
  }

  /**
   * @param {CustomEvent & {target: CardView}} event
   */
  async handleViewFavorite(event) {
    const card = event.target;
    const point = card.state;

    try {
      point.isFavorite = !point.isFavorite;
      await this.model.updatePoint(this.serializePointViewState(point));
      card.render();

    } catch (error) {
      card.shake();
    }
  }

  /**
   * @param {CustomEvent<HTMLInputElement> & {target: EditorView}} event
   */
  handleViewEdit(event) {
    const editor = event.target;
    const field = event.detail;
    const point = editor.state;

    switch (field.name) {
      case 'event-type' : {
        const offerGroups = this.model.getOfferGroups();
        const {offers} = offerGroups.find((it) => it.type === field.value);

        point.offers = offers;
        point.types.forEach((it) => {
          it.isSelected = it.value === field.value;
        });
        editor.renderTypeAndRelatedFields();
        break;
      }

      case 'event-destination' : {
        const name = field.value.trim();

        point.destinations.forEach((it) => {
          it.isSelected = it.name === name;
        });
        editor.renderDestination();
        break;
      }

      case 'event-start-time' : {
        point.startDateTime = field.value;
        break;
      }

      case 'event-end-time' : {
        point.endDateTime = field.value;
        break;
      }

      case 'event-price' : {
        point.basePrice = Number(field.value);
        break;
      }

      case 'event-offer': {
        const offer = point.offers.find((it) => it.id === field.value);

        offer.isSelected = !offer.isSelected;
        break;
      }
    }
  }

  /**
   * @param {CustomEvent & {target: EditorView}} event
   */
  async handleViewSave(event) {
    const editor = event.target;
    const point = editor.state;

    try {
      event.preventDefault();

      point.isSaving = true;
      editor.renderSubmitButton();

      if (point.isDraft) {
        await this.model.addPoint(this.serializePointViewState(point));
      } else {
        await this.model.updatePoint(this.serializePointViewState(point));
      }
      this.handleViewClose();

    } catch (error) {
      point.isSaving = false;
      editor.renderSubmitButton();
      editor.shake();
    }
  }

  /**
   * @param {CustomEvent & {target: EditorView}} event
   */
  async handleViewDelete(event) {
    const editor = event.target;
    const point = editor.state;

    try {
      event.preventDefault();
      point.isDeleting = true;
      editor.renderResetButton();

      await this.model.deletePoint(point.id);
      this.handleViewClose();

    } catch (error) {
      point.isDeleting = false;
      editor.renderResetButton();
      editor.shake();
    }
  }
}

export default ListPresenter;
