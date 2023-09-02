export class InputComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #inputContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #inputHTMLComponent = null;

  /** @type {HTMLElement} */
  #labelHTMLComponent = null;

  /** @type {HTMLElement} */
  #resetButtonHTMLComponent = null;

  /** @type {HTMLElement} */
  #errorMessageHTMLComponent = null;

  /** @type {string} */
  #text = '';
  get text() {
    return this.#text;
  }
  set text(text) {
    this.#text = text;
    this.#inputHTMLComponent.value = text;
    this.#displayResetButtonIfNecessary();

    if (this.#validationRegex && this.#text) {
      this.#isTextValid(text)
        ? this.#hideErrorMessage()
        : this.#displayErrorMessage();
    } else {
      this.#hideErrorMessage();
    }
  }

  /** @type {RegExp} */
  #validationRegex = null;
  get validationRegex() {
    return this.#validationRegex;
  }
  set validationRegex(newValidationRegex) {
    this.#validationRegex = newValidationRegex;
  }

  /** @type {string} */
  #regexErrorMessage = null;
  get regexErrorMessage() {
    this.#regexErrorMessage;
  }
  set regexErrorMessage(newRegexErrorMessage) {
    this.#regexErrorMessage = newRegexErrorMessage;
    this.#errorMessageHTMLComponent.innerHTML = newRegexErrorMessage;
  }

  /** @type {boolean} */
  #showResetButton = true;
  get showResetButton() {
    return this.#showResetButton;
  }

  set showResetButton(newWithResetButton) {
    this.#showResetButton = newWithResetButton;
    this.#displayResetButtonIfNecessary();
  }

  /** @type {string} */
  #placeholder = '';
  get placeholder() {
    this.#placeholder;
  }

  set placeholder(newPlaceholder) {
    this.#placeholder = newPlaceholder;
    this.#labelHTMLComponent.innerHTML = newPlaceholder;
    this.#inputHTMLComponent.setAttribute('placeholder', newPlaceholder);
  }

  /** @type {string} */
  #backgroundColor = 'transparent';
  get backgroundColor() {
    this.#backgroundColor;
  }
  set backgroundColor(newBackgroundColor) {
    this.#backgroundColor = newBackgroundColor;
    this.#inputHTMLComponent.style.backgroundColor = newBackgroundColor;
  }

  /** @type {string} */
  #textColor = 'white';
  get textColor() {
    this.#textColor;
  }
  set textColor(newTextColor) {
    this.#textColor = newTextColor;
    this.#inputHTMLComponent.style.color = newTextColor;
  }

  /** @type {string} */
  #placeholderColor = 'white';
  get placeholderColor() {
    this.#placeholderColor;
  }
  set placeholderColor(newPlaceholderColor) {
    this.#placeholderColor = newPlaceholderColor;
    this.#labelHTMLComponent.style.color = newPlaceholderColor;
  }

  /** @type {string} */
  #resetButtonColor = 'black';
  get resetButtonColor() {
    this.#resetButtonColor;
  }
  set resetButtonColor(newResetButtonColor) {
    this.#resetButtonColor = newResetButtonColor;
    this.#resetButtonHTMLComponent.style.color = newResetButtonColor;
  }

  /** @type {string} */
  #resetButtonBackgroundColor = '#ffffff5c';
  get resetButtonBackgroundColor() {
    this.#resetButtonBackgroundColor;
  }
  set resetButtonBackgroundColor(newResetButtonBackgroundColor) {
    this.#resetButtonBackgroundColor = newResetButtonBackgroundColor;
    this.#resetButtonHTMLComponent.style.backgroundColor =
      newResetButtonBackgroundColor;
  }

  get HTMLComponents() {
    return {
      inputHTMLComponentContainer: this.#inputContainerHTMLComponent,
      inputHTMLComponent: this.#inputHTMLComponent,
      labelHTMLComponent: this.#labelHTMLComponent,
      resetButtonHTMLComponent: this.#resetButtonHTMLComponent,
      errorMessageHTMLComponent: this.#errorMessageHTMLComponent,
    };
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(`Element with ID "${parentContainerId}" was not found`);

    const inputContainer = this.#createInputContainer();
    inputContainer.style.display = 'none';
    this.#parentContainerHTMLComponent.appendChild(inputContainer);
  }

  render() {
    this.#inputContainerHTMLComponent.style.display = 'block';
  }

  #createInputContainer() {
    const inputContainer = document.createElement('div');
    this.#inputContainerHTMLComponent = inputContainer;
    inputContainer.setAttribute(
      'id',
      `${this.#parentContainerHTMLComponent.id}-input-container`,
    );
    inputContainer.classList = 'form-group field';

    const input = document.createElement('input');
    this.#inputHTMLComponent = input;
    input.setAttribute('id', `${this.#parentContainerHTMLComponent.id}-input`);
    input.setAttribute(
      'name',
      `${this.#parentContainerHTMLComponent.id}-input`,
    );
    input.setAttribute('type', 'input');
    input.setAttribute('placeholder', this.#placeholder);
    input.value = this.#text;
    input.classList = 'input-field';
    input.style.backgroundColor = this.#backgroundColor;
    input.style.color = this.#textColor;
    input.addEventListener(
      'input',
      (event) => (this.text = event.target.value),
    );

    inputContainer.appendChild(input);

    const label = document.createElement('label');
    this.#labelHTMLComponent = label;
    label.setAttribute('id', `${this.#parentContainerHTMLComponent.id}-label`);
    label.setAttribute('for', `${this.#parentContainerHTMLComponent.id}-input`);
    label.innerHTML = this.#placeholder;
    label.classList = 'input-label';
    label.style.color = this.#placeholderColor;
    inputContainer.appendChild(label);

    const resetButton = document.createElement('button');
    this.#resetButtonHTMLComponent = resetButton;
    resetButton.setAttribute(
      'id',
      `${this.#parentContainerHTMLComponent.id}-reset-button`,
    );
    resetButton.setAttribute('type', 'reset');
    resetButton.classList = 'reset-button';
    resetButton.style.setProperty(
      '--reset-button-background-color',
      this.#resetButtonBackgroundColor,
    );
    resetButton.style.color = this.#resetButtonColor;
    input.style.paddingRight = '35px';
    resetButton.style.display = this.#text ? 'block' : 'none';
    resetButton.addEventListener('click', () => (this.text = ''));
    inputContainer.appendChild(resetButton);
    if (!this.#showResetButton) resetButton.style.display = 'none';

    const errorMessage = document.createElement('p');
    this.#errorMessageHTMLComponent = errorMessage;
    errorMessage.setAttribute(
      'id',
      `${this.#parentContainerHTMLComponent.id}-regex-error-message`,
    );
    errorMessage.innerHTML = this.#regexErrorMessage;
    errorMessage.classList = 'input-regex-error';
    errorMessage.style.display = 'none';
    inputContainer.appendChild(errorMessage);

    return inputContainer;
  }

  #isTextValid(text) {
    return this.#validationRegex.test(text);
  }

  #displayResetButtonIfNecessary() {
    if (this.#showResetButton && this.#text) {
      this.#displayResetButton();
    } else {
      this.#hideResetButton();
    }
  }

  #hideResetButton() {
    this.#resetButtonHTMLComponent.style.display = 'none';
  }

  #displayResetButton() {
    this.#resetButtonHTMLComponent.style.display = 'block';
  }

  #displayErrorMessage() {
    this.enableBorderColorAsError();
    this.#errorMessageHTMLComponent.style.display = 'block';
  }

  #hideErrorMessage() {
    this.disableBorderColorAsError();
    this.#errorMessageHTMLComponent.style.display = 'none';
  }

  enableBorderColorAsError() {
    this.#inputHTMLComponent.style.borderBottom = '1px solid red';
    this.#labelHTMLComponent.style.color = 'red';
  }

  disableBorderColorAsError() {
    this.#inputHTMLComponent.style.borderBottom = '1px solid transparent';
    this.#labelHTMLComponent.style.color = this.#placeholderColor;
  }

  onResizeEvent(callbackFn) {
    const observer = new ResizeObserver((entries) => {
      callbackFn({
        width: entries[0].borderBoxSize[0].inlineSize,
        height: entries[0].borderBoxSize[0].blockSize,
      });
    });
    observer.observe(this.#inputContainerHTMLComponent);
  }

  onFocusEvent(callbackFn) {
    this.#inputHTMLComponent.addEventListener('focus', (event) =>
      callbackFn(event),
    );
  }

  onBlurEvent(callbackFn) {
    this.#inputHTMLComponent.addEventListener('blur', (event) =>
      callbackFn(event),
    );
  }

  onResetButtonClick(callbackFn) {
    this.#resetButtonHTMLComponent.addEventListener('click', (event) =>
      callbackFn(event),
    );
  }
}
