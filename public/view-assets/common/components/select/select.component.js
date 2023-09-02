import { InputComponent } from '../input/Input.component.js';

export class SelectComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #selectContainerHTMLComponent = null;

  /** @type {InputComponent} */
  #inputComponent = null;

  /** @type {HTMLElement} */
  #optionsContainerHTMLComponent = null;

  #options = [];

  #selectedOption = null;

  #displayingOptions = false;

  /** @type {Function} */
  #onSelectCallbackFn = null;

  get selectedOption() {
    return this.#selectedOption;
  }

  set selectedOption(option) {
    this.#setSelectedOption(option);
  }

  get options() {
    return this.#options;
  }

  set options(options) {
    this.#options = options;
    this.#appendOptionsToContainer(options);
  }

  get placeholder() {
    return this.#inputComponent.placeholder;
  }

  set placeholder(placeholder) {
    this.#inputComponent.placeholder = placeholder;
  }

  get backgroundColor() {
    return this.#inputComponent.backgroundColor;
  }

  set backgroundColor(backgroundColor) {
    this.#inputComponent.backgroundColor = backgroundColor;
  }

  get placeholderColor() {
    return this.#inputComponent.placeholderColor;
  }

  set placeholderColor(placeholderColor) {
    this.#inputComponent.placeholderColor = placeholderColor;
  }

  set onSelect(callbackFn) {
    this.#onSelectCallbackFn = callbackFn;
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(`Element with ID "${parentContainerId}" was not found`);

    const selectComponentContainer = this.#createSelectComponentContainer();
    selectComponentContainer.style.display = 'none';
    this.#parentContainerHTMLComponent.appendChild(selectComponentContainer);
  }

  render() {
    this.#selectContainerHTMLComponent.style.display = 'block';
  }

  #createSelectComponentContainer() {
    const selectContainer = document.createElement('div');
    selectContainer.setAttribute(
      'id',
      `${this.#parentContainerHTMLComponent.id}-select-container`,
    );
    selectContainer.classList = 'select';
    this.#selectContainerHTMLComponent = selectContainer;
    this.#parentContainerHTMLComponent.appendChild(selectContainer);

    const inputComponent = new InputComponent(
      `${this.#parentContainerHTMLComponent.id}-select-container`,
    );
    inputComponent.showResetButton = false;
    inputComponent.HTMLComponents.inputHTMLComponent.readOnly = true;
    inputComponent.render();
    this.#inputComponent = inputComponent;

    const optionsContainer = this.#createOptionsContainerElement();
    optionsContainer.style.display = 'none';
    this.#optionsContainerHTMLComponent = optionsContainer;
    selectContainer.appendChild(optionsContainer);

    this.#appendOptionsToContainer(this.#options);

    inputComponent.onFocusEvent((event) => {
      this.#displayOptionsContainer();
    });
    inputComponent.onResizeEvent((size) => {
      // TODO: Cambiar esto para que el size del options sea el mismo que el input
      const inputWidth = size.width;
      this.#optionsContainerHTMLComponent.style.width = `${inputWidth}px`;
    });

    document.addEventListener('mouseup', (event) => {
      if (!this.#displayingOptions) return;

      const shouldCloseOptionsList = this.#shouldHideOptionsContainer(
        event.target,
      );
      if (shouldCloseOptionsList) {
        this.#hideOptionsContainer();
      } else {
        event.preventDefault();
      }
    });

    return selectContainer;
  }

  #appendOptionsToContainer(options) {
    this.#deleteOptionsContainerChildren();

    const container = this.#optionsContainerHTMLComponent;

    for (const option of options) {
      const optionHTMLContainer = document.createElement('div');
      optionHTMLContainer.className = `select-option ${
        this.#selectedOption?.id === option.id ? 'selected-option' : ''
      }`;
      optionHTMLContainer.setAttribute('option-id', option.id);
      optionHTMLContainer.setAttribute('option-name', option.name);
      optionHTMLContainer.addEventListener('click', () =>
        this.#setSelectedOption(option),
      );
      container.appendChild(optionHTMLContainer);
      const text = document.createElement('p');
      text.innerHTML = option.name;
      optionHTMLContainer.appendChild(text);
    }
  }

  #deleteOptionsContainerChildren() {
    this.#optionsContainerHTMLComponent.innerHTML = '';
  }

  #createOptionsContainerElement() {
    const optionsContainer = document.createElement('div');
    optionsContainer.setAttribute(
      'id',
      `${this.#parentContainerHTMLComponent.id}-select-options-container`,
    );
    optionsContainer.classList = 'select-options-container';

    return optionsContainer;
  }

  #displayOptionsContainer() {
    this.#displayingOptions = true;
    this.#optionsContainerHTMLComponent.style.display = 'block';

    const inputWidth =
      this.#inputComponent.HTMLComponents.inputHTMLComponentContainer
        .offsetWidth;
    this.#optionsContainerHTMLComponent.style.width = `${inputWidth}px`;
  }

  #hideOptionsContainer() {
    this.#optionsContainerHTMLComponent.style.display = 'none';
    this.#displayingOptions = false;
    this.#inputComponent.HTMLComponents.inputHTMLComponent.blur();
  }

  #shouldHideOptionsContainer(targetClicked) {
    // Only close if the target clicked is not the input or when an option is selected
    if (
      targetClicked === this.#inputComponent.HTMLComponents.inputHTMLComponent
    )
      return false;
    if (targetClicked === this.#optionsContainerHTMLComponent) return false;

    return true;
  }

  #setSelectedOption(option) {
    this.#selectedOption = option;
    this.#inputComponent.text = option.name;
    this.#appendOptionsToContainer(this.#options);
    if (this.#onSelectCallbackFn) this.#onSelectCallbackFn(option);
  }
}
