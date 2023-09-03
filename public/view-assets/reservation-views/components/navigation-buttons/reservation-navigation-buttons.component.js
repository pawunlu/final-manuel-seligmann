export class ReservationNavigationButtons {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {boolean} */
  #enablePreviousButton = true;
  /** @type {boolean} */
  #enableNextButton = true;

  /** @type {Function} */
  #onPreviousButtonClickCallbackFn = null;

  /** @type {Function} */
  #onNextButtonClickCallbackFn = null;

  set onPreviousButtonClick(callbackFn) {
    this.#onPreviousButtonClickCallbackFn = callbackFn;
  }

  set onNextButtonClick(callbackFn) {
    this.#onNextButtonClickCallbackFn = callbackFn;
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(
        `[ReservationNavigationButtons] Element #${parentContainerId} was not found`,
      );
  }

  enablePreviousButton() {
    this.#enablePreviousButton = true;
    this.render();
  }

  disablePreviousButton() {
    this.#enablePreviousButton = false;
    this.render();
  }

  enableNextButton() {
    this.#enableNextButton = true;
    this.render();
  }

  disableNextButton() {
    this.#enableNextButton = false;
    this.render();
  }

  render() {
    const navigationElement = this.#createNavigationButtonsElement();
    this.#parentContainerHTMLComponent.replaceChildren(navigationElement);
  }

  #createNavigationButtonsElement() {
    const buttonsContainer = document.createElement('section');
    buttonsContainer.className = 'reservation-navigation-buttons';

    const previousButton = document.createElement('button');
    buttonsContainer.appendChild(previousButton);
    previousButton.innerHTML = 'Volver';
    previousButton.className = `previous-button ${
      this.#enablePreviousButton ? '' : 'disabled-button'
    }`;
    previousButton.addEventListener('click', () => {
      if (this.#onPreviousButtonClickCallbackFn && this.#enablePreviousButton)
        this.#onPreviousButtonClickCallbackFn();
    });

    const nextButton = document.createElement('button');
    buttonsContainer.appendChild(nextButton);
    nextButton.innerHTML = 'Siguiente';
    nextButton.className = `next-button ${
      this.#enableNextButton ? '' : 'disabled-button'
    }`;
    nextButton.addEventListener('click', () => {
      if (this.#onNextButtonClickCallbackFn && this.#enableNextButton)
        this.#onNextButtonClickCallbackFn();
    });

    return buttonsContainer;
  }
}
