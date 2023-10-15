const RESERVATION_STEPS = {
  'movie-selection': 0,
  'movie-screening-selection': 1,
  'room-seats-selection': 2,
  'user-data-form': 3,
  'reservation-summary': 4,
};

const RESERVATION_STEPS_NAMES = {
  'movie-selection': 'Película',
  'movie-screening-selection': 'Función',
  'room-seats-selection': 'Asientos',
  'user-data-form': 'Datos',
  'reservation-summary': 'Resumen',
};

export class ReservationStepInfo {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {0 | 1 | 2 | 3 | 4} */
  #currentStep = RESERVATION_STEPS['movie-selection'];

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(
        `[ReservationStepInfo] Element #${parentContainerId} was not found`,
      );
  }

  /**
   *
   *
   * @param {keyof typeof RESERVATION_STEPS} step - Reservation step
   */
  get currentStep() {
    return this.#currentStep;
  }

  /**
   *
   *
   * @param {keyof typeof RESERVATION_STEPS} step - Reservation step
   */
  set currentStep(currentStep) {
    this.#currentStep = RESERVATION_STEPS[currentStep];
    this.#removeOrAddClassesToTheSteps();
  }

  /**
   *
   *
   * @param {keyof typeof RESERVATION_STEPS} step - Reservation step
   */
  setStep(step) {
    this.#currentStep = step;
    this.render();
  }

  nextStep() {
    ++this.#currentStep;
    this.render();
  }

  previousStep() {
    --this.#currentStep;
    this.render();
  }

  render() {
    const stepInfoElement = this.#createStepInfoElement();
    this.#parentContainerHTMLComponent.replaceChildren(stepInfoElement);
  }

  #createStepInfoElement() {
    const container = document.createElement('section');
    container.className = 'steps-info';

    for (const step of Object.keys(RESERVATION_STEPS)) {
      const stepElement = document.createElement('section');
      stepElement.id = `${step}-step-info`;
      stepElement.className = `step ${step}`;

      const stepName = document.createElement('p');
      stepName.innerHTML = RESERVATION_STEPS_NAMES[step];
      stepElement.appendChild(stepName);

      const stepNumber = document.createElement('p');
      stepNumber.innerHTML = RESERVATION_STEPS[step];
      stepElement.appendChild(stepNumber);

      container.appendChild(stepElement);
    }

    return container;
  }

  #removeOrAddClassesToTheSteps() {
    const [stepsContainer] = this.#parentContainerHTMLComponent.children;
    if (!stepsContainer) return;
    const steps = stepsContainer.children;
    for (let index = 0; index < steps.length; index++) {
      const step = steps[index];
      if (index === this.#currentStep) {
        step.className = `${step.className} active-step`;
      } else {
        step.className = step.className.replaceAll('active-step', '');
      }
    }
  }
}
