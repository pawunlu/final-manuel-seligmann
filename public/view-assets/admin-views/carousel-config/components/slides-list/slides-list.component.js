/**
 * represents a Movie
 * @typedef {Object} Movie
 * @property {string} id - Movie's ID
 * @property {number} carouselPositionIndex - Movie's Carousel Position Index
 * @property {string} bannerName - Movie's image url
 */

export class SlidesListComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #listContainerHTMLComponent = null;

  /** @type {Movie[]} */
  #slides = [];

  /** @type {HTMLElement} */
  #currentSelectedSeparator = null;

  /**
   *
   * @param {Movie[]} slides
   *
   */
  set slides(slides) {
    this.#slides = slides;
    this.#createAndAppendListContainer();
  }

  #onSlidePositionChange = null;

  /**
   *
   * @param {function(Movie[])} callbackFn
   */
  set onSlidesPositionsChange(callbackFn) {
    this.#onSlidePositionChange = callbackFn;
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(`Element with ID "${parentContainerId}" was not found`);

    this.#createAndAppendListContainer();
    this.#listContainerHTMLComponent.style.display = 'none';
  }

  render() {
    this.#listContainerHTMLComponent.style.display = 'block';
  }

  #createAndAppendListContainer() {
    const listContainer = this.#createListContainer();
    this.#listContainerHTMLComponent = listContainer;
    this.#parentContainerHTMLComponent.replaceChildren(listContainer);
  }

  #createListContainer() {
    const container = document.createElement('section');
    container.classList.add('slides-list');

    for (let index = 0; index < this.#slides.length; index++) {
      const item = this.#slides[index];
      const slide = this.#createSlideItem(item, index);
      slide.setAttribute('draggable', true);
      slide.addEventListener('dragstart', (event) =>
        this.#startDrag(event, item.id),
      );
      slide.addEventListener('dragend', (e) => this.#endDrag(e));
      container.appendChild(slide);
    }

    this.#appendDraggableConfig(container, this.#slides);

    return container;
  }

  /**
   *
   *
   * @param {Movie} item
   * @param {number} slideIndex
   * @returns {HTMLElement}
   */
  #createSlideItem(item, slideIndex) {
    const slideContainer = document.createElement('section');
    slideContainer.classList.add('slide');
    slideContainer.setAttribute('slide-id', slideIndex);
    slideContainer.setAttribute('item-id', item.id);

    const slideNavigation = this.#createSlideNavigation(item);
    const slideImage = this.#createSlideImage(item);
    slideContainer.append(slideNavigation, slideImage);

    return slideContainer;
  }

  /**
   *
   *
   * @param {Movie} item
   * @returns {HTMLElement}
   */
  #createSlideNavigation(item) {
    const container = document.createElement('section');
    container.classList.add('slide-navigation');

    // const positionIndex = document.createElement('p');
    // positionIndex.classList.add('carousel-index-position');
    // positionIndex.innerHTML = item.carouselPositionIndex + 1;
    // container.appendChild(positionIndex);

    const upwardsButton = document.createElement('section');
    upwardsButton.classList.add('icon-move-upwards');
    upwardsButton.innerHTML = '△';
    container.appendChild(upwardsButton);

    const dragAndDropButton = document.createElement('section');
    dragAndDropButton.classList.add('icon-drag-and-drop');
    dragAndDropButton.innerHTML = '⫩';
    container.appendChild(dragAndDropButton);

    const downwardsButton = document.createElement('section');
    downwardsButton.classList.add('icon-move-downwards');
    downwardsButton.innerHTML = '▽';
    container.appendChild(downwardsButton);

    return container;
  }

  /**
   *
   *
   * @param {Movie} item
   * @returns {HTMLElement}
   */
  #createSlideImage(item) {
    const container = document.createElement('section');
    container.classList.add('slide-img');
    container.style.backgroundImage = `url(${item.bannerName})`;

    return container;
  }

  #handleReposition(itemId, newPosition) {
    const itemIndex = this.#slides.findIndex(
      (slide) => Number(slide.id) === itemId,
    );
    if (itemIndex === -1) return;

    const newSlidesPositions = [...this.#slides];
    const [item] = newSlidesPositions.splice(itemIndex, 1);
    newSlidesPositions.splice(
      newPosition < itemIndex ? newPosition : newPosition - 1,
      0,
      item,
    );

    if (this.#onSlidePositionChange)
      this.#onSlidePositionChange(newSlidesPositions);

    this.slides = newSlidesPositions;
  }

  /**
   *
   * @param {HTMLElement} container - Slides container
   * @param {Movie[]} slidesData - Slides data
   */
  #appendDraggableConfig(container, slidesData) {
    container.addEventListener('dragover', (e) => this.#onDragOver(e));
    container.addEventListener('drop', (e) => this.#onDrop(e));

    const currentContainerChildren = Array.from(container.children);
    const finalContainerChildren = [];

    finalContainerChildren.push(this.#createDraggeableSeparator(null, 0));

    for (let index = 0; index < slidesData.length; index++) {
      const slideData = slidesData[index];
      const slide = currentContainerChildren[index];
      slide.setAttribute('draggable-id', index);

      finalContainerChildren.push(slide);
      finalContainerChildren.push(
        this.#createDraggeableSeparator(index, index + 1),
      );
    }

    container.replaceChildren(...finalContainerChildren);
  }

  #createDraggeableSeparator(afterSlideIndex, beforeSlideIndex) {
    const separator = document.createElement('section');
    separator.innerHTML = 'Suelta aquí';

    separator.classList.add('separator');
    separator.setAttribute('separator-id', beforeSlideIndex);
    separator.setAttribute('after-slide-index', afterSlideIndex);
    separator.setAttribute('before-slide-index', beforeSlideIndex);

    separator.addEventListener('dragenter', (e) =>
      this.#handleDragEnterSeparator(e),
    );
    separator.addEventListener('dragleave', (e) =>
      this.#handleDragLeaveSeparator(e),
    );

    return separator;
  }

  #onDragOver(event) {
    event.preventDefault();
  }

  /**
   *
   *
   * @param {DragEvent} event
   */
  #onDrop(event) {
    const { target } = event;
    const droppedOnSeparator = !Number.isNaN(
      Number(target.getAttribute('separator-id') ?? undefined),
    );
    if (!droppedOnSeparator) return;

    const targetSeparator = event.target;
    const slideId = Number(event.dataTransfer.getData('id'));
    const slide = document.querySelector(`[slide-id="${slideId}"]`);
    const itemId = Number(slide.getAttribute('item-id'));
    const separatorId = Number(targetSeparator.getAttribute('separator-id'));

    const isSeparatorDropable = this.#isSeparatorDropable(slideId, separatorId);

    if (!isSeparatorDropable) return;

    const newPosition = Number(
      targetSeparator.getAttribute('before-slide-index'),
    );

    this.#handleReposition(itemId, newPosition);
  }

  /**
   *
   *
   * @param {DragEvent} event
   * @param {number} movieId
   */
  #startDrag(event) {
    const slide = event.target;
    slide.classList.add('dragging');

    const slideIndex = slide.getAttribute('slide-id');
    event.dataTransfer.setData('id', slideIndex);

    const separators = document.getElementsByClassName('separator');
    for (const separator of separators) {
      const separatorId = Number(separator.getAttribute('separator-id'));
      const slideId = Number(slide.getAttribute('slide-id'));

      const isSeparatorDropable = this.#isSeparatorDropable(
        slideId,
        separatorId,
      );

      if (isSeparatorDropable) {
        separator.classList.add('display');
      }
    }
  }

  #isSeparatorDropable(slideId, separatorId) {
    return slideId !== separatorId && slideId !== separatorId - 1;
  }

  /**
   *
   *
   * @param {DragEvent} event
   */
  #endDrag(event) {
    event.target.classList.remove('dragging');
    const HTMLSeparatorDroppedAt = this.#currentSelectedSeparator;
    if (HTMLSeparatorDroppedAt) {
      HTMLSeparatorDroppedAt.classList.remove('active');
    }

    const separators = document.getElementsByClassName('separator');
    for (const separator of separators) {
      separator.classList.remove('display');
    }
  }
  /**
   *
   *
   * @param {DragEvent} event
   */
  #handleDragEnterSeparator(event) {
    const separator = event.target;
    if (separator.classList.contains('display')) {
      this.#currentSelectedSeparator = event.target;
      this.#currentSelectedSeparator.classList.add('active');
    }
  }

  /**
   *
   *
   * @param {DragEvent} event
   */
  #handleDragLeaveSeparator(event) {
    const separator = event.target;
    const separatorId = separator.getAttribute('separator-id');
    const currentSelectedSeparatorId =
      this.#currentSelectedSeparator?.getAttribute('separator-id') ?? null;

    if (separatorId === currentSelectedSeparatorId) {
      this.#currentSelectedSeparator?.classList?.remove('active');
      this.#currentSelectedSeparator = null;
    }
  }
}
