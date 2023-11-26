export class UnsavedChangesButtonsComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #componentContainerHTMLComponent = null;

  /** @type {Function} */
  #onDiscardButtonClick = null;

  /** @type {Function} */
  #onSaveButtonClick = null;

  /**
   *
   * @param {Function} callbackFn
   */
  set onDiscardButtonClick(callbackFn) {
    this.#onDiscardButtonClick = callbackFn;
  }

  /**
   *
   * @param {Function} callbackFn
   */
  set onSaveButtonClick(callbackFn) {
    this.#onSaveButtonClick = callbackFn;
  }

  /**
   *
   * @param {boolean} display
   */
  set display(display) {
    if (display) {
      this.#displayComponent();
    } else {
      this.#hideComponent();
    }
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(`Element with ID "${parentContainerId}" was not found`);

    const componentContainer = this.#createComponent();
    this.#parentContainerHTMLComponent.appendChild(componentContainer);
    this.#componentContainerHTMLComponent = componentContainer;
    this.#hideComponent();
  }

  #createComponent() {
    const container = document.createElement('section');
    container.classList.add('unsaved-changes-buttons');

    const text = document.createElement('p');
    text.innerHTML = 'Hay cambios sin guardar';

    const discardButton = document.createElement('button');
    discardButton.innerHTML = 'Descartar';
    discardButton.classList.add('button', 'small-button', 'button-2');
    discardButton.addEventListener('click', () => {
      if (this.#onDiscardButtonClick) this.#onDiscardButtonClick();
    });

    const saveButton = document.createElement('button');
    saveButton.innerHTML = 'Guardar';
    saveButton.classList.add('button', 'small-button', 'button-3');
    saveButton.addEventListener('click', () => {
      if (this.#onSaveButtonClick) this.#onSaveButtonClick();
    });

    container.append(text, discardButton, saveButton);

    return container;
  }

  #displayComponent() {
    this.#componentContainerHTMLComponent.style.display = 'flex';
  }

  #hideComponent() {
    this.#componentContainerHTMLComponent.style.display = 'none';
  }
}
