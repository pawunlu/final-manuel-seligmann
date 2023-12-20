import { CarouselComponent } from '../../common/components/carousel/carousel.component.js';
import { InputComponent } from '../../common/components/input/input.component.js';
import { SwitchComponent } from '../../common/components/switch/switch.component.js';
import { UnsavedChangesButtonsComponent } from '../../admin-views/common/components/unsaved-changes/unsaved-changes.component.js';

/**
 * represents a Movie
 * @typedef {Object} Movie
 * @property {string} id - Movie's ID
 * @property {string} name - Movie's Name
 * @property {string} genre - Movie's Genre
 * @property {string} rated - Movie's rated
 * @property {number} calification - Movie's Calification
 * @property {string} imageName - Movie's image url
 * @property {string} bannerName - Movie's Banner url
 * @property {number} durationInMinutes - Movie's duration in minutes
 * @property {boolean} displayInBillboard
 * @property {boolean} displayInCarousel
 * @property {boolean} isPremiere
 * @property {string} sinopsis - Movie's Sinosis
 * @property {Date} createdAt - The date the Movie was created
 */

/** @type {CarouselComponent} */
let carousel = null;

/** @type {SwitchComponent} */
let displayInBillboardSwitch = null;

/** @type {SwitchComponent} */
let displayInCarouselSwitch = null;

/** @type {SwitchComponent} */
let displayAsPremiereSwitch = null;

/** @type {InputComponent} */
let imagePosterInputComponent = null;

/** @type {InputComponent} */
let imageBannerInputComponent = null;

/** @type {InputComponent} */
let titleInputComponent = null;

/** @type {InputComponent} */
let genreInputComponent = null;

/** @type {InputComponent} */
let ratedInputComponent = null;

/** @type {InputComponent} */
let calificationInputComponent = null;

/** @type {InputComponent} */
let durationInputComponent = null;

/** @type {InputComponent} */
let sinopsisInputComponent = null;

/** @type {UnsavedChangesButtonsComponent} */
let unsavedButtonsComponent = null;

/** @type {Movie} */
let currentMovieData = {};

/** @type {Movie} */
let unsavedMovieData = {};

/** @type {boolean} */
let unsavedChanges = false;

document.addEventListener('DOMContentLoaded', async () => {
  loadAndRenderComponents();
  const isEditingMovie = isEditingMovieView();
  if (isEditingMovie) await fetchAndLoadMovieData();
});

function isEditingMovieView() {
  const editingMovieId = getCurrentMovieIdFromUrl();
  return editingMovieId !== null;
}

function getCurrentMovieIdFromUrl() {
  const pathname = window.location.pathname;
  const regex = /\d+/;
  const regexResult = regex.exec(pathname);
  if (regexResult === null) return null;

  let [movieId] = regexResult;
  movieId = Number(movieId);
  if (isNaN(movieId)) return null;

  return movieId;
}

function loadAndRenderComponents() {
  loadAndRenderDefaultCarouselSlide();
  loadAndRenderDefaultMoviePoster();
  loadAndRenderSwitches();
  loadAndRenderMovieImagePosterInputComponent();
  loadAndRenderMovieImageBannerInputComponent();
  loadAndRenderMovieTitleInputComponent();
  loadAndRenderMovieGenreInputComponent();
  loadAndRenderMovieRatedInputComponent();
  loadAndRenderMovieCalificationInputComponent();
  loadAndRenderMovieDurationInputComponent();
  loadAndRenderMovieSinopsisInputComponent();

  const isEditingMovie = isEditingMovieView();
  if (isEditingMovie) {
    loadAndRenderUnsavedButtonsComponentForEditingMovie();
  } else {
    loadAndRenderUnsavedButtonsComponentForNewMovie();
  }
}

function loadAndRenderDefaultCarouselSlide() {
  carousel = new CarouselComponent('carousel-slide');
  carousel.items = [
    {
      id: null,
      bannerName:
        'https://www.executiveconnections.ie/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGFWIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--48c45fd738da4a611c5e48fe765f9337f828d60a/banner-defau.jpg',
    },
  ];
  carousel.render();

  dismemberCarousel(false);
}

function loadAndRenderDefaultMoviePoster() {
  const defaultImageUrl =
    'https://media.comicbook.com/files/img/default-movie.png';

  assignImageToMoviePoster(defaultImageUrl);
}

function loadAndRenderSwitches() {
  loadAndRenderDisplayInBillboardSwitch();
  loadAndRenderDisplayInCarouselSwitch();
  loadAndRenderDisplayAsPremiereSwitch();
}

function loadAndRenderDisplayInBillboardSwitch() {
  displayInBillboardSwitch = new SwitchComponent('display-in-billboard-switch');
  displayInBillboardSwitch.checked = false;
  displayInBillboardSwitch.onChange = (checked) =>
    registerNewUnsavedMovieAttribute('displayInBillboard', checked);
  displayInBillboardSwitch.render();
}

function loadAndRenderDisplayInCarouselSwitch() {
  displayInCarouselSwitch = new SwitchComponent('display-in-carousel-switch');
  displayInCarouselSwitch.checked = false;
  displayInCarouselSwitch.onChange = (checked) =>
    registerNewUnsavedMovieAttribute('displayInCarousel', checked);
  displayInCarouselSwitch.render();
}

function loadAndRenderDisplayAsPremiereSwitch() {
  displayAsPremiereSwitch = new SwitchComponent('display-as-premiere-switch');
  displayAsPremiereSwitch.checked = false;
  displayAsPremiereSwitch.onChange = (checked) =>
    registerNewUnsavedMovieAttribute('isPremiere', checked);
  displayAsPremiereSwitch.render();
}

function loadAndRenderMovieImagePosterInputComponent() {
  imagePosterInputComponent = new InputComponent('image-poster-input');
  imagePosterInputComponent.placeholder = 'URL del poster';
  imagePosterInputComponent.backgroundColor = 'var(--transparent-blue1)';
  imagePosterInputComponent.placeholderColor = 'var(--yellow1)';
  imagePosterInputComponent.showResetButton = false;
  imagePosterInputComponent.onBlurEvent((event) => {
    const newText = event.target.value;
    registerNewUnsavedMovieAttribute('imageName', newText);
  });
  imagePosterInputComponent.render();
}

function loadAndRenderMovieImageBannerInputComponent() {
  imageBannerInputComponent = new InputComponent('image-banner-input');
  imageBannerInputComponent.placeholder = 'URL del banner';
  imageBannerInputComponent.backgroundColor = 'var(--transparent-blue1)';
  imageBannerInputComponent.placeholderColor = 'var(--yellow1)';
  imageBannerInputComponent.showResetButton = false;
  imageBannerInputComponent.onBlurEvent((event) => {
    const newText = event.target.value;
    registerNewUnsavedMovieAttribute('bannerName', newText);
  });
  imageBannerInputComponent.render();
}

function loadAndRenderMovieTitleInputComponent() {
  titleInputComponent = new InputComponent('movie-title-input');
  titleInputComponent.placeholder = 'Título';
  titleInputComponent.backgroundColor = 'var(--transparent-blue1)';
  titleInputComponent.placeholderColor = 'var(--yellow1)';
  titleInputComponent.showResetButton = false;
  titleInputComponent.onBlurEvent((event) => {
    const newText = event.target.value;
    registerNewUnsavedMovieAttribute('name', newText);
  });
  titleInputComponent.render();
}

function loadAndRenderMovieGenreInputComponent() {
  genreInputComponent = new InputComponent('movie-genre-input');
  genreInputComponent.placeholder = 'Género';
  genreInputComponent.backgroundColor = 'var(--transparent-blue1)';
  genreInputComponent.placeholderColor = 'var(--yellow1)';
  genreInputComponent.showResetButton = false;
  genreInputComponent.onBlurEvent((event) => {
    const newText = event.target.value;
    registerNewUnsavedMovieAttribute('genre', newText);
  });
  genreInputComponent.render();
}

function loadAndRenderMovieRatedInputComponent() {
  ratedInputComponent = new InputComponent('movie-rated-input');
  ratedInputComponent.placeholder = 'Clasificación';
  ratedInputComponent.backgroundColor = 'var(--transparent-blue1)';
  ratedInputComponent.placeholderColor = 'var(--yellow1)';
  ratedInputComponent.showResetButton = false;
  ratedInputComponent.onBlurEvent((event) => {
    const newText = event.target.value;
    registerNewUnsavedMovieAttribute('rated', newText);
  });
  ratedInputComponent.render();
}

function loadAndRenderMovieCalificationInputComponent() {
  calificationInputComponent = new InputComponent('movie-calification-input');
  calificationInputComponent.placeholder = 'Calificación (max. 10)';
  calificationInputComponent.backgroundColor = 'var(--transparent-blue1)';
  calificationInputComponent.placeholderColor = 'var(--yellow1)';
  calificationInputComponent.showResetButton = false;
  const regex = /^(10(\.0{1,2})?|[0-9](\.\d{1,2})?)$/;
  calificationInputComponent.validationRegex = new RegExp(regex);
  calificationInputComponent.regexErrorMessage = 'Número no valido';
  calificationInputComponent.onBlurEvent((event) => {
    const newNumberString = event.target.value;
    if (!regex.test(newNumberString)) return;
    registerNewUnsavedMovieAttribute('calification', Number(newNumberString));
  });
  calificationInputComponent.render();
}

function loadAndRenderMovieDurationInputComponent() {
  durationInputComponent = new InputComponent('movie-duration-input');
  durationInputComponent.placeholder = 'Duración (en minutos)';
  durationInputComponent.backgroundColor = 'var(--transparent-blue1)';
  durationInputComponent.placeholderColor = 'var(--yellow1)';
  durationInputComponent.showResetButton = false;
  durationInputComponent.onBlurEvent((event) => {
    const newText = event.target.value;
    registerNewUnsavedMovieAttribute('durationInMinutes', newText);
  });
  durationInputComponent.render();
}

function loadAndRenderMovieSinopsisInputComponent() {
  sinopsisInputComponent = new InputComponent('movie-sinopsis-input');
  sinopsisInputComponent.placeholder = 'Sinopsis';
  sinopsisInputComponent.backgroundColor = 'var(--transparent-blue1)';
  sinopsisInputComponent.placeholderColor = 'var(--yellow1)';
  sinopsisInputComponent.showResetButton = false;
  sinopsisInputComponent.onBlurEvent((event) => {
    const newText = event.target.value;
    registerNewUnsavedMovieAttribute('sinopsis', newText);
  });
  sinopsisInputComponent.render();
}

function loadAndRenderUnsavedButtonsComponentForEditingMovie() {
  unsavedButtonsComponent = new UnsavedChangesButtonsComponent(
    'unsaved-buttons',
  );
  unsavedButtonsComponent.onDiscardButtonClick = discardUnsavedEditingChanges;
  unsavedButtonsComponent.onSaveButtonClick = handleUpdateMovie;
}

function loadAndRenderUnsavedButtonsComponentForNewMovie() {
  unsavedButtonsComponent = new UnsavedChangesButtonsComponent(
    'unsaved-buttons',
  );
  unsavedButtonsComponent.message = '¿Deseas crear la película?';
  unsavedButtonsComponent.saveButtonText = 'Crear';
  unsavedButtonsComponent.displayDiscardButton = false;
  unsavedButtonsComponent.onSaveButtonClick = handleCreateMovie;
}

async function fetchAndLoadMovieData() {
  const movieId = getCurrentMovieIdFromUrl();
  const movie = await fetchMovieData(movieId);
  currentMovieData = movie;
  console.log('movie', movie);
  loadMovieDataIntoComponents(movie);
}

/**
 *
 *
 * @returns {Promise<Movie>} Carousel Movies
 */
async function fetchMovieData(movieId) {
  const url = `/api/admin/movies/${movieId}`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok)
    throw new Error('Something went wrong fetching Movie Data', response);

  return response.json();
}

/**
 *
 * @param {Movie} movie
 */
function loadMovieDataIntoComponents(movie) {
  loadImagesIntoComponents(movie);
  loadDataIntoSwitches(movie);
  loadDataIntoInputs(movie);
}

/**
 *
 * @param {Movie} movie
 */
function loadImagesIntoComponents(movie) {
  loadBannerImageIntoCarousel(movie);
  loadMoviePoster(movie);
}

/**
 *
 *
 * @param {Movie} movie
 */
function loadBannerImageIntoCarousel(movie) {
  carousel.items = [movie];
  dismemberCarousel();
}
/**
 *
 *
 * @param {Movie} movie
 */
function loadMoviePoster(movie) {
  const url = movie.imageName;
  assignImageToMoviePoster(url);
}
/**
 *
 *
 * @param {Movie} movie
 */
function loadDataIntoSwitches(movie) {
  displayInBillboardSwitch.checked = movie.displayInBillboard;
  displayInCarouselSwitch.checked = movie.displayInCarousel;
  displayAsPremiereSwitch.checked = movie.isPremiere;
}

/**
 *
 * @param {Movie} movie
 */
function loadDataIntoInputs(movie) {
  imagePosterInputComponent.text = movie.imageName;
  imageBannerInputComponent.text = movie.bannerName;
  titleInputComponent.text = movie.name;
  genreInputComponent.text = movie.genre;
  ratedInputComponent.text = movie.rated;
  calificationInputComponent.text = movie.calification;
  durationInputComponent.text = movie.durationInMinutes;
  sinopsisInputComponent.text = movie.sinopsis;
}

function dismemberCarousel(keepImageGradient = true) {
  const carouselParent = document.getElementById('carousel-slide');
  const [carouselContainer] = Array.from(carouselParent.children);
  const [slider] = Array.from(carouselContainer.children);
  carouselContainer.replaceChildren(slider);

  const [slide] = Array.from(slider.children);
  const [image] = Array.from(slide.children);
  if (!keepImageGradient) {
    const backgroundImage = image.style.backgroundImage;
    const [gradient, imageUrl] = backgroundImage.split('url');
    const newBackgroundImage = `url${imageUrl}`;
    image.style.backgroundImage = newBackgroundImage;
  }
  slide.replaceChildren(image);
}

/**
 *
 *
 * @param {string} url
 */
function assignImageToMoviePoster(url) {
  const moviePosterContainer = document.getElementById('movie-poster');
  const img = moviePosterContainer.querySelector('img');
  img.setAttribute('src', url);
}

function displayUnsavedChangesButtons() {
  unsavedButtonsComponent.display = true;
}

function hideUnsavedChangesButtons() {
  unsavedButtonsComponent.display = false;
}

function registerNewUnsavedMovieAttribute(attribute, value) {
  const currentValue = currentMovieData[attribute];
  const sameAsCurrentValue = currentValue === value;

  if (sameAsCurrentValue) {
    delete unsavedMovieData[attribute];
    if (unsavedChanges && Object.keys(unsavedMovieData).length === 0) {
      discardUnsavedEditingChanges();
    }
    return;
  }

  if (!unsavedChanges) {
    unsavedChanges = true;
    displayUnsavedChangesButtons();
  }
  unsavedMovieData[attribute] = value;
}

function discardUnsavedEditingChanges() {
  unsavedChanges = false;
  unsavedMovieData = {};
  hideUnsavedChangesButtons();
  loadMovieDataIntoComponents(currentMovieData);
}

async function handleUpdateMovie() {
  const updatedMovie = await updateMovie(currentMovieData.id, unsavedMovieData);
  currentMovieData = updatedMovie;
  unsavedChanges = false;
  unsavedMovieData = {};
  hideUnsavedChangesButtons();
  loadMovieDataIntoComponents(updatedMovie);
}

/**
 *
 *
 * @param {number} movieId
 * @param {Partial<Movie>} params
 * @returns {Promise<Movie>} - updated Movie object
 */
async function updateMovie(movieId, params) {
  const url = `/api/admin/movies/${movieId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok)
    throw new Error('Something went wrong updating the movie', response);

  return response.json();
}

async function handleCreateMovie() {
  // Checkear que todos los inputs tengan valores
  const errorsDisplayed = checkFormValuesAndDisplayErrorIfNecessary();
  if (errorsDisplayed) return;
  // Llamar al endpoint para crear la pelicula
  console.log('unsavedChanges', getFormValues());
  const createdMovie = await createMovie(getFormValues());
  loadMovieDataIntoComponents(createdMovie);
}

/**
 *
 *
 * @returns {boolean} indicates if errors are being displayed
 */
function checkFormValuesAndDisplayErrorIfNecessary() {
  const titleText = getFormTitleValue();
  if (!titleText) titleInputComponent.enableBorderColorAsError();

  const genreText = getFormGenreValue();
  if (!genreText) genreInputComponent.enableBorderColorAsError();

  const ratedText = getFormRatedValue();
  if (!ratedText) ratedInputComponent.enableBorderColorAsError();

  const calificationText = getFormCalificationValue();
  if (!calificationText) calificationInputComponent.enableBorderColorAsError();

  const durationText = getFormDurationValue();
  if (!durationText) durationInputComponent.enableBorderColorAsError();

  const sinopsisText = getFormSinopsisValue();
  if (!sinopsisText) sinopsisInputComponent.enableBorderColorAsError();

  if (
    !titleText ||
    !genreText ||
    !ratedText ||
    !calificationText ||
    !durationText ||
    !sinopsisText
  )
    return true;

  return false;
}

function getFormValues() {
  // TODO: Add poster and banner image url
  const title = getFormTitleValue();
  const genre = getFormGenreValue();
  const rated = getFormRatedValue();
  const calification = getFormCalificationValue();
  const durationInMinutes = getFormDurationValue();
  const sinopsis = getFormSinopsisValue();
  const displayInBillboard = getFormDisplayInBillboardBoolean();
  const displayInCarousel = getFormDisplayInCarouselBoolean();
  const displayAsPremiere = getFormDisplayAsPremiereBoolean();

  console.log(displayInBillboard);

  return {
    name: title,
    genre,
    rated,
    calification: Number(calification),
    durationInMinutes: Number(durationInMinutes),
    sinopsis,
    bannerName: undefined,
    imageName: undefined,
    displayInBillboard: displayInBillboard === 'true',
    displayInCarousel: displayInCarousel === 'true',
    isPremiere: displayAsPremiere === 'true',
    trailerUrl: 'foo',
  };
}

function getFormTitleValue() {
  return titleInputComponent.text;
}

function getFormGenreValue() {
  return genreInputComponent.text;
}

function getFormRatedValue() {
  return ratedInputComponent.text;
}

function getFormCalificationValue() {
  return calificationInputComponent.text;
}

function getFormDurationValue() {
  return durationInputComponent.text;
}

function getFormSinopsisValue() {
  return sinopsisInputComponent.text;
}

function getFormDisplayInBillboardBoolean() {
  return displayInBillboardSwitch.checked;
}

function getFormDisplayInCarouselBoolean() {
  return displayInCarouselSwitch.checked;
}

function getFormDisplayAsPremiereBoolean() {
  return displayAsPremiereSwitch.checked;
}

/**
 *
 *
 * @param {Partial<Movie>} params
 * @returns {Promise<Movie>} - Created Movie object
 */
async function createMovie(params) {
  console.log(params);
  console.log(JSON.stringify(params));
  const url = `/api/admin/movies`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok)
    throw new Error('Something went wrong creating the movie', response);

  return response.json();
}
