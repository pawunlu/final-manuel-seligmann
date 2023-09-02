export class ReservationNavigationButtons {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {boolean} */
  #enablePreviousButton = true;
  /** @type {boolean} */
  #enableNextButton = true;

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
    this.#enablePreviousButton = true;
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
    previousButton.innerHTML = 'Volver';
    previousButton.className = `previous-button ${
      this.enablePreviousButton ? '' : 'disabled-button'
    }`;
    buttonsContainer.appendChild(previousButton);

    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Siguiente';
    nextButton.className = `next-button ${
      this.enableNextButton ? '' : 'disabled-button'
    }`;
    buttonsContainer.appendChild(nextButton);

    return buttonsContainer;
  }
}
