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
    slideContainer.setAttribute('slide-index', slideIndex);
    slideContainer.setAttribute('item-id', item.id);

    const slideNavigation = this.#createSlideNavigation(item, slideIndex);
    const slideImage = this.#createSlideImage(item);
    slideContainer.append(slideNavigation, slideImage);

    return slideContainer;
  }

  /**
   *
   *
   * @param {Movie} item
   * @param {Number} slideIndex
   * @returns {HTMLElement}
   */
  #createSlideNavigation(item, slideIndex) {
    const container = document.createElement('section');
    container.classList.add('slide-navigation');

    const upwardsButton = document.createElement('section');
    upwardsButton.classList.add('icon-move-upwards');
    upwardsButton.innerHTML = '△';
    upwardsButton.addEventListener('click', () => {
      this.#handleReposition(item.id, slideIndex - 1);
    });
    container.appendChild(upwardsButton);

    const dragAndDropButton = document.createElement('section');
    dragAndDropButton.classList.add('icon-drag-and-drop');
    dragAndDropButton.innerHTML = '⫩';
    container.appendChild(dragAndDropButton);

    const downwardsButton = document.createElement('section');
    downwardsButton.classList.add('icon-move-downwards');
    downwardsButton.innerHTML = '▽';
    downwardsButton.addEventListener('click', () => {
      this.#handleReposition(item.id, slideIndex + 1);
    });
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
    itemId = Number(itemId);
    newPosition = Number(newPosition);

    // If the new position is a negative number then start counting from the end
    if (newPosition < 0) newPosition = this.#slides.length + newPosition;
    // If the new position is a higher number than the length of the slides then start counting from the beginning
    if (newPosition > this.#slides.length - 1)
      newPosition = 0 - this.#slides.length + newPosition;

    const slideIndex = this.#slides.findIndex(
      (slide) => Number(slide.id) === itemId,
    );
    if (slideIndex === -1) return;

    const slideToReposition = this.#slides[slideIndex];

    const newSlidesPositions = [...this.#slides];

    const slidesAfterNewPosition = newSlidesPositions.splice(
      slideIndex <= newPosition ? newPosition + 1 : newPosition,
    );

    const slideIndexAfterNewPosition = slidesAfterNewPosition.findIndex(
      (slide) => Number(slide.id) === itemId,
    );
    if (slideIndexAfterNewPosition >= 0)
      slidesAfterNewPosition.splice(slideIndexAfterNewPosition, 1);

    newSlidesPositions.splice(slideIndex, 1);
    newSlidesPositions.splice(
      newPosition,
      0,
      slideToReposition,
      ...slidesAfterNewPosition,
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

    const slideIndex = Number(event.dataTransfer.getData('slide-index'));
    const slide = document.querySelector(`[slide-index="${slideIndex}"]`);
    const itemId = Number(slide.getAttribute('item-id'));

    const targetSeparator = event.target;
    const separatorId = Number(targetSeparator.getAttribute('separator-id'));

    const isSeparatorDropable = this.#isSeparatorDropable(
      slideIndex,
      separatorId,
    );

    if (!isSeparatorDropable) return;

    let separators = Array.from(
      this.#listContainerHTMLComponent.querySelectorAll(`[separator-id]`),
    );
    separators = separators.filter((currentSeparator) => {
      const currentSeparatorId = currentSeparator.getAttribute('separator-id');
      return this.#isSeparatorDropable(slideIndex, currentSeparatorId);
    });

    const separatorIndex = separators.findIndex(
      (separator) => separator === targetSeparator,
    );

    this.#handleReposition(itemId, separatorIndex);
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

    const slideIndex = slide.getAttribute('slide-index');
    event.dataTransfer.setData('slide-index', slideIndex);

    const separators = document.getElementsByClassName('separator');
    for (const separator of separators) {
      const separatorId = Number(separator.getAttribute('separator-id'));
      const slideId = Number(slide.getAttribute('slide-index'));

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
