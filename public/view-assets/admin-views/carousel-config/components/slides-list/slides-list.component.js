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
    this.#parentContainerHTMLComponent.appendChild(listContainer);
  }

  #createListContainer() {
    const container = document.createElement('section');
    container.classList.add('slides-list');

    for (const item of this.#slides) {
      const slide = this.#createSlideItem(item);
      container.appendChild(slide);
    }

    return container;
  }

  /**
   *
   *
   * @param {Movie} item
   * @returns {HTMLElement}
   */
  #createSlideItem(item) {
    const slideContainer = document.createElement('section');
    slideContainer.classList.add('slide');

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

    const positionIndex = document.createElement('p');
    positionIndex.classList.add('carousel-index-position');
    positionIndex.innerHTML = item.carouselPositionIndex + 1;
    container.appendChild(positionIndex);

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
}
