import { TableComponent } from '../common/components/table/table.component.js';
import { PaginatorComponent } from '../common/components/paginator/paginator.component.js';

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

/** @type {TableComponent} */
let roomTypesTable = null;

/** @type {PaginatorComponent} */
let paginator = null;

/** @type {Movie[]} */
let roomTypes = [];

/** @type {number} */
let totalRoomTypes = null;

/** @type {number} */
let currentPage = null;

/** @type {number} */
let totalPages = null;

document.addEventListener('DOMContentLoaded', async () => {
  loadAndRenderComponents();
  fetchAndLoadRoomTypes(1);
});

function loadAndRenderComponents() {
  loadAndRenderTableComponent();
  loadAndRenderPaginatorComponent();
}

function loadAndRenderTableComponent() {
  const actions = [
    {
      name: 'Agregar',
      onClick: handleAddRoomTypeEvent,
    },
  ];

  const columns = [
    {
      key: 'name',
      name: 'Nombre',
    },
    {
      key: 'price',
      name: 'Precio',
    },
    {
      key: 'is-visible',
      name: 'Visible',
    },
  ];

  roomTypesTable = new TableComponent('room-types-list');
  roomTypesTable.actions = actions;
  roomTypesTable.columns = columns;
  roomTypesTable.render();
}

function loadAndRenderPaginatorComponent() {
  paginator = new PaginatorComponent('paginator');
  paginator.totalPages = 1;
  paginator.currentPage = 1;
  paginator.onPageChange = handlePageChange;
  paginator.render();
}

function handleAddRoomTypeEvent() {
  console.log('Mostrar formulario para nueva room-type');
}

async function fetchAndLoadRoomTypes(page, query) {
  const { items, ...paginated } = await fetchPaginatedRoomTypes(page, query);
  console.log(items);
  console.log(paginated);
  const parsedItems = parseRoomTypesIntoTableItems(items);
  roomTypesTable.rows = parsedItems;

  paginator.currentPage = paginated.page;
  paginator.totalPages = paginated.totalPages;

  page = paginated.page;
  totalPages = paginated.totalPages;
}

async function fetchPaginatedRoomTypes(page, query) {
  const searchParams = new URLSearchParams();
  searchParams.append('page', page);
  if (query) searchParams.append('query', query);

  const url = `/api/admin/room-types?${searchParams.toString()}`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok)
    throw new Error('Something went wrong fetching the Room Types', response);

  return response.json();
}

/**
 *
 *
 * @param {RoomType[]} roomTypes
 * @returns {object}
 */
function parseRoomTypesIntoTableItems(roomTypes) {
  return roomTypes.map((roomType) => ({
    id: roomType.id,
    rowColumns: [
      { key: 'name', name: roomType.name },
      {
        key: 'price',
        name: roomType.price,
      },
      {
        key: 'is-visible',
        name: roomType.isVisible ? 'Si' : 'No',
      },
    ],
    actions: [
      {
        name: 'Ver',
        onClick: () => onEditMovieEventClick(roomType),
      },
    ],
  }));
}

/**
 *
 *
 * @param {RoomType} roomType
 */
function onEditMovieEventClick(roomType) {
  console.log('Se quiere editar este roomType', roomType);
}

function handlePageChange(newPage) {
  fetchAndLoadRoomTypes(newPage);
}
