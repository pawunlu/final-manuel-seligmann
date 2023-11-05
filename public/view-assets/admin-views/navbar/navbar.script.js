/**
 * represents a Movie
 * @typedef {Object} Item
 * @property {string} name - Item's Name
 * @property {string} url - Item's URL
 * @property {boolean | null} isCollapsibleOpen - Item's boolean indicating wheather the children should be shown or not
 * @property {ItemChild[] | null} children - Item's children
 */

/**
 * represents a Movie
 * @typedef {Object} ItemChild
 * @property {string} name - Item's Name
 * @property {string} url - Item's URL
 */

/** @type {boolean} - Only used on mobile screen resolutions */
let isNavBarOpen = false;

const bodyItemsList = [
  {
    name: 'Tablero',
    url: '/admin/tablero',
    isCollapsibleOpen: null,
    children: [],
  },
  {
    name: 'Peliculas',
    url: null,
    isCollapsibleOpen: true,
    children: [
      {
        name: 'Carousel',
        url: '/admin/carousel',
      },
      {
        name: 'Cartelera',
        url: '/admin/cartelera',
      },
      {
        name: 'Listado',
        url: '/admin/peliculas',
      },
    ],
  },
  {
    name: 'Salas',
    url: null,
    isCollapsibleOpen: true,
    children: [
      {
        name: 'Tipo de salas',
        url: '/admin/tipo-salas',
      },
      {
        name: 'Listado',
        url: '/admin/salas',
      },
    ],
  },
  {
    name: 'Functiones',
    url: '/admin/funciones',
    children: [],
  },
  {
    name: 'Reservas',
    url: '/admin/reservas',
    children: [],
  },
  {
    name: 'Usuarios',
    url: '/admin/usuarios',
    children: [],
  },
  {
    name: 'Ajustes de cuenta',
    url: '/admin/mi-cuenta',
    children: [],
  },
];

document.addEventListener('DOMContentLoaded', async () => {
  initializeNavbar();
});

function initializeNavbar() {
  loadAndRenderBodyItems();
  loadEvents();
}

function loadAndRenderBodyItems() {
  const navBody = document.getElementById('navbar-body');
  const itemsHTMLContainer = document.createElement('section');
  for (const item of bodyItemsList) {
    let htmlItem = null;
    if (isItemACollapsible(item)) {
      htmlItem = crateHTMLCollapsibleItem(item);
    } else {
      htmlItem = createHTMLItem(item);
    }
    itemsHTMLContainer.appendChild(htmlItem);
  }
  navBody.appendChild(itemsHTMLContainer);
}

/**
 * Checks if the given item is a Collapsible or not
 *
 * @param {Item} item
 * @returns {HTMLElement}
 */
function isItemACollapsible(item) {
  return item.children && item.children.length > 0;
}

/**
 * Creates an HTML not Collapsible item
 *
 * @param {Item} item
 * @returns {HTMLElement}
 */
function createHTMLItem(item) {
  const htmlItem = document.createElement('section');
  const text = document.createElement('p');
  text.innerHTML = item.name;
  htmlItem.appendChild(text);

  htmlItem.onclick = () => {
    handleRedirect(item.url);
  };

  htmlItem.classList.add('navbar-item');

  const currentPath = window.location.href;
  if (currentPath.includes(item.url)) htmlItem.classList.add('item-selected');

  return htmlItem;
}

/**
 * Checks if the given item is a Collapsible or not
 *
 * @param {Item} item
 * @returns {HTMLElement}
 */
function crateHTMLCollapsibleItem(item) {
  const container = document.createElement('section');

  const htmlItem = document.createElement('section');
  htmlItem.classList.add('navbar-item');
  container.appendChild(htmlItem);

  const text = document.createElement('p');
  text.innerHTML = item.name;
  htmlItem.appendChild(text);

  const collapsibleContainer = document.createElement('section');
  collapsibleContainer.classList.add('collapsible-container');
  container.appendChild(collapsibleContainer);

  htmlItem.onclick = () => {
    openOrCloseCollapsibleItem(item, collapsibleContainer);
  };

  const childrenContainer = document.createElement('section');
  childrenContainer.id = `children-container-${item.name}`;
  childrenContainer.classList.add('expanded');
  collapsibleContainer.appendChild(childrenContainer);

  for (const child of item.children) {
    const htmlChildItem = createHTMLItem(child);
    htmlChildItem.classList.add('child-item');
    childrenContainer.appendChild(htmlChildItem);
  }

  return container;
}

function handleRedirect(url) {
  window.location.href = url;
}

/**
 *
 *
 * @param {Item} item
 * @param {HTMLElement} htmlCollapsibleContainerItem
 */
function openOrCloseCollapsibleItem(item, htmlCollapsibleContainerItem) {
  item.isCollapsibleOpen = !item.isCollapsibleOpen;

  const childrenContainer = htmlCollapsibleContainerItem.children[0];
  childrenContainer.classList.toggle('expanded');
}

function loadEvents() {
  loadFooterItemsEvents();
  loadOpenCloseButtonEvents();
}

function loadFooterItemsEvents() {
  loadLogoutEvent();
}

function loadLogoutEvent() {
  const button = document.getElementById('logout-button');
  button.addEventListener('click', () => {
    console.log('Log out');
  });
}

function loadOpenCloseButtonEvents() {
  const button = document.getElementById('open-close-button');
  button.addEventListener('click', () => {
    isNavBarOpen = !isNavBarOpen;
    if (isNavBarOpen) {
      displayNavbar();
    } else {
      hideNavbar();
    }
  });
}

function displayNavbar() {}

function hideNavbar() {}
