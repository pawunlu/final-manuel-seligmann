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
  carouselComponent.render();

  await fetchAndLoadMoviesIntoCarousel();
});

async function fetchAndLoadMoviesIntoCarousel() {
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
