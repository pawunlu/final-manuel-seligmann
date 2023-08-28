let selectedMovieId = null;
let selectedMovieScreeningId = null;
let selectedRoomSeats = [];
let clientName = null;
let clientEmail = null;
let clientPhone = null;

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
      selectMovieCard(movieId);
      // movieScreenings = getMovieScreenings(movieId);
      selectedMovieId = movieId;
    } catch (error) {
      console.error(
        'Some given values are not valid. Reseting reservation flow',
      );
    }
  }
}

function loadAndRenderComponents() {
  const stepInfo = new ReservationStepInfo('step-info');
  stepInfo.render();

  const navigationButtons = new ReservationNavigationButtons(
    'navigation-buttons',
  );
  navigationButtons.render();
}

function displayCurrentReservationStep() {
  const currentReservationStep = getCurrentReservationStep();
  console.log(currentReservationStep);
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
