import { CarouselComponent } from '../../common/components/carousel/carousel.component.js';

/**
 * represents a Movie
 * @typedef {Object} Movie
 * @property {string} id - Movie's ID
 * @property {string} name - Movie's Name
 * @property {number} calification - Movie's Calification
 * @property {string} imageUrl - Movie's image url
 * @property {number} durationInMinutes - Movie's duration in minutes
 * @property {Date} createdAt - The date the Movie was created
 */

/** @type {CarouselComponent} */
let carouselComponent = null;

document.addEventListener('DOMContentLoaded', async () => {
  carouselComponent = new CarouselComponent('movies-carousel');
  carouselComponent.onSlideClick = (movie) => {
    redirectToMovieInfoView(movie.id);
  };
  carouselComponent.onReservationButtonClick = (movie) => {
    redirectToMovieReservation(movie.id);
  };
  carouselComponent.render();

  loadEvents();

  await fetchAndLoadMoviesIntoCarousel();
});

function loadEvents() {
  loadMoviesEvents();
  loadBillboardButtonEvent();
}

function loadMoviesEvents() {
  const moviesContainer = document.getElementById('movies-container');
  for (const movieDisplayer of moviesContainer.children) {
    const movieId = movieDisplayer.getAttribute('movie-id');
    movieDisplayer.addEventListener('click', () => {
      redirectToMovieInfoView(movieId);
    });
  }
}

function loadBillboardButtonEvent() {
  const button = document.getElementById('billboard-button');
  button.addEventListener('click', () => {
    redirectToMoviesBillboard();
  });
}

async function fetchAndLoadMoviesIntoCarousel() {
  // TODO: Create some animation of a way of showing the carousel movies are loading as the data is been fetch
  // TODO set carousel as loading = true
  const movies = await fetchCarouselMovies();
  carouselComponent.items = movies;
  // TODO set carousel as loading = false
}

/**
 *
 *
 * @returns {Promise<Movie[]>} Carousel Movies
 */
async function fetchCarouselMovies() {
  const url = `/api/movies/carousel`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok)
    throw new Error('Something went wrong fetching Movie Extra Data', response);

  return response.json();
}

function redirectToMovieInfoView(movieId) {
  window.location.href = `/pelicula/${movieId}`;
}

function redirectToMovieReservation(movieId) {
  window.location.href = `/reservar?movieId=${movieId}`;
}

function redirectToMoviesBillboard() {
  window.location.href = '/cartelera';
}
