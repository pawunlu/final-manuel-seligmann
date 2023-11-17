import { PaginatorComponent } from '../common/components/paginator/paginator.component.js';
import { TableComponent } from '../common/components/table/table.component.js';

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
 * represents a Room Type
 * @typedef {Object} Room
 * @property {number} id - Room  ID
 * @property {string} name - Room Name. e.g: "Sala 1"
 * @property {string} roomTypeId - Room's RoomTypeId
 * @property {RoomType} roomType - Room's RoomType
 * @property {boolean} isVisible - Shows if a room is visible
 * @property {Date} createdAt - The date the Room Type was created
 * @property {Date} updatedAt - The date the Room Type was last updated
 */

/** @type {TableComponent} */
let roomsTable = null;

/** @type {PaginatorComponent} */
let paginator = null;

/** @type {Movie[]} */
let rooms = [];

/** @type {number} */
let totalRooms = null;

/** @type {number} */
let currentPage = null;

/** @type {number} */
let totalPages = null;

document.addEventListener('DOMContentLoaded', async () => {
  loadAndRenderComponents();
  fetchAndLoadRooms(1);
});

function loadAndRenderComponents() {
  loadAndRenderTableComponent();
  loadAndRenderPaginatorComponent();
}

function loadAndRenderTableComponent() {
  const actions = [
    {
      name: 'Agregar',
      onClick: handleAddRoomEvent,
    },
  ];

  const columns = [
    {
      key: 'name',
      name: 'Nombre',
    },
    {
      key: 'room-type',
      name: 'Tipo de Sala',
    },
    {
      key: 'is-visible',
      name: 'Visible',
    },
  ];

  roomsTable = new TableComponent('rooms-list');
  roomsTable.actions = actions;
  roomsTable.columns = columns;
  roomsTable.render();
}

function handleAddRoomEvent() {
  console.log('Mostrar formulario para nueva room-type');
}

function loadAndRenderPaginatorComponent() {
  paginator = new PaginatorComponent('paginator');
  paginator.totalPages = 1;
  paginator.currentPage = 1;
  paginator.onPageChange = handlePageChange;
  paginator.render();
}

async function fetchAndLoadRooms(page, query) {
  const { items, ...paginated } = await fetchPaginatedRooms(page, query);
  const parsedItems = parseRoomsIntoTableItems(items);
  roomsTable.rows = parsedItems;

  paginator.currentPage = paginated.page;
  paginator.totalPages = paginated.totalPages;

  page = paginated.page;
  totalPages = paginated.totalPages;
}

async function fetchPaginatedRooms(page, query) {
  const searchParams = new URLSearchParams();
  searchParams.append('page', page);
  if (query) searchParams.append('query', query);

  const url = `/api/admin/rooms?${searchParams.toString()}`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok)
    throw new Error('Something went wrong fetching the Rooms', response);

  return response.json();
}

/**
 *
 *
 * @param {Room[]} rooms
 * @returns {object}
 */
function parseRoomsIntoTableItems(rooms) {
  return rooms.map((room) => ({
    id: room.id,
    rowColumns: [
      { key: 'name', name: room.name },
      {
        key: 'room-type',
        name: room.roomType.name,
      },
      {
        key: 'is-visible',
        name: room.isVisible ? 'Si' : 'No',
      },
    ],
    actions: [
      {
        name: 'Ver',
        onClick: () => onEditRoomEventClick(room),
      },
    ],
  }));
}

/**
 *
 *
 * @param {Room} room
 */
function onEditRoomEventClick(room) {
  console.log('Se quiere editar este room', room);
}

function handlePageChange(newPage) {
  fetchAndLoadRooms(newPage);
}
