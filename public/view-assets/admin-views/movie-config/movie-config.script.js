import { CarouselComponent } from '../../common/components/carousel/carousel.component.js';
import { InputComponent } from '../../common/components/input/Input.component.js';

/** @type {CarouselComponent} */
let carousel = null;

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
 * @property {string} sinopsis - Movie's Sinosis
 * @property {Date} createdAt - The date the Movie was created
 */

document.addEventListener('DOMContentLoaded', async () => {
  loadAndRenderComponents();
  await fetchAndLoadMovieData();
});

function loadAndRenderComponents() {
  loadAndRenderDefaultCarouselSlide();
  loadAndRenderDefaultMoviePoster();
  loadAndRenderMovieTitleInputComponent();
  loadAndRenderMovieGenreInputComponent();
  loadAndRenderMovieRatedInputComponent();
  loadAndRenderMovieCalificationInputComponent();
  loadAndRenderMovieDurationInputComponent();
  loadAndRenderMovieSinopsisInputComponent();
}

function loadAndRenderDefaultCarouselSlide() {
  carousel = new CarouselComponent('carousel-slide');
  carousel.items = [
    {
      id: null,
      bannerName: 'https://flowbite.com/docs/images/carousel/carousel-1.svg',
    },
  ];
  carousel.render();

  dismemberCarousel();
}

function loadAndRenderDefaultMoviePoster() {
  const defaultImageUrl =
    'https://media.comicbook.com/files/img/default-movie.png';

  assignImageToMoviePoster(defaultImageUrl);
}

function loadAndRenderMovieTitleInputComponent() {
  titleInputComponent = new InputComponent('movie-title-input');
  titleInputComponent.placeholder = 'Título';
  titleInputComponent.backgroundColor = 'var(--transparent-blue1)';
  titleInputComponent.placeholderColor = 'var(--yellow1)';
  titleInputComponent.showResetButton = false;
  titleInputComponent.render();
}

function loadAndRenderMovieGenreInputComponent() {
  genreInputComponent = new InputComponent('movie-genre-input');
  genreInputComponent.placeholder = 'Género';
  genreInputComponent.backgroundColor = 'var(--transparent-blue1)';
  genreInputComponent.placeholderColor = 'var(--yellow1)';
  genreInputComponent.showResetButton = false;
  genreInputComponent.render();
}

function loadAndRenderMovieRatedInputComponent() {
  ratedInputComponent = new InputComponent('movie-rated-input');
  ratedInputComponent.placeholder = 'Clasificación';
  ratedInputComponent.backgroundColor = 'var(--transparent-blue1)';
  ratedInputComponent.placeholderColor = 'var(--yellow1)';
  ratedInputComponent.showResetButton = false;
  ratedInputComponent.render();
}

function loadAndRenderMovieCalificationInputComponent() {
  calificationInputComponent = new InputComponent('movie-calification-input');
  calificationInputComponent.placeholder = 'Calificación (max. 10)';
  calificationInputComponent.backgroundColor = 'var(--transparent-blue1)';
  calificationInputComponent.placeholderColor = 'var(--yellow1)';
  calificationInputComponent.showResetButton = false;
  calificationInputComponent.render();
}

function loadAndRenderMovieDurationInputComponent() {
  durationInputComponent = new InputComponent('movie-duration-input');
  durationInputComponent.placeholder = 'Duración (en minutos)';
  durationInputComponent.backgroundColor = 'var(--transparent-blue1)';
  durationInputComponent.placeholderColor = 'var(--yellow1)';
  durationInputComponent.showResetButton = false;
  durationInputComponent.render();
}

function loadAndRenderMovieSinopsisInputComponent() {
  sinopsisInputComponent = new InputComponent('movie-sinopsis-input');
  sinopsisInputComponent.placeholder = 'Sinopsis';
  sinopsisInputComponent.backgroundColor = 'var(--transparent-blue1)';
  sinopsisInputComponent.placeholderColor = 'var(--yellow1)';
  sinopsisInputComponent.showResetButton = false;
  sinopsisInputComponent.render();
}

async function fetchAndLoadMovieData() {
  const pathname = window.location.pathname;
  const regex = /\d+/;
  const [movieId] = regex.exec(pathname);
  const movie = await fetchMovieData(movieId);
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
 * @param {Movie} movie
 */
function loadDataIntoInputs(movie) {
  titleInputComponent.text = movie.name;
  genreInputComponent.text = movie.genre;
  ratedInputComponent.text = movie.rated;
  calificationInputComponent.text = movie.calification;
  durationInputComponent.text = movie.durationInMinutes;
  sinopsisInputComponent.text = movie.sinopsis;
}

function dismemberCarousel() {
  const carouselParent = document.getElementById('carousel-slide');
  const [carouselContainer] = Array.from(carouselParent.children);
  const [slider] = Array.from(carouselContainer.children);
  carouselContainer.replaceChildren(slider);

  const [slide] = Array.from(slider.children);
  const [image] = Array.from(slide.children);
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
