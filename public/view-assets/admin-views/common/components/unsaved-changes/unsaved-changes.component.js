export class UnsavedChangesButtonsComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #componentContainerHTMLComponent = null;

  /** @type {boolean} */
  #displayDiscardButton = true;

  /** @type {boolean} */
  #displaySaveButton = true;

  /** @type {string} */
  #message = 'Hay cambios sin guardar';

  /** @type {string} */
  #discardButtonText = 'Descartar';

  /** @type {string} */
  #saveButtonText = 'Guardar';

  /** @type {Function} */
  #onDiscardButtonClick = null;

  /** @type {Function} */
  #onSaveButtonClick = null;

  /**
   *
   * @param {boolean} shouldDisplay
   */
  set displayDiscardButton(shouldDisplay) {
    this.#displayDiscardButton = shouldDisplay;
    this.#createAndAppendComponent();
  }

  /**
   *
   * @param {boolean} shouldDisplay
   */
  set displaySaveButton(shouldDisplay) {
    this.#displaySaveButton = shouldDisplay;
    this.#createAndAppendComponent();
  }

  /**
   *
   * @param {string} message
   */
  set message(message) {
    this.#message = message;
    this.#createAndAppendComponent();
  }

  /**
   *
   * @param {string} text
   */
  set discardButtonText(text) {
    this.#discardButtonText = text;
    this.#createAndAppendComponent();
  }

  /**
   *
   * @param {string} text
   */
  set saveButtonText(text) {
    this.#saveButtonText = text;
    this.#createAndAppendComponent();
  }

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

    this.#createAndAppendComponent();
    this.#hideComponent();
  }

  #createAndAppendComponent() {
    const componentContainer = this.#createComponent();
    this.#parentContainerHTMLComponent.replaceChildren(componentContainer);
    this.#componentContainerHTMLComponent = componentContainer;
  }

  #createComponent() {
    const container = document.createElement('section');
    container.classList.add('unsaved-changes-buttons');

    const text = document.createElement('p');
    text.innerHTML = this.#message;
    container.append(text);

    if (this.#displayDiscardButton) {
      const discardButton = document.createElement('button');
      discardButton.innerHTML = this.#discardButtonText;
      discardButton.classList.add('button', 'small-button', 'button-2');
      discardButton.addEventListener('click', () => {
        if (this.#onDiscardButtonClick) this.#onDiscardButtonClick();
      });
      container.append(discardButton);
    }

    if (this.#displaySaveButton) {
      const saveButton = document.createElement('button');
      saveButton.innerHTML = this.#saveButtonText;
      saveButton.classList.add('button', 'small-button', 'button-3');
      saveButton.addEventListener('click', () => {
        if (this.#onSaveButtonClick) this.#onSaveButtonClick();
      });
      container.append(saveButton);
    }

    return container;
  }

  #displayComponent() {
    this.#componentContainerHTMLComponent.style.display = 'flex';
  }

  #hideComponent() {
    this.#componentContainerHTMLComponent.style.display = 'none';
  }
}
