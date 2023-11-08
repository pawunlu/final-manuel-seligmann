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
    const [stepInfoForDesktop, stepInfoForMobile] =
      this.#createStepInfoElements();
    this.#parentContainerHTMLComponent.replaceChildren(
      stepInfoForDesktop,
      stepInfoForMobile,
    );
  }

  #createStepInfoElements() {
    const stepInfoElementForDesktopView =
      this.#createStepInfoElementForDesktopView();

    const stepInfoElementForMobileView = this.#stepInfoElementForMobileView();

    return [stepInfoElementForDesktopView, stepInfoElementForMobileView];
  }

  #createStepInfoElementForDesktopView() {
    const containerForDesktopView = document.createElement('section');
    containerForDesktopView.className = 'desktop-steps-info';

    for (const step of Object.keys(RESERVATION_STEPS)) {
      const stepElement = document.createElement('section');
      stepElement.className = `step desktop-view-step ${step}`;

      const stepName = document.createElement('p');
      stepName.innerHTML = RESERVATION_STEPS_NAMES[step];
      stepElement.appendChild(stepName);

      const stepNumber = document.createElement('p');
      stepNumber.innerHTML = RESERVATION_STEPS[step] + 1;
      stepElement.appendChild(stepNumber);

      containerForDesktopView.appendChild(stepElement);
    }

    return containerForDesktopView;
  }

  #stepInfoElementForMobileView() {
    const containerForDesktopView = document.createElement('section');
    containerForDesktopView.className = 'mobile-steps-info';

    for (const step of Object.keys(RESERVATION_STEPS)) {
      const stepElement = document.createElement('section');
      stepElement.className = `step mobile-view-step ${step}`;

      const stepNumber = document.createElement('p');
      stepNumber.innerHTML = `Paso ${RESERVATION_STEPS[step] + 1} / ${
        Object.keys(RESERVATION_STEPS).length
      }`;
      stepElement.appendChild(stepNumber);

      containerForDesktopView.appendChild(stepElement);
    }

    return containerForDesktopView;
  }

  #removeOrAddClassesToTheSteps() {
    const [stepsInfoForDesktop, stepsInfoForMobile] =
      this.#parentContainerHTMLComponent.children;
    if (!stepsInfoForDesktop) return;
    const stepsForDesktop = stepsInfoForDesktop.children;
    const stepsForMobile = stepsInfoForMobile.children;
    for (let index = 0; index < stepsForDesktop.length; index++) {
      const stepForDesktop = stepsForDesktop[index];
      const stepForMobile = stepsForMobile[index];
      if (index === this.#currentStep) {
        stepForDesktop.classList.add('active-step');
        stepForMobile.classList.add('active-step');
      } else {
        stepForDesktop.classList.remove('active-step');
        stepForMobile.classList.remove('active-step');
      }
    }
  }
}
