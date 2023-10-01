export class MovieScreeningSelectorComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #movieScreeningsSelectorHTMLContainer = null;

  /** @type {object[]} */
  #movieScreenings = [];

  /** @type {object} */
  #selectedScreening = null;

  /** @type {Function} */
  #onScreeningSelectCallbackFn = null;

  /** @type {boolean} */
  #isLoading = false;

  get selectedScreening() {
    return this.#selectedScreening;
  }

  set selectedScreening(screening) {
    this.#selectedScreening = screening;
    this.#createAndAppendMovieScreeningsListContainer();
  }

  get movieScreenings() {
    return this.#movieScreenings;
  }

  set movieScreenings(movieScreenings) {
    this.#movieScreenings = movieScreenings;
    this.#createAndAppendMovieScreeningsListContainer();
  }

  set onScreeningSelect(callbackFn) {
    this.#onScreeningSelectCallbackFn = callbackFn;
  }

  set loading(loading) {
    this.#isLoading = loading;
    if (this.#isLoading) {
      this.#createAndAppendLoadingAnimation();
    } else {
      this.#createAndAppendMovieScreeningsListContainer();
    }
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(
        `[MovieScreeningSelectorComponent] Element #${parentContainerId} was not found`,
      );

    this.#movieScreeningsSelectorHTMLContainer =
      this.#createMovieScreeningsSelectorComponentContainer();
    this.#movieScreeningsSelectorHTMLContainer.style.display = 'none';
    this.#parentContainerHTMLComponent.appendChild(
      this.#movieScreeningsSelectorHTMLContainer,
    );
  }

  render() {
    this.#movieScreeningsSelectorHTMLContainer.style.display = 'block';
  }

  #createMovieScreeningsSelectorComponentContainer() {
    const container = document.createElement('section');
    container.className = 'movie-screenings-container';

    return container;
  }

  #createAndAppendLoadingAnimation() {
    // remove existing content
    this.#movieScreeningsSelectorHTMLContainer.innerHTML = '';
    const loadingText = document.createElement('p');
    loadingText.innerHTML = 'Loading...';
    this.#movieScreeningsSelectorHTMLContainer.appendChild(loadingText);
  }

  #createAndAppendMovieScreeningsListContainer() {
    // remove existing content
    this.#movieScreeningsSelectorHTMLContainer.innerHTML = '';
    // Create and append list
    this.#buildAndAppendList();
  }

  #buildAndAppendList() {
    const datesList = this.#getDifferentDatesFromMovieScreenings();
    if (datesList.length === 0) {
      const emptySection = document.createElement('p');
      emptySection.innerHTML = 'No hay nada que ver';
      this.#movieScreeningsSelectorHTMLContainer.appendChild(emptySection);
      return;
    }

    for (const date of datesList) {
      const dateScreeningsContainer = document.createElement('section');
      this.#movieScreeningsSelectorHTMLContainer.appendChild(
        dateScreeningsContainer,
      );
      dateScreeningsContainer.className = 'date-screenings-container';
      const dateText = document.createElement('h3');
      dateScreeningsContainer.appendChild(dateText);
      dateText.innerHTML = date.toLocaleDateString();

      const screeningsContainer = document.createElement('section');
      dateScreeningsContainer.appendChild(screeningsContainer);
      screeningsContainer.className = 'date-screenings-table';

      const dateScreenings = this.#getDateScreenings(date);
      for (const screening of dateScreenings) {
        const screeningHTMLRow = this.#createScreeningHTMLRow(screening);
        screeningsContainer.appendChild(screeningHTMLRow);
      }
    }
  }

  #getDifferentDatesFromMovieScreenings() {
    const dates = [];
    for (const screening of this.#movieScreenings) {
      const { startsAt } = screening;
      const dateSetTo00 = this.#getDateSetTo00(startsAt);
      const exists = dates.find(
        (date) => date.toISOString() === dateSetTo00.toISOString(),
      );
      if (!exists) dates.push(dateSetTo00);
    }
    return dates;
  }

  #getDateSetTo00(date) {
    date = new Date(date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  #getDateScreenings(date) {
    return this.#movieScreenings.filter((screening) => {
      const { startsAt } = screening;
      return date.toLocaleDateString() === startsAt.toLocaleDateString();
    });
  }

  #createScreeningHTMLRow(screeningData) {
    const rowHTMLContainer = document.createElement('section');
    rowHTMLContainer.className = `screening-row ${
      this.#selectedScreening?.id === screeningData.id
        ? 'selected-screening-row'
        : ''
    }`;
    rowHTMLContainer.setAttribute('screening-id', screeningData.id);

    const movieLanguageHTML = document.createElement('p');
    rowHTMLContainer.appendChild(movieLanguageHTML);
    movieLanguageHTML.innerHTML = screeningData.language.name;

    const roomTypeHTML = document.createElement('p');
    rowHTMLContainer.appendChild(roomTypeHTML);
    roomTypeHTML.innerHTML = screeningData.roomType.name;

    const timeHTML = document.createElement('p');
    rowHTMLContainer.appendChild(timeHTML);
    timeHTML.innerHTML = screeningData.startsAt
      .toLocaleTimeString()
      .substr(0, 5);

    const selectButtonHTML = document.createElement('button');
    rowHTMLContainer.appendChild(selectButtonHTML);
    selectButtonHTML.innerHTML =
      this.#selectedScreening?.id === screeningData.id
        ? 'Seleccionado'
        : 'Seleccionar';
    selectButtonHTML.addEventListener('click', () => {
      this.#onScreeningRowButtonClick(screeningData);
    });

    return rowHTMLContainer;
  }

  #onScreeningRowButtonClick(screening) {
    if (this.#selectedScreening) this.#unselectHTMLRow(this.#selectedScreening);
    this.#selectHTMLRow(screening);

    this.#selectScreening(screening);
  }

  #unselectHTMLRow(screening) {
    const currentSelectedScreeningRow = document.querySelector(
      `[screening-id="${screening.id}"]`,
    );
    if (!currentSelectedScreeningRow) return;

    currentSelectedScreeningRow.className =
      currentSelectedScreeningRow.className.replace(
        'selected-screening-row',
        '',
      );
    currentSelectedScreeningRow.children[3].innerHTML = 'Seleccionar';
  }

  #selectHTMLRow(screening) {
    const newSelectedScreeningRow = document.querySelector(
      `[screening-id="${screening.id}"]`,
    );
    newSelectedScreeningRow.className = `${newSelectedScreeningRow.className} selected-screening-row`;
    newSelectedScreeningRow.children[3].innerHTML = 'Seleccionado';
  }

  #selectScreening(screening) {
    this.#selectedScreening = screening;
    if (this.#onScreeningSelectCallbackFn)
      this.#onScreeningSelectCallbackFn(screening);
  }
}
