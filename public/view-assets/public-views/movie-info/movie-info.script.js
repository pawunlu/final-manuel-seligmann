import { SelectComponent } from '../../common/components/select/select.component.js';
import { DatePickerComponent } from '../../common/components/date-picker/date-picker.component.js';

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
 * represents the Movie Extra Data endpoint response
 * @typedef {Object} MovieExtraData
 * @property {RoomType} availableRoomTypes
 * @property {Language} availableLanguages
 */

/** @type {SelectComponent} */
let languageSelectComponent = null;

/** @type {SelectComponent} */
let roomTypeSelectComponent = null;

/** @type {DatePickerComponent} */
let datePickerComponent = null;

document.addEventListener('DOMContentLoaded', async () => {
  initializeComponents();
  setupEvents();
  fetchAndLoadMovieExtraData();
});

function currentMovieId() {
  const pathname = window.location.pathname;
  const split = pathname.split('/');
  const movieId = split[2];
  return movieId;
}

function initializeComponents() {
  intializeLanguageSelectorComponent();
  intializeRoomTypeSelectorComponent();
  intializeDatePickerSelectorComponent();
}

function intializeLanguageSelectorComponent() {
  languageSelectComponent = new SelectComponent('language-selector');
  languageSelectComponent.backgroundColor = 'rgba(59, 90, 202, 0.25)';
  languageSelectComponent.placeholderColor = 'rgba(255, 197, 110, 1)';
  languageSelectComponent.placeholder = 'Idioma';
  languageSelectComponent.options = [];
  languageSelectComponent.render();
}

function intializeRoomTypeSelectorComponent() {
  roomTypeSelectComponent = new SelectComponent('room-type-selector');
  roomTypeSelectComponent.backgroundColor = 'rgba(59, 90, 202, 0.25)';
  roomTypeSelectComponent.placeholderColor = 'rgba(255, 197, 110, 1)';
  roomTypeSelectComponent.placeholder = 'Formato';
  roomTypeSelectComponent.options = [];
  roomTypeSelectComponent.render();
}

function intializeDatePickerSelectorComponent() {
  datePickerComponent = new DatePickerComponent('date-picker-selector');
  datePickerComponent.backgroundColor = 'rgba(59, 90, 202, 0.25)';
  datePickerComponent.placeholderColor = 'rgba(255, 197, 110, 1)';
  datePickerComponent.emptyDateText = 'Todos los días';
  datePickerComponent.render();
}

function setupEvents() {
  setupReservationButtonEvent();
}

function setupReservationButtonEvent() {
  const button = document.getElementById('reservation-button');
  button.addEventListener('click', handleReservationButtonClick);
}

function handleReservationButtonClick() {
  const movieId = currentMovieId();
  const languageId = languageSelectComponent.selectedOption?.id ?? null;
  const roomTypeId = roomTypeSelectComponent.selectedOption?.id ?? null;
  const date = datePickerComponent.selectedDate ?? null;
  redirectToReservationView(movieId, languageId, roomTypeId, date);
}

/**
 *
 *
 * @param {number} movieId
 * @param {string} languageId
 * @param {string} roomTypeId
 * @param {Date} date
 */
function redirectToReservationView(movieId, languageId, roomTypeId, date) {
  const searchParams = new URLSearchParams();
  searchParams.append('movieId', movieId);
  if (languageId) searchParams.append('languageId', languageId);
  if (roomTypeId) searchParams.append('roomTypeId', roomTypeId);
  if (date) searchParams.append('date', date.toISOString().split('T')[0]);
  console.log(searchParams.toString());

  const url = `/reservar?${searchParams.toString()}`;
  window.location.href = url;
}

async function fetchAndLoadMovieExtraData() {
  const movieId = currentMovieId();
  const { availableLanguages, availableRoomTypes } = await fetchMovieExtraData(
    movieId,
  );

  loadLanguagesIntoComponent(availableLanguages);
  loadRoomTypesIntoComponent(availableRoomTypes);
  loadLanguagesIntoMovieInfomation(availableLanguages);
  loadRoomTypesIntoMovieInfomation(availableRoomTypes);
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

/**
 *
 *
 * @param {Language[]} languages
 */
function loadLanguagesIntoComponent(languages) {
  const defaultLanguage = {
    id: null,
    name: 'Todos',
  };

  const languageslist = [defaultLanguage, ...languages];
  languageSelectComponent.options = languageslist;
  languageSelectComponent.selectedOption = defaultLanguage;
}

/**
 *
 *
 * @param {RoomType[]} roomTypes
 */
function loadRoomTypesIntoComponent(roomTypes) {
  const defaultRoomType = {
    id: null,
    name: 'Todos',
  };

  const roomTypeslist = [defaultRoomType, ...roomTypes];
  roomTypeSelectComponent.options = roomTypeslist;
  roomTypeSelectComponent.selectedOption = defaultRoomType;
}

/**
 *
 *
 * @param {Language[]} languages
 */
function loadLanguagesIntoMovieInfomation(languages) {
  const languagesHTMLText = document.getElementById('languages');
  languagesHTMLText.innerHTML = languages
    .map((language) => language.name)
    .join(', ');
}

/**
 *
 *
 * @param {RoomType[]} roomTypes
 */
function loadRoomTypesIntoMovieInfomation(roomTypes) {
  const roomTypesHTMLText = document.getElementById('room-types');
  roomTypesHTMLText.innerHTML = roomTypes
    .map((roomType) => roomType.name)
    .join(', ');
}
