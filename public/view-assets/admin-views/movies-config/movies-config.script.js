import { TableComponent } from '../common/components/table/table.component.js';

/**
 * represents a Movie
 * @typedef {Object} Movie
 * @property {string} id - Movie's ID
 * @property {string} name - Movie's Name
 * @property {number} calification - Movie's Calification
 * @property {string} imageUrl - Movie's image url
 * @property {string} bannerName - Movie's Banner url
 * @property {number} durationInMinutes - Movie's duration in minutes
 * @property {Date} createdAt - The date the Movie was created
 */

/** @type {TableComponent} */
let moviesTable = null;

/** @type {Movie[]} */
let movies = [];

/** @type {number} */
let totalMovies = null;

/** @type {number} */
let currentPage = null;

/** @type {number} */
let totalPages = null;

document.addEventListener('DOMContentLoaded', async () => {
  loadAndRenderTableComponent();
  const { page, query } = getUrlParams();
  fetchAndLoadMovies(page || 1, query || '');
});

function loadAndRenderTableComponent() {
  const actions = [
    {
      name: 'Agregar',
      onClick: handleAddMovieEvent,
    },
  ];

  const columns = [
    {
      key: 'name',
      name: 'Nombre',
    },
    {
      key: 'displayInBillboard',
      name: 'En cartelera',
    },
  ];

  moviesTable = new TableComponent('movies-list');
  moviesTable.actions = actions;
  moviesTable.columns = columns;
  moviesTable.render();
}

function handleAddMovieEvent() {
  console.log('Mostrar formulario para nueva pelicula');
}

function getUrlParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const page = urlParams.get('page');
  const query = urlParams.get('query');

  return {
    page,
    query,
  };
}

async function fetchAndLoadMovies(page, query) {
  const { items, ...paginated } = await fetchPaginatedMovies(page, query);
  console.log(items);
  console.log(paginated);
  const parsedItems = parseMoviesIntoTableItems(items);
  moviesTable.rows = parsedItems;
}

async function fetchPaginatedMovies(page, query) {
  const searchParams = new URLSearchParams();
  searchParams.append('page', page);
  if (query) searchParams.append('query', query);

  const url = `/api/admin/movies?${searchParams.toString()}`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok)
    throw new Error('Something went wrong fetching the Movies', response);

  return response.json();
}

/**
 *
 *
 * @param {Movie[]} movies
 * @returns {object}
 */
function parseMoviesIntoTableItems(movies) {
  return movies.map((movie) => ({
    id: movie.id,
    rowColumns: [
      { key: 'name', name: movie.name },
      {
        key: 'displayInBillboard',
        name: movie.displayInBillboard ? 'Si' : 'No',
      },
    ],
    actions: [
      {
        name: 'Ver',
        onClick: () => onEditMovieEventClick(movie),
      },
    ],
  }));
}

/**
 *
 *
 * @param {Movie} movie
 */
function onEditMovieEventClick(movie) {
  console.log('Se quiere editar esta pelicula', movie);
}
