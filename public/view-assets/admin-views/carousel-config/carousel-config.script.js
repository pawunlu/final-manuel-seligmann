import { CarouselComponent } from '../../common/components/carousel/carousel.component.js';
import { SlidesListComponent } from '../../admin-views/carousel-config/components/slides-list/slides-list.component.js';

/**
 * represents a Movie
 * @typedef {Object} Movie
 * @property {string} id - Movie's ID
 * @property {number} carouselPositionIndex - Movie's Carousel Position Index
 */

/** @type {CarouselComponent} */
let carouselComponent = null;

/** @type {SlidesListComponent} */
let slidesListComponent = null;

/** @type {Movie[]} */
let carouselMovies = [];

/** @type {Movie[]} */
let changesToSave = [];

document.addEventListener('DOMContentLoaded', async () => {
  loadAndRenderCarouselComponent();
  loadAndRenderSlidesListComponent();

  await fetchAndLoadMoviesIntoComponents();

  const button = document.getElementById('test-button');
  button.addEventListener('click', () => {
    const [first, second, third] = carouselMovies;
    const newListOrder = [third, second, first];
    carouselComponent.items = newListOrder;
  });
});

function loadAndRenderCarouselComponent() {
  carouselComponent = new CarouselComponent('preview-carousel');
  carouselComponent.render();
}

function loadAndRenderSlidesListComponent() {
  slidesListComponent = new SlidesListComponent('slides-list-container');
  slidesListComponent.render();
}

async function fetchAndLoadMoviesIntoComponents() {
  // TODO: Create some animation showing the carousel movies are loading as the data is been fetch
  // TODO set carousel as loading = true
  const movies = await fetchCarouselMovies();
  carouselMovies = movies;
  carouselComponent.items = movies;
  slidesListComponent.slides = movies;
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
