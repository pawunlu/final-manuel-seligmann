class MovieSelector {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(
        `[MovieSelector] Element #${parentContainerId} was not found`,
      );
  }

  render() {
    const movieSelectorElement = this.#createMovieSelectorElement();
    this.#parentContainerHTMLComponent.replaceChildren(movieSelectorElement);
  }

  #createMovieSelectorElement() {}
}
