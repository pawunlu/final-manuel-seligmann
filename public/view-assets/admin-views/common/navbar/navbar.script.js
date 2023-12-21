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

/** @type {boolean} */
let isNavBarOpen = null;

const bodyItemsList = [
  // {
  //   name: 'Tablero',
  //   url: '/admin/tablero',
  //   isCollapsibleOpen: null,
  //   children: [],
  // },
  {
    name: 'Peliculas',
    url: null,
    isCollapsibleOpen: true,
    children: [
      {
        name: 'Listado',
        url: '/admin/peliculas',
      },
      {
        name: 'Carousel',
        url: '/admin/carousel',
      },
      {
        name: 'Cartelera',
        url: '/admin/cartelera',
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
    name: 'Funciones',
    url: '/admin/funciones',
    isCollapsibleOpen: true,
    children: [
      {
        name: 'Actuales y futuras',
        url: '/admin/funciones',
      },
      {
        name: 'Finalizadas',
        url: '/admin/funciones/finalizadas',
      },
    ],
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
  setupDisplayValue();
  loadAndRenderBodyItems();
  loadEvents();
}

function setupDisplayValue() {
  const showNavbar = getComputedStyle(
    document.documentElement,
  ).getPropertyValue('--show-navbar');

  isNavBarOpen = showNavbar === 'true';
  openOrCloseNavbar();
}

function openOrCloseNavbar() {
  if (isNavBarOpen) {
    displayNavbar();
  } else {
    hideNavbar();
  }
}

function hideNavbar() {
  const navbarContainer = document.getElementById('nav-bar-container');
  navbarContainer.style.display = 'none';

  const navbarToggleButton = document.getElementById('navbar-toggle-button');
  navbarToggleButton.style.left = '0px';

  document.documentElement.style.setProperty('--navbar-display-width', '0px');
}

function displayNavbar() {
  const navbarContainer = document.getElementById('nav-bar-container');
  navbarContainer.style.display = 'block';

  const navbarToggleButton = document.getElementById('navbar-toggle-button');
  navbarToggleButton.style.left = 'calc(var(--navbar-display-width) - 40px)';

  document.documentElement.style.setProperty('--navbar-display-width', '250px');
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
    Utils.handleRedirect(item.url);
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
  container.id = `collapsible-item-${item.name}`;

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

  assignIconToCollapsable(item, container);

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

/**
 *
 *
 * @param {Item} item
 * @param {HTMLElement} collapsibleHTMLItem
 */
function assignIconToCollapsable(item, collapsibleHTMLItem) {
  if (item.isCollapsibleOpen) {
    collapsibleHTMLItem.children[0].classList.remove('collapsable-closed');
    collapsibleHTMLItem.children[0].classList.add('collapsable-opened');
  } else {
    collapsibleHTMLItem.children[0].classList.add('collapsable-closed');
    collapsibleHTMLItem.children[0].classList.remove('collapsable-opened');
  }
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

  const collapsibleItem = document.getElementById(
    `collapsible-item-${item.name}`,
  );

  assignIconToCollapsable(item, htmlCollapsibleContainerItem.parentElement);
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
  const button = document.getElementById('navbar-toggle-button');
  button.addEventListener('click', () => {
    isNavBarOpen = !isNavBarOpen;
    openOrCloseNavbar();
  });
}
