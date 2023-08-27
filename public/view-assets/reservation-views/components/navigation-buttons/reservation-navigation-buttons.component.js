class ReservationNavigationButtons {
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
  }

  disablePreviousButton() {
    this.#enablePreviousButton = true;
  }

  enableNextButton() {
    this.#enableNextButton = true;
  }

  disableNextButton() {
    this.#enableNextButton = false;
  }

  render() {
    const navigationElement = this.#createNavigationButtonsElement();
    this.#parentContainerHTMLComponent.replaceChildren(navigationElement);
  }

  #createNavigationButtonsElement() {}
}
