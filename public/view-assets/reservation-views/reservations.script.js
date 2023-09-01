import { DatePickerComponent } from '../common/components/date-picker/DatePicker.component.js';
import { SelectComponent } from '../common/components/select/select.component.js';

let selectedMovieId = null;
let selectedMovieScreeningId = null;
let selectedRoomSeats = [];
let clientName = null;
let clientEmail = null;
let clientPhone = null;

let movieLanguages = [];
let movieRoomTypes = [];
let movieScreenings = [];

document.addEventListener('DOMContentLoaded', (event) => {
  // Hide all reservation steps by default
  hideReservationsSteps();

  // Load event listeners
  loadEventListeners();

  // get and load URL params
  fetchAndLoadURLParams();

  // Load And Reder Components (e.g. Step-Info & Navigation Componenets)
  loadAndRenderComponents();

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
}

function fetchAndLoadURLParams() {
  const { movieId, language, roomTypeId, date } = getUrlParams();

  if (movieId) {
    try {
      fetchAndLoadMovieId(movieId);
      fetchAndLoadMovieAvailableLanguages(language);
      fetchAndLoadMovieAvailableRoomTypes(roomTypeId);
      fetchAndLoadMovieScreening(movieId, language, roomTypeId, date);
    } catch (error) {
      console.error(
        'Some given values are not valid. Reseting reservation flow',
      );
    }
  }
}

function fetchAndLoadMovieId(movieId) {
  selectMovieCard(movieId);
  selectedMovieId = movieId;
}

function fetchAndLoadMovieAvailableLanguages(languange) {
  console.log('Movie screenings fetched and loaded');
  const languages = [
    {
      id: null,
      key: 'todos',
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

  movieLanguages = languages;
}

function fetchAndLoadMovieAvailableRoomTypes(roomTypeId) {
  console.log('Movie screenings fetched and loaded');

  const roomTypes = [
    {
      id: null,
      key: 'todas',
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

  movieRoomTypes = roomTypes;
}

function fetchAndLoadMovieScreening(movieId, language, roomTypeId, date) {
  console.log('Movie screenings fetched and loaded');
  // TODO: Replace this function's code by calling the Server's API
  const mockedScreenings = [
    {
      id: 1,
      language: {
        id: 1,
        name: 'Español',
        createdAt: new Date(),
      },
      roomType: {
        id: 1,
        name: '2D',
      },
      date: new Date(),
      remainingSeats: 4,
      createdAt: new Date(),
    },
    {
      id: 2,
      language: {
        id: 1,
        name: 'Español',
        createdAt: new Date(),
      },
      roomType: {
        id: 1,
        name: '2D',
      },
      date: new Date(),
      remainingSeats: 4,
      createdAt: new Date(),
    },
    {
      id: 3,
      language: {
        id: 1,
        name: 'Español',
        createdAt: new Date(),
      },
      roomType: {
        id: 1,
        name: '2D',
      },
      date: new Date(),
      remainingSeats: 4,
      createdAt: new Date(),
    },
    {
      id: 4,
      language: {
        id: 1,
        name: 'Español',
        createdAt: new Date(),
      },
      roomType: {
        id: 1,
        name: '2D',
      },
      date: new Date(),
      remainingSeats: 4,
      createdAt: new Date(),
    },
  ];
  movieScreenings = mockedScreenings;
}

function loadAndRenderComponents() {
  const stepInfo = new ReservationStepInfo('step-info');
  stepInfo.render();

  const languageSelect = new SelectComponent('language-selector');
  languageSelect.options = movieLanguages;
  languageSelect.selectedOption = movieLanguages.find(
    (language) => language.id === null,
  );
  languageSelect.placeholder = 'Idioma';
  languageSelect.backgroundColor = 'rgba(25, 48, 129, 0.25)';
  languageSelect.placeholderColor = 'rgba(255, 197, 110, 1)';
  languageSelect.render();

  const roomTypesSelect = new SelectComponent('room-type-selector');
  roomTypesSelect.options = movieRoomTypes;
  roomTypesSelect.selectedOption = movieRoomTypes.find(
    (language) => language.id === null,
  );
  roomTypesSelect.placeholder = 'Sala';
  roomTypesSelect.backgroundColor = 'rgba(25, 48, 129, 0.25)';
  roomTypesSelect.placeholderColor = 'rgba(255, 197, 110, 1)';
  roomTypesSelect.render();

  const datePicker = new DatePickerComponent('date-selector');
  datePicker.emptyDateText = 'Todos los días';
  datePicker.render();

  const navigationButtons = new ReservationNavigationButtons(
    'navigation-buttons',
  );
  navigationButtons.render();
}

function displayCurrentReservationStep() {
  const currentReservationStep = getCurrentReservationStep();
  const reservationStepElement = document.getElementById(
    `${currentReservationStep}-step`,
  );
  reservationStepElement.style.display = 'block';
}

function addEventListenerToMovieCards() {
  const movies = document.getElementsByClassName('movie-displayer');
  for (const movie of movies) {
    const movieId = movie.getAttribute('movie-id');
    movie.addEventListener('click', () => selectMovieCard(movieId));
  }
}

function getUrlParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movieId = urlParams.get('movieId');
  const language = urlParams.get('language');
  const roomTypeId = urlParams.get('roomTypeId');
  const date = urlParams.get('date');

  return {
    movieId,
    language,
    roomTypeId,
    date,
  };
}

function selectMovieCard(movieId) {
  // unselect existing movie-card by removing it's class
  const currentMovieId = selectedMovieId;
  if (currentMovieId) unselectMovieCard(currentMovieId);

  // Search for the new selected movie card
  const movieCard = document.querySelector(`[movie-id="${movieId}"]`);
  if (!movieCard) throw new Error(`movieId "${movieId}" does not exists`);
  movieCard.className = `${movieCard.className} selected-movie`;
  selectedMovieId = movieId;
}

function unselectMovieCard(movieId) {
  const selectedMovieCard = document.querySelector(`[movie-id="${movieId}"]`);
  selectedMovieCard.className = selectedMovieCard.className.replace(
    'selected-movie',
    '',
  );
}

function getCurrentReservationStep() {
  if (!selectedMovieId) return 'movie-selection';
  if (!selectedMovieScreeningId) return 'movie-screening-selection';
  if (!selectedRoomSeats.length) return 'room-seats-selection';
  if (!clientName || clientEmail || clientPhone) return 'user-data-form';
  return 'reservation-summary';
}
