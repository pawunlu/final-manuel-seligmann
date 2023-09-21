export class RoomSeatsSelectorComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #roomSeatsSelectorHTMLContainer = null;

  /** @type {Function} */
  #onSeatSelectCallbackFn = null;

  set onSeatSelect(callbackFn) {
    this.#onSeatSelectCallbackFn = callbackFn;
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(
        `[RoomSeatsSelectorComponent] Element #${parentContainerId} was not found`,
      );

    this.#roomSeatsSelectorHTMLContainer =
      this.#createRoomSeatsSelectorComponentContainer();
    this.#roomSeatsSelectorHTMLContainer.style.display = 'none';

    this.#parentContainerHTMLComponent.appendChild(
      this.#roomSeatsSelectorHTMLContainer,
    );
  }

  render() {
    this.#roomSeatsSelectorHTMLContainer.style.display = 'block';
  }

  #createRoomSeatsSelectorComponentContainer() {
    //
  }
}
