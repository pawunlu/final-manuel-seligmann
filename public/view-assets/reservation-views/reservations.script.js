import { ReservationStepInfo } from '../reservation-views/components/step-info/reservation-step-info.component.js';
import { ReservationNavigationButtons } from '../reservation-views/components/navigation-buttons/reservation-navigation-buttons.component.js';
import { SelectComponent } from '../common/components/select/select.component.js';
import { DatePickerComponent } from '../common/components/date-picker/date-picker.component.js';
import { MovieScreeningSelectorComponent } from '../reservation-views/components/movie-screening-selector/movie-screening-selector.component.js';
import { InputComponent } from '../common/components/input/Input.component.js';
import { RoomSeatsSelectorComponent } from './components/room-seats-selector/room-seats-selector.component.js';

/**
 * represents a Movie
 * @typedef {Object} Movie
 * @property {string} id - Movie's ID
 * @property {string} name - Movie's Name
 * @property {Date} createdAt - The date the Movie was created
 */

/**
 * represents a Movie Language
 * @typedef {Object} Language
 * @property {string} id - Language ID. e.g: "ingles_subtitulado"
 * @property {string} name - Language name. e.g: "Inglés Subtitulado"
 * @property {Date} createdAt - The date the language was created
 */

/**
 * represents a Room Type
 * @typedef {Object} RoomType
 * @property {number} id - Room Type ID. e.g: "3d_extreme"
 * @property {string} name - Room Type. e.g: "3D Extreme"
 * @property {string} price - Room Type. e.g: "1800.50"
 * @property {boolean} isVisible - Shows if a room type is visible
 * @property {Date} createdAt - The date the Room Type was created
 * @property {Date} updatedAt - The date the Room Type was last updated
 */

/**
 * represents a Screening
 * @typedef {Object} Screening
 * @property {number} id - Screening ID
 * @property {Date} startsAt - The date & time the screening starts
 * @property {isVisible} isVisible - Shows if a reservation is visible/enabled
 * @property {Date} cancelledAt - The date & time the reservation has be cancelled
 * @property {number} movieId - Screening's MovieId
 * @property {Movie} movie - Screening's Movie
 * @property {string} languageId - Screening's LanguageId
 * @property {Language} language - Screening's Language
 * @property {string} roomTypeId - Screening's RoomTypeId
 * @property {RoomType} roomType - Screening's Room Type
 * @property {number} remainingSeats - the number of remaining seats the screening has
 * @property {Date} createdAt - The date the screening was created
 * @property {Date} updatedAt - The date the screening was last updated
 */

/**
 * represents a Movie Screenings Endpoint response
 * @typedef {Object} MovieScreeningsResponse
 * @property {Screening} items - List of screenings
 * @property {number} page - Page number (for pagination purposes)
 * @property {number} itemsPerPage - The amount of items per page (for pagination purposes)
 * @property {number} totalItems - The amount of total items (for pagination purposes)
 * @property {number} totalPages - The amount of total pages (for pagination purposes)
 */

/**
 * represents the Movie Extra Data endpoint response
 * @typedef {Object} MovieExtraData
 * @property {RoomType} availableRoomTypes
 * @property {Language} availableLanguages
 */

const RESERVATION_STEPS = [
  'movie-selection',
  'movie-screening-selection',
  'room-seats-selection',
  'user-data-form',
  'reservation-summary',
];

/** @type {string[]} */
const loadedReservationSteps = [];

/** @type {string} */
let currentDisplayingReservationStep = null;

/** @type {string} */
let urlLanguageId = null;

/** @type {string} */
let urlRoomTypeId = null;

/** @type {Date} */
let urlDate = null;

/** @type {number} */
let selectedMovieId = null;

/** @type {Language} */
let selectedLanguage = null;

/** @type {RoomType} */
let selectedRoomType = null;

/** @type {Date} */
let selectedDate = null;

/** @type {Screening} */
let selectedMovieScreening = null;

/** @type {number} */
let selectedSeatsAmount = null;

/** @type {object[]} */
let selectedRoomSeats = [];

/** @type {string} */
let clientName = null;

/** @type {string} */
let clientEmail = null;

/** @type {string} */
let clientPhone = null;

/** @type {Language[]} */
let movieLanguages = [];

/** @type {RoomType[]} */
let movieRoomTypes = [];

/** @type {Screening[]} */
let movieScreenings = [];

/** @type {ReservationStepInfo} */
let stepInfoComponent = null;

/** @type {SelectComponent} */
let languageSelectComponent = null;

/** @type {SelectComponent} */
let roomTypeSelectComponent = null;

/** @type {DatePickerComponent} */
let datePickerComponent = null;

/** @type {MovieScreeningSelectorComponent} */
let movieScreeningSelectorComponent = null;

/** @type {RoomSeatsSelectorComponent} */
let roomSeatsSelectorComponent = null;

/** @type {InputComponent} */
let userNameInputComponent = null;

/** @type {InputComponent} */
let userEmailInputComponent = null;

/** @type {InputComponent} */
let userPhoneInputComponent = null;

/** @type {ReservationNavigationButtons} */
let navigationButtonsComponent = null;

document.addEventListener('DOMContentLoaded', async () => {
  // Cover all hideable html elements
  coverAllHideableHTMLElements();

  // get and load URL params
  fetchAndLoadURLParams();

  // Determine current reservation step based on the loaded url params
  determineInitialReservationStepToDisplay();

  // Load And Render Components (e.g. Step-Info & Navigation Componenets)
  loadAndRenderComponents();

  // Load event listeners
  loadEventListeners();

  // Display the corresponding reservation step based on the loaded url params
  await displayInitialReservationStep();

  // Load current reservation step
  // await loadCurrentReservationStep();
});

function coverAllHideableHTMLElements() {
  const hideableHTMLElements = document.querySelectorAll(
    `[hide-when-not-displaying="true"]`,
  );

  for (const element of hideableHTMLElements) {
    coverHideableHTMLElement(element);
  }
}

function coverHideableHTMLElementsExcept(...HTMLElements) {
  const allHideableHTMLElements = document.querySelectorAll(
    `[hide-when-not-displaying="true"]`,
  );

  for (const element of allHideableHTMLElements) {
    if (HTMLElements.includes(element)) {
      uncoverHideableHTMLElement(element);
    } else {
      coverHideableHTMLElement(element);
    }
  }
}

function uncoverHideableHTMLElement(element) {
  element.classList.remove('hide-element');
}

function coverHideableHTMLElement(element) {
  element.classList.add('hide-element');
}

async function displayInitialReservationStep() {
  const currentStepIndex = RESERVATION_STEPS.findIndex(
    (RESERVATION_STEP) => RESERVATION_STEP === currentDisplayingReservationStep,
  );

  updateStepSlider(currentStepIndex);
  await loadCurrentReservationStep();
}

function loadEventListeners() {
  // Add event to all the movies displayed
  addEventListenerToMovieCards();

  addEventListenerToReservationStepsSlider();

  // Add events to the "previous" and "next" buttons
  addEventListenersToNavigationButtons();
}

function fetchAndLoadURLParams() {
  const { movieId, languageId, roomTypeId, date } = getUrlParams();
  console.log(`Reservation flow started with the following params:`, {
    movieId,
    languageId,
    roomTypeId,
    date,
  });

  urlLanguageId = languageId;
  urlRoomTypeId = roomTypeId;
  urlDate = date;

  selectedMovieId = movieId || null;
}

function selectMovie(movieId) {
  // Seleccionar la html card
  selectMovieHTMLCard(movieId);

  if (selectedMovieId !== movieId) resetSelectedAttributes();

  // Setear la variable global al movie id seleccionado
  selectedMovieId = movieId;

  // Checkear el navigation buttons
  enableOrDisableNavigationButtons();
}

function resetSelectedAttributes() {
  urlLanguageId = null;
  urlRoomTypeId = null;
  urlDate = null;

  selectedMovieId = null;
  selectedLanguage = null;
  selectedRoomType = null;
  selectedDate = null;
  selectedMovieScreening = null;
  selectedSeatsAmount = null;
  selectedRoomSeats = [];
}

async function fetchAndLoadMovieData(movieId) {
  movieScreeningSelectorComponent.loading = true;
  loadDate();
  await fetchAndLoadMovieExtraData(movieId);
  await fetchAndLoadMovieScreening(
    movieId,
    selectedLanguage?.id,
    selectedRoomType?.id,
    selectedDate,
  );
  movieScreeningSelectorComponent.loading = false;
}

async function fetchAndLoadMovieExtraData(movieId) {
  const { availableLanguages, availableRoomTypes } = await fetchMovieExtraData(
    movieId,
  );

  const languages = [
    {
      id: null,
      name: 'Todos',
    },
  ];

  const roomTypes = [
    {
      id: null,
      name: 'Todos',
    },
  ];

  movieLanguages = [...languages, ...availableLanguages];
  if (urlLanguageId) {
    selectedLanguage = movieLanguages.find(
      (language) => language.id === urlLanguageId,
    );
  }

  movieRoomTypes = [...roomTypes, ...availableRoomTypes];
  if (urlRoomTypeId) {
    selectedRoomType = movieRoomTypes.find(
      (roomType) => roomType.id === urlRoomTypeId,
    );
  }
}

/**
 *
 *
 * @param {number} movieId
 * @returns {Promise<MovieExtraData>} movie extra data
 */
async function fetchMovieExtraData(movieId) {
  if (!movieId)
    throw new Error('MovieID is required to fetch Movie Extra Data');

  const url = `/api/movies/${movieId}/extra-data`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok)
    throw new Error('Something went wrong fetching Movie Extra Data', response);

  return response.json();
}

function loadDate() {
  selectedDate = urlDate;
}

async function fetchAndLoadMovieScreening(
  movieId,
  languageId,
  roomTypeId,
  date,
) {
  const response = await fetchMovieScreenings(
    movieId,
    languageId,
    roomTypeId,
    date,
  );

  const screenings = response.items.map((screening) => ({
    ...screening,
    startsAt: new Date(screening.startsAt),
  }));

  movieScreenings = screenings.filter((screening) => {
    return (
      (languageId ? screening.language.id === languageId : true) &&
      (roomTypeId ? screening.roomType.id === roomTypeId : true) &&
      (date
        ? screening.startsAt.toLocaleDateString() === date.toLocaleDateString()
        : true)
    );
  });
}

/**
 *
 *
 * @param {number} movieId
 * @param {string} languageId
 * @param {string} roomTypeId
 * @param {Date} date
 * @returns {Promise<MovieScreeningsResponse>}
 */
async function fetchMovieScreenings(movieId, languageId, roomTypeId, date) {
  if (!movieId)
    throw new Error('MovieID is required to fetch Movie Screenings');

  const searchParams = new URLSearchParams();
  if (languageId) searchParams.append('languageId', languageId);
  if (roomTypeId) searchParams.append('roomTypeId', roomTypeId);
  if (date) searchParams.append('date', date.toISOString().split('T')[0]);

  const url = `/api/reservation/screenings/movie/${movieId}?${searchParams.toString()}`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok)
    throw new Error('Something went wrong fetching Screenings', response);

  return response.json();
}

function resetMovieLanguagesSelectInput() {
  languageSelectComponent.options = [];
  languageSelectComponent.selectedOption = null;
}

function loadMovieLanguagesIntoSelectInput() {
  languageSelectComponent.options = movieLanguages;

  const defaultOption = movieLanguages.find((language) => language.id === null);

  languageSelectComponent.selectedOption = selectedLanguage || defaultOption;
}

function resetMovieRoomTypesSelectInput() {
  roomTypeSelectComponent.options = [];
  roomTypeSelectComponent.selectedOption = null;
}

function loadMovieRoomTypesIntoSelectInput() {
  roomTypeSelectComponent.options = movieRoomTypes;

  const defaultOption = movieRoomTypes.find((roomType) => roomType.id === null);

  roomTypeSelectComponent.selectedOption = selectedRoomType || defaultOption;
}

function loadDateIntoDatePickerInput() {
  datePickerComponent.selectedDate = selectedDate;
}

function resetMovieScreeningComponent() {
  movieScreeningSelectorComponent.selectedScreening = null;
  movieScreeningSelectorComponent.movieScreenings = [];
}

function loadAndRenderMovieScreeningIntoComponent() {
  movieScreeningSelectorComponent.selectedScreening = selectedMovieScreening;
  movieScreeningSelectorComponent.movieScreenings = movieScreenings;
}

function determineInitialReservationStepToDisplay() {
  currentDisplayingReservationStep = getInitialCurrentReservationStep();
}

function loadAndRenderComponents() {
  // General componenets
  loadAndRenderStepInfoComponent();
  loadAndRenderNavigationButtonsComponent();
  // Movie-screenings selection components
  loadAndRenderLanguageSelectComponent();
  loadAndRenderRoomTypesSelectComponent();
  loadAndRenderDatePickerComponent();
  loadAndRenderMovieScreeningSelectorComponent();
  // Room Seats Selection components
  loadAndRenderRoomSeatsSelectorComponent();
  // User data form Components
  loadAndRenderUserNameInput();
  loadAndRenderUserEmailInput();
  loadAndRenderUserPhoneInput();
}

function loadAndRenderStepInfoComponent() {
  stepInfoComponent = new ReservationStepInfo('step-info');
  stepInfoComponent.render();
}

function loadAndRenderLanguageSelectComponent() {
  languageSelectComponent = new SelectComponent('language-selector');
  languageSelectComponent.placeholder = 'Idioma';
  languageSelectComponent.backgroundColor = 'rgba(25, 48, 129, 0.25)';
  languageSelectComponent.placeholderColor = 'rgba(255, 197, 110, 1)';
  if (selectedMovieId && movieLanguages.length) {
    languageSelectComponent.options = movieLanguages;
    languageSelectComponent.selectedOption = movieLanguages.find(
      (language) => language.id === null,
    );
  }
  languageSelectComponent.onSelect = async (language) => {
    selectedLanguage = language;
    movieScreeningSelectorComponent.loading = true;
    await fetchAndLoadMovieScreening(
      selectedMovieId,
      selectedLanguage?.id,
      selectedRoomType?.id,
      selectedDate,
    );
    movieScreeningSelectorComponent.movieScreenings = movieScreenings;
    movieScreeningSelectorComponent.loading = false;
  };
  languageSelectComponent.render();
}

function loadAndRenderRoomTypesSelectComponent() {
  roomTypeSelectComponent = new SelectComponent('room-type-selector');
  roomTypeSelectComponent.placeholder = 'Sala';
  roomTypeSelectComponent.backgroundColor = 'rgba(25, 48, 129, 0.25)';
  roomTypeSelectComponent.placeholderColor = 'rgba(255, 197, 110, 1)';
  if (selectedMovieId && movieRoomTypes) {
    roomTypeSelectComponent.options = movieRoomTypes;
    roomTypeSelectComponent.selectedOption = movieRoomTypes.find(
      (language) => language.id === null,
    );
  }
  roomTypeSelectComponent.onSelect = async (roomType) => {
    movieScreeningSelectorComponent.loading = true;
    selectedRoomType = roomType;
    await fetchAndLoadMovieScreening(
      selectedMovieId,
      selectedLanguage?.id,
      selectedRoomType?.id,
      selectedDate,
    );
    movieScreeningSelectorComponent.movieScreenings = movieScreenings;
    movieScreeningSelectorComponent.loading = false;
  };
  roomTypeSelectComponent.render();
}

function loadAndRenderDatePickerComponent() {
  datePickerComponent = new DatePickerComponent('date-selector');
  datePickerComponent.emptyDateText = 'Todos los días';
  datePickerComponent.onSelect = async (date) => {
    movieScreeningSelectorComponent.loading = true;
    selectedDate = date;
    await fetchAndLoadMovieScreening(
      selectedMovieId,
      selectedLanguage?.id,
      selectedRoomType?.id,
      selectedDate,
    );
    movieScreeningSelectorComponent.movieScreenings = movieScreenings;
    movieScreeningSelectorComponent.loading = false;
  };
  datePickerComponent.render();
}

function loadAndRenderMovieScreeningSelectorComponent() {
  movieScreeningSelectorComponent = new MovieScreeningSelectorComponent(
    'movie-screening-selection',
  );

  movieScreeningSelectorComponent.movieScreenings = movieScreenings;
  movieScreeningSelectorComponent.onScreeningSelect = (screening) => {
    selectedMovieScreening = screening;
    enableOrDisableNavigationButtons();
  };
  movieScreeningSelectorComponent.render();
}

function loadAndRenderRoomSeatsSelectorComponent() {
  roomSeatsSelectorComponent = new RoomSeatsSelectorComponent(
    'room-seats-selection',
  );
  roomSeatsSelectorComponent.onSeatClick = (event) => {
    selectedRoomSeats = event.selectedSeats;
  };
  roomSeatsSelectorComponent.render();
}

function loadAndRenderUserNameInput() {
  userNameInputComponent = new InputComponent('name-input');
  userNameInputComponent.placeholder = 'Nombre y apellido';
  userNameInputComponent.backgroundColor = 'rgba(25, 48, 129, 0.25)';
  userNameInputComponent.placeholderColor = 'rgba(255, 197, 110, 1)';
  userNameInputComponent.render();
}

function loadAndRenderUserEmailInput() {
  userEmailInputComponent = new InputComponent('email-input');
  userEmailInputComponent.placeholder = 'Email';
  userEmailInputComponent.backgroundColor = 'rgba(25, 48, 129, 0.25)';
  userEmailInputComponent.placeholderColor = 'rgba(255, 197, 110, 1)';
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  userEmailInputComponent.validationRegex = emailRegex;
  userEmailInputComponent.regexErrorMessage = 'El E-Mail no es válido';
  userEmailInputComponent.render();
}

function loadAndRenderUserPhoneInput() {
  userPhoneInputComponent = new InputComponent('phone-input');
  userPhoneInputComponent.placeholder = 'Teléfono';
  userPhoneInputComponent.backgroundColor = 'rgba(25, 48, 129, 0.25)';
  userPhoneInputComponent.placeholderColor = 'rgba(255, 197, 110, 1)';
  userPhoneInputComponent.render();
}

function loadAndRenderNavigationButtonsComponent() {
  navigationButtonsComponent = new ReservationNavigationButtons(
    'navigation-buttons',
  );
  navigationButtonsComponent.render();
}

async function loadCurrentReservationStep() {
  console.log('current reservation step:', currentDisplayingReservationStep);
  const stepLoadedActions = getActionsForStepWhenLoaded(
    currentDisplayingReservationStep,
  );
  const hasStepAlreadyBeingLoaded = loadedReservationSteps.find(
    (loadedReservationStep) =>
      loadedReservationStep === currentDisplayingReservationStep,
  );
  if (!hasStepAlreadyBeingLoaded) await stepLoadedActions();

  stepInfoComponent.currentStep = currentDisplayingReservationStep;

  enableOrDisableNavigationButtons();
}

function addEventListenerToMovieCards() {
  const movies = document.getElementsByClassName('movie-displayer');
  for (const movie of movies) {
    const movieId = movie.getAttribute('movie-id');
    movie.addEventListener('click', () => selectMovie(movieId));
  }
}

function addEventListenerToReservationStepsSlider() {
  const slideElement = document.getElementById('step-slider');

  slideElement.addEventListener('transitionstart', (event) => {
    if (event.target === slideElement) {
      const reservationStepElement = document.getElementById(
        `${currentDisplayingReservationStep}-step`,
      );

      const hideableHTMLElements = reservationStepElement.querySelectorAll(
        `[hide-when-not-displaying="true"]`,
      );

      for (const hideableElement of hideableHTMLElements) {
        uncoverHideableHTMLElement(hideableElement);
      }
    }
  });

  slideElement.addEventListener('transitionend', (event) => {
    if (event.target === slideElement) {
      const reservationStepElement = document.getElementById(
        `${currentDisplayingReservationStep}-step`,
      );

      const hideableHTMLElements = reservationStepElement.querySelectorAll(
        `[hide-when-not-displaying="true"]`,
      );
      coverHideableHTMLElementsExcept(...hideableHTMLElements);
    }
  });
}

function addEventListenersToNavigationButtons() {
  // Go back to the previous step event
  navigationButtonsComponent.onPreviousButtonClick = async () => {
    const currentStepIndex = RESERVATION_STEPS.findIndex(
      (RESERVATION_STEP) =>
        RESERVATION_STEP === currentDisplayingReservationStep,
    );

    const previousStepIndex = currentStepIndex === 0 ? 0 : currentStepIndex - 1;
    currentDisplayingReservationStep = RESERVATION_STEPS[previousStepIndex];

    updateStepSlider(previousStepIndex);

    await loadCurrentReservationStep();
  };

  // Go to the next step event
  navigationButtonsComponent.onNextButtonClick = async () => {
    const currentStepIndex = RESERVATION_STEPS.findIndex(
      (RESERVATION_STEP) =>
        RESERVATION_STEP === currentDisplayingReservationStep,
    );

    const nextStepIndex =
      currentStepIndex === RESERVATION_STEPS.length - 1
        ? RESERVATION_STEPS.length - 1
        : currentStepIndex + 1;

    // - Setear el siguient step en la variable global
    currentDisplayingReservationStep = RESERVATION_STEPS[nextStepIndex];

    updateStepSlider(nextStepIndex);

    await loadCurrentReservationStep();
  };
}

function getUrlParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movieId = urlParams.get('movieId');
  const languageId = urlParams.get('languageId');
  const roomTypeId = urlParams.get('roomTypeId');
  const dateString = urlParams.get('date'); // Format YYYY-MM-DD
  let finalDate = null;
  if (dateString) {
    const [year, month, day] = dateString.split('-');
    if (year && month && day) {
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      if (!isNaN(date.valueOf())) finalDate = date;
    }
  }

  return {
    movieId,
    languageId,
    roomTypeId,
    date: finalDate,
  };
}

function selectMovieHTMLCard(movieId) {
  // unselect existing movie-card by removing it's class
  unselectMovieCard();

  // Search for the new selected movie card
  const movieCard = document.querySelector(`[movie-id="${movieId}"]`);
  if (!movieCard) throw new Error(`movieId "${movieId}" does not exists`);
  movieCard.className = `${movieCard.className} selected-movie`;
}

function unselectMovieCard() {
  const selectedMovieCards = document.getElementsByClassName('selected-movie');
  for (const selectedMovieCard of selectedMovieCards) {
    selectedMovieCard.className = selectedMovieCard.className.replace(
      'selected-movie',
      '',
    );
  }
}

function enableOrDisableNavigationButtons() {
  const isPreviousButtonBeActive = shouldPreviousButtonBeActive();
  const isNextButtonBeActive = shouldNextButtonBeActive();

  isPreviousButtonBeActive
    ? navigationButtonsComponent.enablePreviousButton()
    : navigationButtonsComponent.disablePreviousButton();

  isNextButtonBeActive
    ? navigationButtonsComponent.enableNextButton()
    : navigationButtonsComponent.disableNextButton();
}

function shouldPreviousButtonBeActive() {
  if (currentDisplayingReservationStep === 'movie-selection') return false;

  return true;
}

function shouldNextButtonBeActive() {
  const checkValidationStepFunction = getNextButtonValidationFunctionForStep(
    currentDisplayingReservationStep,
  );

  return checkValidationStepFunction();
}

function getInitialCurrentReservationStep() {
  if (!selectedMovieId) return 'movie-selection';
  if (!selectedMovieScreening) return 'movie-screening-selection';
  if (!selectedRoomSeats.length) return 'room-seats-selection';
  if (!clientName || clientEmail || clientPhone) return 'user-data-form';
  return 'reservation-summary';
}

function getNextButtonValidationFunctionForStep(step) {
  const stepsAndValidationFunctions = {
    'movie-selection': nextButtonValidationForMovieSelectionStep,
    'movie-screening-selection':
      nextButtonValidationForMovieScreeningSelectionStep,
    'room-seats-selection': nextButtonValidationForMovieSeatsSelectionStep,
    'user-data-form': nextButtonValidationForUserDataFormStep,
    'reservation-summary': nextButtonValidationForReservationSummaryStep,
  };

  return stepsAndValidationFunctions[step];
}

function nextButtonValidationForMovieSelectionStep() {
  return Boolean(selectedMovieId);
}

function nextButtonValidationForMovieScreeningSelectionStep() {
  return Boolean(selectedMovieScreening);
}

function nextButtonValidationForMovieSeatsSelectionStep() {
  return true;
}

function nextButtonValidationForUserDataFormStep() {
  return true;
  // TODO: Checkear que sean validos tambien
  return clientName && clientEmail && clientPhone;
}

function nextButtonValidationForReservationSummaryStep() {
  // return true;
  return false;
}

function getActionsForStepWhenLoaded(step) {
  const actions = {
    'movie-selection': onMovieSelectionStepLoads,
    'movie-screening-selection': onMovieScreeningSelectionStepLoads,
    'room-seats-selection': onRoomSeatsSelectionStepLoads,
    'user-data-form': onUserDataFromStepLoads,
    'reservation-summary': onReservationSummaryStepLoads,
  };

  return actions[step];
}

function onMovieSelectionStepLoads() {
  console.log('movie-selection step loaded');
  if (selectedMovieId) selectMovie(selectedMovieId);
}

async function onMovieScreeningSelectionStepLoads() {
  console.log('movie-screening-selection step loaded');
  resetMovieLanguagesSelectInput();
  resetMovieRoomTypesSelectInput();
  resetMovieScreeningComponent();

  await fetchAndLoadMovieData(selectedMovieId);
  loadMovieLanguagesIntoSelectInput();
  loadMovieRoomTypesIntoSelectInput();
  loadDateIntoDatePickerInput();
  loadAndRenderMovieScreeningIntoComponent();
}

async function onRoomSeatsSelectionStepLoads() {
  console.log('room-seats-selection step loaded');

  const selectedScreeningOutput = document.getElementById(
    'selected-screening-data',
  );
  selectedScreeningOutput.innerHTML = `
    ${selectedMovieScreening.movie.name} -
    ${selectedMovieScreening.language.name} -
    ${selectedMovieScreening.roomType.name} -
    ${selectedMovieScreening.startsAt.toLocaleString()}
  `;

  const seats = await fetchScreeningSeats(selectedMovieScreening.id);
  roomSeatsSelectorComponent.seats = seats;
  roomSeatsSelectorComponent.selectedSeats = selectedRoomSeats;
}

async function fetchScreeningSeats(screeningId) {
  if (!screeningId)
    throw new Error('ScreeningID is required to fetch the screening seats');

  const url = `/api/reservation/screenings/${screeningId}/seats`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok)
    throw new Error(
      'Something went wrong fetching the screening seats',
      response,
    );

  return response.json();
}

function onUserDataFromStepLoads() {
  console.log('user-data-form step loaded');
}

function onReservationSummaryStepLoads() {
  console.log('user-data-form step loaded');
  // TODO: Get movie's data
  // const selectedMovieCard = document.getElementById()

  const clientNameOutput = document.getElementById('name-input-summary');
  const clientEmailOutput = document.getElementById('email-input-summary');
  const clientPhoneOutput = document.getElementById('phone-input-summary');

  const movieNameOutput = document.getElementById('movie-name-summary');
  const roomTypeNameOutput = document.getElementById('movie-room-type-summary');
  const startsAtOutput = document.getElementById('movie-starts-at-summary');
  const seatsOutput = document.getElementById('room-seats-summary');
  const totalOutput = document.getElementById('total-summary');

  clientNameOutput.innerHTML = userNameInputComponent.text;
  clientEmailOutput.innerHTML = userEmailInputComponent.text;
  clientPhoneOutput.innerHTML = userPhoneInputComponent.text;
  movieNameOutput.innerHTML = selectedMovieScreening.movie.name;
  roomTypeNameOutput.innerHTML = selectedMovieScreening.roomType.name;
  startsAtOutput.innerHTML = selectedMovieScreening.startsAt.toLocaleString();
  seatsOutput.innerHTML = getSelectedSeatsOutput();
  totalOutput.innerHTML = getReservationTotalPrice();
}

function updateStepSlider(currentSlide) {
  const stepSlider = document.getElementById('step-slider');
  stepSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function getSelectedSeatsOutput() {
  let str = '';
  for (const seat of selectedRoomSeats) {
    str += `Asiento ${seat.column}-${seat.row} (Sala ${selectedMovieScreening.roomType.name}) - $${selectedMovieScreening.roomType.price}.<br>`;
  }
  return str;
  return `Asiento 3A (MOCK)`;
}

function getReservationTotalPrice() {
  const unitPrice = Number(selectedMovieScreening.roomType.price);
  return `$${unitPrice * selectedRoomSeats.length}`;
}
