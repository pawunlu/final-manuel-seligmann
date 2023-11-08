/**
 * represents a Movie
 * @typedef {Object} Movie
 * @property {string} id - Movie's ID
 * @property {string} name - Movie's Name
 * @property {number} calification - Movie's Calification
 * @property {string} imageUrl - Movie's image url
 * @property {string} bannerName - Movie's Banner url
 * @property {number} durationInMinutes - Movie's duration in minutes
 * @property {Date} createdAt - The date the Movie was created
 */

export class CarouselComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #carouselHTMLContainer = null;

  /** @type {HTMLElement} */
  #carouselSliderHTMLContainer = null;

  /** @type {HTMLElement} */
  #carouselDotsHTMLContainer = null;

  /** @type {number} */
  #currentSlide = 0;

  /** @type {Movie} */
  #items = [];

  set items(items) {
    this.#items = items;
    this.#resetCarouselContent();
  }

  get items() {
    return this.#items;
  }

  /** @type {Function} */
  #onSlideClickCallbackFn = null;

  /**
   *
   * @param {function(Movie)} callbackFn
   */
  set onSlideClick(callbackFn) {
    this.#onSlideClickCallbackFn = callbackFn;
  }

  /** @type {Function} */
  #onReservationButtonClickCallbackFn = null;

  /**
   *
   * @param {function(Movie)} callbackFn
   */
  set onReservationButtonClick(callbackFn) {
    this.#onReservationButtonClickCallbackFn = callbackFn;
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);

    if (!this.#parentContainerHTMLComponent)
      throw new Error(
        `[CarouselComponent] Element #${parentContainerId} was not found`,
      );

    this.#carouselHTMLContainer = this.#createCarouselComponentContainer();
    this.#changeDisplayingSlide();

    this.#carouselHTMLContainer.style.display = 'none';

    this.#parentContainerHTMLComponent.appendChild(this.#carouselHTMLContainer);
  }

  render() {
    this.#carouselHTMLContainer.style.display = 'block';
  }

  #resetCarouselContent() {
    this.#parentContainerHTMLComponent.innerHTML = '';
    this.#carouselHTMLContainer = this.#createCarouselComponentContainer();
    this.#changeDisplayingSlide();
    this.#parentContainerHTMLComponent.appendChild(this.#carouselHTMLContainer);
  }

  #createCarouselComponentContainer() {
    const container = document.createElement('div');
    container.classList.add('container-component');

    const slider = document.createElement('div');
    this.#carouselSliderHTMLContainer = slider;
    slider.classList.add('slider');
    container.appendChild(slider);

    if (this.#items.length) {
      // Iterate through every movie
      for (const item of this.#items) {
        slider.appendChild(this.#createSlide(item));
      }

      const dotsContainer = this.#createDotsContainer();
      this.#carouselDotsHTMLContainer = dotsContainer;
      container.appendChild(dotsContainer);

      const previousButton = this.#createPreviousButton();
      container.appendChild(previousButton);
      const nextButton = this.#createNextButton();
      container.appendChild(nextButton);
    } else {
      // Create empty carousel
      slider.appendChild(this.#createEmptyCarouselSlide());
    }

    return container;
  }

  /**
   *
   *
   * @param {Movie} movie
   */
  #createSlide(movie) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.addEventListener('click', (event) => {
      if (
        this.#isElementPartOfTheSlide(event.target) &&
        this.#onSlideClickCallbackFn
      )
        this.#onSlideClickCallbackFn(movie);
    });

    const image = document.createElement('section');
    const slideBackground = this.#createSlideBackgroundImage(movie.bannerName);
    image.style.backgroundImage = slideBackground;
    image.classList.add('image');
    slide.appendChild(image);

    const caption = document.createElement('figcaption');
    caption.classList.add('slide-description');
    slide.appendChild(caption);

    const captionContent = document.createElement('section');
    captionContent.classList.add('slide-description-content');
    caption.appendChild(captionContent);

    const movieTitle = document.createElement('h2');
    movieTitle.innerHTML = movie.name;
    captionContent.appendChild(movieTitle);

    const clasificationContainer = document.createElement('section');
    clasificationContainer.classList.add('clasification');
    captionContent.appendChild(clasificationContainer);

    const clasificationLabel = document.createElement('p');
    clasificationLabel.innerHTML = 'Clasificación: ';
    clasificationContainer.appendChild(clasificationLabel);

    const movieClasification = document.createElement('p');
    movieClasification.innerHTML = `${movie.calification}/10`;
    clasificationContainer.appendChild(movieClasification);

    const durationContainer = document.createElement('section');
    durationContainer.classList.add('duration');
    captionContent.appendChild(durationContainer);

    const durationLabel = document.createElement('p');
    durationLabel.innerHTML = 'Duración: ';
    durationContainer.appendChild(durationLabel);

    const movieDuration = document.createElement('p');
    movieDuration.innerHTML = `${movie.durationInMinutes} min`;
    durationContainer.appendChild(movieDuration);

    const reserveButton = document.createElement('button');
    reserveButton.innerHTML = 'Reservar';
    reserveButton.classList.add('carousel-reservation-button');
    reserveButton.addEventListener('click', () => {
      if (this.#onReservationButtonClickCallbackFn)
        this.#onReservationButtonClickCallbackFn(movie);
    });
    captionContent.appendChild(reserveButton);

    return slide;
  }

  #createEmptyCarouselSlide() {
    const slide = document.createElement('section');
    slide.classList.add('slide');
    slide.innerHTML = 'No hay peliculas destacadas';

    return slide;
  }

  /**
   *
   *
   * @param {string} url
   */
  #createSlideBackgroundImage(url) {
    return `linear-gradient(90deg, var(--blue1) 0%, rgba(17,17,25,0) 50%, var(--blue1) 100%), url("${url}")`;
  }

  #createDotsContainer() {
    const container = document.createElement('div');
    container.classList.add('carousel-dots-container');

    for (let index = 0; index < this.#items.length; index++) {
      const dot = document.createElement('button');
      container.appendChild(dot);
      dot.addEventListener('click', () => {
        this.#currentSlide = (index + this.#items.length) % this.#items.length;
        this.#changeDisplayingSlide();
      });
    }

    return container;
  }

  #prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    this.#changeDisplayingSlide();
  }

  #nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    this.#changeDisplayingSlide();
  }

  #updateSlider() {
    this.#carouselSliderHTMLContainer.style.transform = `translateX(-${
      this.#currentSlide * 100
    }%)`;
  }

  #updateDots() {
    const dotsElements = this.#carouselDotsHTMLContainer?.children ?? [];
    for (let index = 0; index < dotsElements.length; index++) {
      const dot = dotsElements[index];
      dot.classList.remove('active-dot');
      if (index === this.#currentSlide) dot.classList.add('active-dot');
    }
  }

  #changeDisplayingSlide() {
    this.#updateSlider();
    this.#updateDots();
  }

  #createPreviousButton() {
    const button = document.createElement('button');
    button.classList.add('carousel-previous-button');
    button.innerHTML = '‹';
    button.addEventListener('click', () => {
      this.#currentSlide =
        (this.#currentSlide - 1 + this.#items.length) % this.#items.length;
      this.#changeDisplayingSlide();
    });

    return button;
  }

  #createNextButton() {
    const button = document.createElement('button');
    button.classList.add('carousel-next-button');
    button.innerHTML = '›';
    button.addEventListener('click', () => {
      this.#currentSlide =
        (this.#currentSlide + 1 + this.#items.length) % this.#items.length;
      this.#changeDisplayingSlide();
    });

    return button;
  }

  #isElementPartOfTheSlide(htmlElement) {
    return htmlElement.className.includes('slide-description');
  }
}
