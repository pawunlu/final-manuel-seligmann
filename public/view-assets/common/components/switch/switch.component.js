export class SwitchComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #switchContainerHTMLComponent = null;

  /** @type {HTMLInputElement } */
  #inputContainerHTMLComponent = null;

  /** @type {Function} */
  #onChangeCallbackFn = null;

  set onChange(callbackFn) {
    this.#onChangeCallbackFn = callbackFn;
  }

  /** @type {boolean} */
  #checked = true;

  set checked(checked) {
    this.#checked = checked;
    this.#inputContainerHTMLComponent.checked = checked;
  }

  get checked() {
    return this.#checked;
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(`Element with ID "${parentContainerId}" was not found`);
    this.#switchContainerHTMLComponent = this.#inputComponentContainer();
    this.#switchContainerHTMLComponent.style.display = 'none';
    this.#parentContainerHTMLComponent.appendChild(
      this.#switchContainerHTMLComponent,
    );
  }

  render() {
    this.#switchContainerHTMLComponent.style.display = 'block';
  }

  #inputComponentContainer() {
    const selectContainer = document.createElement('section');
    selectContainer.classList.add('switch-container');

    const input = document.createElement('input');
    this.#inputContainerHTMLComponent = input;
    input.type = 'checkbox';
    input.id = `${this.#parentContainerHTMLComponent.id}-switch`;
    input.checked = this.#checked;
    input.addEventListener('change', this.#handleOnChange.bind(this));

    const label = document.createElement('label');
    label.classList.add('switch-label');
    label.setAttribute('for', input.id);

    selectContainer.append(input, label);

    return selectContainer;
  }

  #handleOnChange(event) {
    this.#checked = event.target.checked;
    if (this.#onChangeCallbackFn) this.#onChangeCallbackFn(this.#checked);
  }
}
