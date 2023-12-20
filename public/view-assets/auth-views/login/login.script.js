import { InputComponent } from '../../common/components/input/input.component.js';

/** @type {InputComponent} */
let emailInputComponent = null;

/** @type {InputComponent} */
let passwordInputComponent = null;

document.addEventListener('DOMContentLoaded', async () => {
  loadAndRenderComponents();
  loadEventListeners();
});

function loadAndRenderComponents() {
  loadAndRenderEmailInput();
  loadAndRenderPasswordInput();
}

function loadAndRenderEmailInput() {
  emailInputComponent = new InputComponent('email-input');
  emailInputComponent.placeholder = 'Email';
  emailInputComponent.backgroundColor = 'var(--blue1)';
  emailInputComponent.placeholderColor = 'var(--yellow1)';
  emailInputComponent.render();
}

function loadAndRenderPasswordInput() {
  passwordInputComponent = new InputComponent('password-input');
  passwordInputComponent.placeholder = 'Contraseña';
  passwordInputComponent.backgroundColor = 'var(--blue1)';
  passwordInputComponent.placeholderColor = 'var(--yellow1)';
  // passwordInputComponent.HTMLComponents.inputHTMLComponent.type = 'password';
  passwordInputComponent.render();
}

function loadEventListeners() {
  loadButtonOnClickEvent();
}

function loadButtonOnClickEvent() {
  const button = document.getElementById('login-button');
  button.addEventListener('click', handleLoginButtonClick);
}

function handleLoginButtonClick() {}
