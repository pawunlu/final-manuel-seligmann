/**
 * Represents an Action
 * @typedef {Object} Action
 * @property {string} name - Actions's Name
 * @property {Function} onClick - Action's onclick callback fn
 */

/**
 * Represents a Column
 * @typedef {Object} Column
 * @property {string} key - Column's key
 * @property {string} name - Column's Name
 */

/**
 * Represents an RowAction
 * @typedef {Object} RowAction
 * @property {string} key - Row Actions's key
 * @property {string} name - Actions's Name
 * @property {Function} onClick - Action's onclick callback fn
 */

/**
 * Represents a RowColumn
 * @typedef {Object} RowColumn
 * @property {string} key - Row Column's key
 * @property {string} name - Row's Name
 */
/**
 * Represents an Row
 * @typedef {Object} Row
 * @property {string} id - Row's ID
 * @property {RowColumn[]} rowColumns[] - Row Column's key
 * @property {RowAction[]} actions[] - Row actions
 */

export class TableComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #tableContainerHTMLComponent = null;

  /** @type {Action[]} */
  #actions = [];

  /**
   *
   * @param {Action[]} actions
   */
  set actions(actions) {
    this.#actions = actions;
    this.#rebuildTable();
  }

  /** @type {Column[]} */
  #columns = [];

  /**
   *
   * @param {Column[]} columns
   */
  set columns(columns) {
    this.#columns = columns;
    this.#rebuildTable();
  }

  /** @type {Row[]} */
  #rows = [];

  /**
   *
   * @param {Row[]} rows
   */
  set rows(rows) {
    this.#rows = rows;
    this.#rebuildTable();
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(`Element with ID "${parentContainerId}" was not found`);

    this.#tableContainerHTMLComponent = this.#createTableComponent();
    this.#tableContainerHTMLComponent.style.display = 'none';
    this.#parentContainerHTMLComponent.appendChild(
      this.#tableContainerHTMLComponent,
    );
  }

  render() {
    this.#tableContainerHTMLComponent.style.display = 'block';
  }

  #rebuildTable() {
    this.#tableContainerHTMLComponent = this.#createTableComponent();
    this.#parentContainerHTMLComponent.replaceChildren(
      this.#tableContainerHTMLComponent,
    );
  }

  #createTableComponent() {
    const container = document.createElement('table');
    container.classList.add('table-container');

    container.append(this.#createTableHeader(), this.#createTableBody());

    return container;
  }

  #createTableHeader() {
    const container = document.createElement('thead');

    const row = document.createElement('tr');
    container.append(row);
    for (const column of this.#columns) {
      const header = document.createElement('th');
      header.innerHTML = column.name;
      header.classList.add(`header-column-${column.key}`);

      row.append(header);
    }

    // RowActions column
    const rowActionsHeader = document.createElement('th');
    rowActionsHeader.innerHTML = '';
    rowActionsHeader.classList.add('header-column-row-actions');
    const displayRowActions = this.#rows.find(
      (row) => row.actions && row.actions.length > 0,
    );
    if (!displayRowActions) rowActionsHeader.style.display = 'none';
    row.append(rowActionsHeader);

    // Actions column
    const actionsHeader = document.createElement('th');
    row.append(actionsHeader);
    actionsHeader.classList.add('header-column-actions');

    const actionsButton = document.createElement('button');
    actionsHeader.append(actionsButton);
    actionsButton.innerHTML = '⋮';
    const displayActions = this.#actions.length > 0;
    if (!displayActions) actionsHeader.style.display = 'none';
    actionsButton.addEventListener('click', () => {
      const isDropdownHidden = actionsDropdown.style.display === 'none';
      if (!isDropdownHidden) {
        actionsDropdown.style.display = 'none';
      } else {
        actionsDropdown.style.display = 'block';
      }
    });

    const actionsDropdown = document.createElement('ul');
    actionsHeader.appendChild(actionsDropdown);
    actionsDropdown.style.display = 'none';
    for (const action of this.#actions) {
      const actionItem = document.createElement('li');
      actionItem.innerHTML = action.name;
      actionItem.addEventListener('click', action.onClick);
      actionsDropdown.append(actionItem);
    }

    return container;
  }

  #createTableBody() {
    const container = document.createElement('tbody');

    for (const row of this.#rows) {
      const tableRow = document.createElement('tr');

      for (const column of this.#columns) {
        const td = document.createElement('td');
        const rowColumn = row.rowColumns.find(
          (rowColumn) => rowColumn.key === column.key,
        );

        if (rowColumn) {
          td.innerHTML = rowColumn.name;
          td.classList.add(`row-column-${column.key}`);
        }

        tableRow.append(td);
      }

      // Append row-actions if there is any
      for (const action of row.actions) {
        const td = document.createElement('td');
        td.classList.add('row-column-actions');

        const button = document.createElement('button');
        td.append(button);

        button.innerHTML = action.name;
        button.addEventListener('click', action.onClick);

        tableRow.append(td);
      }

      tableRow.lastElementChild.setAttribute('colspan', 2);

      container.append(tableRow);
    }

    return container;
  }
}
