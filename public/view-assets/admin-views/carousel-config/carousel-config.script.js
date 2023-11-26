import { CarouselComponent } from '../../common/components/carousel/carousel.component.js';
import { SlidesListComponent } from '../../admin-views/carousel-config/components/slides-list/slides-list.component.js';
import { UnsavedChangesButtonsComponent } from '../../admin-views/common/components/unsaved-changes/unsaved-changes.component.js';

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

/** @type {UnsavedChangesButtonsComponent} */
let unsavedChangesButtonsComponent = null;

/** @type {Movie[]} */
let carouselMovies = [];

/** @type {Movie[]} */
let unmodifiedCarouselMovies = [];

/** @type {Movie[]} */
let changesToSave = [];

document.addEventListener('DOMContentLoaded', async () => {
  loadAndRenderCarouselComponent();
  loadAndRenderSlidesListComponent();
  loadAndRenderUnsavedChangesComponent();

  await fetchAndLoadMoviesIntoComponents();
});

function loadAndRenderCarouselComponent() {
  carouselComponent = new CarouselComponent('preview-carousel');
  carouselComponent.render();
}

function loadAndRenderSlidesListComponent() {
  slidesListComponent = new SlidesListComponent('slides-list-container');
  slidesListComponent.onSlidesPositionsChange = handleNewSlidesPosition;
  slidesListComponent.render();
}

function loadAndRenderUnsavedChangesComponent() {
  unsavedChangesButtonsComponent = new UnsavedChangesButtonsComponent(
    'unsaved-changes-buttons',
  );
  unsavedChangesButtonsComponent.onDiscardButtonClick =
    handleDiscardButtonClick;

  unsavedChangesButtonsComponent.onSaveButtonClick = handleSaveButtonClick;
  unsavedChangesButtonsComponent.display = false;
}

async function fetchAndLoadMoviesIntoComponents() {
  // TODO: Create some animation showing the carousel movies are loading as the data is been fetch
  // TODO set carousel as loading = true
  const movies = await fetchCarouselMovies();
  unmodifiedCarouselMovies = movies;
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

/**
 *
 *
 * @param {Movie[]} newMoviesOrder
 */
async function updateCarouselMoviesOrder(newMoviesOrder) {
  const url = `/api/admin/movies/carousel`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMoviesOrder),
  });

  if (!response.ok)
    throw new Error(
      'Something went wrong updating the carousel movies order',
      response,
    );
}

/**
 *
 *
 * @param {Movie[]} list
 */
function handleNewSlidesPosition(list) {
  carouselComponent.items = list;
  changesToSave = list;

  unsavedChangesButtonsComponent.display = true;
}

function handleDiscardButtonClick() {
  unsavedChangesButtonsComponent.display = false;
  changesToSave = [];
  carouselMovies = unmodifiedCarouselMovies;
  slidesListComponent.slides = carouselMovies;
  carouselComponent.items = carouselMovies;
}

async function handleSaveButtonClick() {
  console.log('se guardo lo siguiente:', changesToSave);
  // TODO: Call endpoint to store the new carousel movies order
  await updateCarouselMoviesOrder(changesToSave);
  await fetchAndLoadMoviesIntoComponents();
  unsavedChangesButtonsComponent.display = false;
  changesToSave = [];
}
