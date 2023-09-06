import { ReservationStepInfo } from '../reservation-views/components/step-info/reservation-step-info.component.js';
import { ReservationNavigationButtons } from '../reservation-views/components/navigation-buttons/reservation-navigation-buttons.component.js';
import { SelectComponent } from '../common/components/select/select.component.js';
import { DatePickerComponent } from '../common/components/date-picker/date-picker.component.js';
import { MovieScreeningSelectorComponent } from '../reservation-views/components/movie-screening-selector/movie-screening-selector.component.js';

/**
 * represents a Movie Language
 * @typedef {Object} Language
 * @property {number} id - Language ID
 * @property {string} name - Language name. e.g: "Inglés Subtitulado"
 * @property {string} key - Language key. e.g: "ingles_subtitulado"
 * @property {Date} createdAt - The date the language was created
 */

/**
 * represents a Room Type
 * @typedef {Object} RoomType
 * @property {number} id - Room Type ID
 * @property {string} name - Room Type. e.g: "3D Extreme"
 * @property {string} key - Room Type key. e.g: "3d_extreme"
 * @property {Date} createdAt - The date the Room Type was created
 */

/**
 * represents a Screening
 * @typedef {Object} Screening
 * @property {number} id - Screening ID
 * @property {Language} language - Screening's Language
 * @property {RoomType} roomType - Screening's Room Type
 * @property {Date} startsAt - The date & time the screening starts
 * @property {number} remainingSeats - the number of remaining seats the screening has
 * @property {Date} createdAt - The date the screening was created
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

/** @type {ReservationNavigationButtons} */
let navigationButtonsComponent = null;

document.addEventListener('DOMContentLoaded', (event) => {
  // Hide all reservation steps by default
  hideReservationsSteps();

  // get and load URL params
  // fetchAndLoadURLParams();

  // Determine current reservation step based on the loaded url params
  determineInitialReservationStepToDisplay();

  // Load And Reder Components (e.g. Step-Info & Navigation Componenets)
  loadAndRenderComponents();

  // Load event listeners
  loadEventListeners();

  // Display the corresponding reservation step based on the loaded url params
  displayCurrentReservationStep();
});

function hideReservationsSteps() {
  const reservationSteps = document.getElementsByClassName('reservation-step');
  for (const step of reservationSteps) {
    step.style.display = 'none';
  }
}

function loadEventListeners() {
  // Add event to all the movies displayed
  addEventListenerToMovieCards();

  // Add events to the "previous" and "next" buttons
  addEventListenersToNavigationButtons();
}

function fetchAndLoadURLParams() {
  const { movieId, languageKey, roomTypeKey, date } = getUrlParams();

  if (movieId) {
    try {
      fetchAndLoadMovieId(movieId);
      fetchAndLoadMovieAvailableLanguages(movieId, languageKey);
      fetchAndLoadMovieAvailableRoomTypes(movieId, roomTypeKey);
      fetchAndLoadMovieScreening(movieId, languageKey, roomTypeKey, date);
    } catch (error) {
      console.error(
        'Some given values are not valid. Reseting reservation flow',
      );
    }
  }
}

function selectMovie(movieId) {
  if (selectedMovieId === movieId) return;

  resetSelectedAttributes();

  // Setear la variable global al movie id seleccionado
  selectedMovieId = movieId;

  // Seleccionar la html card
  selectMovieHTMLCard(movieId);
  // Checkear el navigation buttons
  enableOrDisableNavigationButtons();
}

function resetSelectedAttributes() {
  selectedMovieId = null;
  selectedLanguage = null;
  selectedRoomType = null;
  selectedDate = null;
  selectedMovieScreening = null;
  selectedSeatsAmount = null;
  selectedRoomSeats = null;
}

function fetchAndLoadMovieId(movieId) {
  selectMovieHTMLCard(movieId);
  selectedMovieId = movieId;
}

function fetchAndLoadMovieData(movieId) {
  fetchAndLoadMovieAvailableLanguages(movieId);
  fetchAndLoadMovieAvailableRoomTypes(movieId);
  fetchAndLoadMovieScreening(movieId);
}

function fetchAndLoadMovieAvailableLanguages(movieId, languageKey) {
  console.log('Movie available languages fetched and loaded');
  const languages = [
    {
      id: null,
      key: null,
      name: 'Todos',
    },
    {
      id: 1,
      key: 'espanol',
      name: 'Español',
    },
    {
      id: 2,
      key: 'ingles',
      name: 'Ingles',
    },
    {
      id: 3,
      key: 'portugues',
      name: 'Portugues',
    },
  ];

  // const languageExists = languages.find(
  //   (language) => language.key === languageKey,
  // );
  // if (!languageExists)
  //   throw new Error(
  //     `Language key "${languageKey}" doesn't belong to any available language`,
  //   );
  movieLanguages = languages;
}

function fetchAndLoadMovieAvailableRoomTypes(movieId, roomTypeKey) {
  console.log('Room Types fetched and loaded');

  const roomTypes = [
    {
      id: null,
      key: null,
      name: 'Todas',
    },
    {
      id: 1,
      key: '2d',
      name: '2D',
    },
    {
      id: 2,
      key: '3d',
      name: '3D',
    },
    {
      id: 3,
      key: '3dx',
      name: '3D Extreme',
    },
    {
      id: 4,
      key: '4d',
      name: '4D',
    },
    {
      id: 5,
      key: 'monster',
      name: 'Monter Screen',
    },
  ];

  // const roomTypeExists = roomTypes.find(
  //   (roomType) => roomType.key === roomTypeKey,
  // );
  // if (!roomTypeExists)
  //   throw new Error(
  //     `Room Type key "${languageKey}" doesn't belong to any available Room Type`,
  //   );

  movieRoomTypes = roomTypes;
}

function fetchAndLoadMovieScreening(movieId, languageKey, roomTypeKey, date) {
  console.log(
    'Movie screenings fetched and loaded with params:',
    movieId,
    languageKey,
    roomTypeKey,
    date?.toLocaleDateString(),
  );
  // TODO: Replace this function's code by calling the Server's API
  const mockedScreenings = [
    {
      id: 1,
      language: {
        id: 1,
        name: 'Español',
        key: 'espanol',
        createdAt: new Date(),
      },
      roomType: {
        id: 1,
        name: '2D',
        key: '2d',
      },
      startsAt: new Date(2023, 9, 10, 11, 30),
      remainingSeats: 4,
      createdAt: new Date(),
    },
    {
      id: 2,
      language: {
        id: 1,
        name: 'Español',
        key: 'espanol',
        createdAt: new Date(),
      },
      roomType: {
        id: 1,
        name: '2D',
        key: '2d',
      },
      startsAt: new Date(2023, 9, 10, 12, 30),
      remainingSeats: 4,
      createdAt: new Date(),
    },
    {
      id: 3,
      language: {
        id: 1,
        name: 'Español',
        key: 'espanol',
        createdAt: new Date(),
      },
      roomType: {
        id: 1,
        name: '2D',
        key: '2d',
      },
      startsAt: new Date(2023, 9, 11, 12, 30),
      remainingSeats: 4,
      createdAt: new Date(),
    },
    {
      id: 4,
      language: {
        id: 1,
        name: 'Español',
        key: 'espanol',
        createdAt: new Date(),
      },
      roomType: {
        id: 1,
        name: '2D',
        key: '2d',
      },
      startsAt: new Date(2023, 9, 12, 12, 30),
      remainingSeats: 4,
      createdAt: new Date(),
    },
  ];

  movieScreenings = mockedScreenings.filter((screening) => {
    return (
      (languageKey ? screening.language.key === languageKey : true) &&
      (roomTypeKey ? screening.roomType.key === roomTypeKey : true) &&
      (date
        ? screening.startsAt.toLocaleDateString() === date.toLocaleDateString()
        : true)
    );
  });
}

function loadMovieLanguagesIntoSelectInput() {
  languageSelectComponent.options = movieLanguages;
  languageSelectComponent.selectedOption = movieLanguages[0];
}

function loadMovieRoomTypesIntoSelectInput() {
  roomTypeSelectComponent.options = movieRoomTypes;
  roomTypeSelectComponent.selectedOption = movieRoomTypes[0];
}

function loadAndRenderMovieScreeningIntoComponent() {
  movieScreeningSelectorComponent.selectedScreening = selectedMovieScreening;
  movieScreeningSelectorComponent.movieScreenings = movieScreenings;
}

function determineInitialReservationStepToDisplay() {
  currentDisplayingReservationStep = getInitialCurrentReservationStep();
}

function loadAndRenderComponents() {
  loadAndRenderStepInfoComponent();
  loadAndRenderLanguageSelectComponent();
  loadAndRenderRoomTypesSelectComponent();
  loadAndRenderDatePickerComponent();
  loadAndRenderMovieScreeningSelectorComponent();
  loadAndRenderNavigationButtonsComponent();
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
  languageSelectComponent.onSelect = (language) => {
    selectedLanguage = language;
    fetchAndLoadMovieScreening(
      selectedMovieId,
      selectedLanguage?.key,
      selectedRoomType?.key,
      selectedDate,
    );
    movieScreeningSelectorComponent.movieScreenings = movieScreenings;
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
  roomTypeSelectComponent.onSelect = (roomType) => {
    selectedRoomType = roomType;
    fetchAndLoadMovieScreening(
      selectedMovieId,
      selectedLanguage?.key,
      selectedRoomType?.key,
      selectedDate,
    );
    movieScreeningSelectorComponent.movieScreenings = movieScreenings;
  };
  roomTypeSelectComponent.render();
}

function loadAndRenderDatePickerComponent() {
  datePickerComponent = new DatePickerComponent('date-selector');
  datePickerComponent.emptyDateText = 'Todos los días';
  datePickerComponent.onSelect = (date) => {
    selectedDate = date;
    fetchAndLoadMovieScreening(
      selectedMovieId,
      selectedLanguage?.key,
      selectedRoomType?.key,
      selectedDate,
    );
    movieScreeningSelectorComponent.movieScreenings = movieScreenings;
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

function loadAndRenderNavigationButtonsComponent() {
  navigationButtonsComponent = new ReservationNavigationButtons(
    'navigation-buttons',
  );
  navigationButtonsComponent.render();
}

function displayCurrentReservationStep() {
  console.log('current reservation step:', currentDisplayingReservationStep);
  const stepLoadedActions = getActionsForStepWhenLoaded(
    currentDisplayingReservationStep,
  );
  const hasStepAlreadyBeingLoaded = loadedReservationSteps.find(
    (loadedReservationStep) =>
      loadedReservationStep === currentDisplayingReservationStep,
  );
  if (!hasStepAlreadyBeingLoaded) stepLoadedActions();

  const reservationStepElement = document.getElementById(
    `${currentDisplayingReservationStep}-step`,
  );
  reservationStepElement.style.display = 'block';

  enableOrDisableNavigationButtons();
}

function addEventListenerToMovieCards() {
  const movies = document.getElementsByClassName('movie-displayer');
  for (const movie of movies) {
    const movieId = movie.getAttribute('movie-id');
    movie.addEventListener('click', () => selectMovie(movieId));
  }
}

function addEventListenersToNavigationButtons() {
  navigationButtonsComponent.onPreviousButtonClick = () => {
    const currentStepIndex = RESERVATION_STEPS.findIndex(
      (reservationStep) => reservationStep === currentDisplayingReservationStep,
    );
    const previousStepIndex = currentStepIndex === 0 ? 0 : currentStepIndex - 1;
    currentDisplayingReservationStep = RESERVATION_STEPS[previousStepIndex];

    hideReservationsSteps();
    displayCurrentReservationStep();
  };

  navigationButtonsComponent.onNextButtonClick = () => {
    // TODO: Completar
    // - Obtener el string del siguiente step
    const currentStepIndex = RESERVATION_STEPS.findIndex(
      (reservationStep) => reservationStep === currentDisplayingReservationStep,
    );
    const nextStepIndex =
      currentStepIndex === RESERVATION_STEPS.length - 1
        ? RESERVATION_STEPS.length - 1
        : currentStepIndex + 1;

    // - Setear el siguient step en la variable global
    currentDisplayingReservationStep = RESERVATION_STEPS[nextStepIndex];

    // - Renderizar el next step con la function "displayCurrentReservationStep"
    hideReservationsSteps();
    displayCurrentReservationStep();
  };
}

function getUrlParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movieId = urlParams.get('movieId');
  const languageKey = urlParams.get('languageKey');
  const roomTypeKey = urlParams.get('roomTypeKey');
  const date = urlParams.get('date');

  return {
    movieId,
    languageKey,
    roomTypeKey,
    date,
  };
}

function selectMovieHTMLCard(movieId) {
  // unselect existing movie-card by removing it's class
  unselectMovieCard();

  // Search for the new selected movie card
  const movieCard = document.querySelector(`[movie-id="${movieId}"]`);
  if (!movieCard) throw new Error(`movieId "${movieId}" does not exists`);
  movieCard.className = `${movieCard.className} selected-movie`;
  selectedMovieId = movieId;
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
  console.log('isPreviousButtonBeActive', isPreviousButtonBeActive);
  console.log('isNextButtonBeActive', isNextButtonBeActive);

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
  console.log(checkValidationStepFunction);

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
  // TODO: Checkear que sean validos tambien
  return clientName && clientEmail && clientPhone;
}

function nextButtonValidationForUserDataFormStep() {
  return false;
}

function nextButtonValidationForReservationSummaryStep() {
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
}

function onMovieScreeningSelectionStepLoads() {
  console.log('movie-screening-selection step loaded');
  // Fetchear y cargar toda la data de esa pelicula.
  fetchAndLoadMovieData(selectedMovieId);
  loadMovieLanguagesIntoSelectInput();
  loadMovieRoomTypesIntoSelectInput();
  fetchAndLoadMovieScreening(
    selectedMovieId,
    selectedLanguage?.key,
    selectedRoomType?.key,
    selectedDate,
  );
  loadAndRenderMovieScreeningIntoComponent();
}

function onRoomSeatsSelectionStepLoads() {
  console.log('room-seats-selection step loaded');
}

function onUserDataFromStepLoads() {
  console.log('user-data-form step loaded');
}

function onReservationSummaryStepLoads() {
  console.log('user-data-form step loaded');
}
