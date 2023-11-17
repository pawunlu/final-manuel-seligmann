export class PaginatorComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #paginatorContainerHTMLComponent = null;

  /** @type {number} */
  #totalPages = 1;

  set totalPages(num) {
    this.#totalPages = num;
    this.#rebuildPaginator();
  }

  /** @type {number} */
  #currentPage = 1;

  set currentPage(num) {
    this.#currentPage = num;
    this.#rebuildPaginator();
  }

  /** @type {Function} */
  #onPageChange = null;

  set onPageChange(callbackFn) {
    this.#onPageChange = callbackFn;
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(`Element with ID "${parentContainerId}" was not found`);

    this.#paginatorContainerHTMLComponent = this.#createPaginatorComponent();
    this.#paginatorContainerHTMLComponent.style.display = 'none';
    this.#parentContainerHTMLComponent.appendChild(
      this.#paginatorContainerHTMLComponent,
    );
  }

  render() {
    this.#paginatorContainerHTMLComponent.style.display = 'inline-flex';
  }

  #rebuildPaginator() {
    this.#paginatorContainerHTMLComponent = this.#createPaginatorComponent();
    this.#parentContainerHTMLComponent.replaceChildren(
      this.#paginatorContainerHTMLComponent,
    );
  }

  #createPaginatorComponent() {
    const container = document.createElement('section');
    container.classList.add('paginator-container');

    const previousButtons = this.#createPreviousButtons();
    const pageButtons = this.#createPageButtons();
    const nextButtons = this.#createNextButtons();
    container.append(previousButtons, pageButtons, nextButtons);

    return container;
  }

  #createPreviousButtons() {
    const container = document.createElement('section');
    container.classList.add('page-button');
    container.addEventListener('click', () =>
      this.#onButtonClick(this.#currentPage - 1),
    );
    if (this.#currentPage === 1) container.style.display = 'none';

    const arrow = document.createElement('section');
    arrow.innerHTML = '‹';
    arrow.classList.add('previous-button');

    container.append(arrow);

    return container;
  }

  #createPageButtons() {
    const container = document.createElement('section');
    container.classList.add('pages-buttons');

    const firstPageButton = this.#createPageButton(1);
    const showFirstPageButton = this.#currentPage > 1;
    if (showFirstPageButton) container.append(firstPageButton);

    const showInitialEllipsis = this.#currentPage - 2 > 1;
    if (showInitialEllipsis) {
      const initialEllipsis = this.#createEllipsis();
      container.append(initialEllipsis);
    }

    const mainPageButtons = this.#createMainPageButtons();
    container.append(...mainPageButtons);

    const lastPageButton = this.#createPageButton(this.#totalPages);
    const showLastPageButton = this.#currentPage + 1 < this.#totalPages;
    if (showLastPageButton) container.append(lastPageButton);

    const showFinalEllipsis = this.#currentPage + 2 < this.#totalPages;
    if (showFinalEllipsis) {
      const finalEllipsis = this.#createEllipsis();
      const [lastPageButton, ...buttons] = Array.from(
        container.children,
      ).reverse();

      const newChildren = [...buttons.reverse(), finalEllipsis, lastPageButton];

      container.replaceChildren(...newChildren);
    }

    return container;
  }

  #createMainPageButtons() {
    let buttons = [];

    // Create current page button.
    const currentlySelectedButton = this.#createCurrentPageButton();
    buttons.push(currentlySelectedButton);
    // Create current's previous page button
    const previousSelectedButton = this.#createPageButton(
      this.#currentPage - 1,
    );
    // create current's next page button
    const nextSelectedButton = this.#createPageButton(this.#currentPage + 1);

    // Check if the current's previous page button is suitable
    const isPreviousButtonSuitable = this.#currentPage - 1 > 1;
    if (isPreviousButtonSuitable)
      buttons = [previousSelectedButton, ...buttons];

    // Check if the current's next page button is suitable
    const isNextButtonSuitable = this.#currentPage + 1 <= this.#totalPages;
    if (isNextButtonSuitable) buttons = [...buttons, nextSelectedButton];

    if (!isPreviousButtonSuitable && this.#currentPage + 2 < this.#totalPages) {
      const buttonToInject = this.#createPageButton(this.#currentPage + 2);
      buttons = [...buttons, buttonToInject];
    }

    if (!isNextButtonSuitable && this.#currentPage - 2 > 1) {
      const buttonToInject = this.#createPageButton(this.#currentPage - 2);
      buttons = [buttonToInject, ...buttons];
    }

    return buttons;
  }

  #createNextButtons() {
    const container = document.createElement('section');
    container.classList.add('page-button');
    container.addEventListener('click', () =>
      this.#onButtonClick(this.#currentPage + 1),
    );
    if (this.#totalPages === this.#currentPage)
      container.style.display = 'none';

    const arrow = document.createElement('section');
    arrow.innerHTML = '›';
    arrow.classList.add('next-button');

    container.append(arrow);

    return container;
  }

  /**
   *
   *
   * @param {number} pageNumber
   * @returns {HTMLElement}
   */
  #createPageButton(pageNumber) {
    const button = document.createElement('section');
    button.classList.add('page-button');
    button.innerHTML = pageNumber;
    button.addEventListener('click', () => this.#onButtonClick(pageNumber));
    return button;
  }

  /**
   *
   *
   * @returns {HTMLElement}
   */
  #createEllipsis() {
    const ellipsis = document.createElement('section');
    ellipsis.innerHTML = '...';
    ellipsis.classList.add('paginator-ellipsis');

    return ellipsis;
  }

  /**
   *
   *
   * @returns {HTMLElement}
   */
  #createCurrentPageButton() {
    const button = this.#createPageButton(this.#currentPage);
    button.classList.add('current-page-button');

    return button;
  }

  #onButtonClick(newPage) {
    if (this.#currentPage !== newPage && this.#onPageChange) {
      this.#currentPage = newPage;
      this.#onPageChange(newPage);
    }
  }
}
