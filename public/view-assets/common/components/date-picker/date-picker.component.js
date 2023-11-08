import { InputComponent } from '../input/Input.component.js';

export class DatePickerComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {InputComponent} */
  #inputComponent = null;

  /** @type {HTMLElement} */
  #datePickerContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #calendarContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #calendarHeaderHTMLComponent = null;

  /** @type {HTMLElement} */
  #calendarBodyHTMLComponent = null;

  /** @type {HTMLElement} */
  #calendarFooterHTMLComponent = null;

  /** @type {boolean} */
  #displayingCalendar = false;

  /** @type {Date | null} */
  #selectedDate = null;
  get selectedDate() {
    return this.#selectedDate;
  }
  set selectedDate(date) {
    this.#selectedDate = date;
    if (date) {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      this.#inputComponent.text = `${day}/${month + 1}/${year}`;
      this.#changeCalendarDate(year, month);
    } else {
      this.#inputComponent.text = this.#emptyDateText
        ? this.#emptyDateText
        : '';
      const currentDate = new Date();
      const month = date?.getMonth() ?? currentDate.getMonth();
      const year = date?.getFullYear() ?? currentDate.getFullYear();
      this.#changeCalendarDate(year, month);
    }
  }

  /** @type {string} */
  #emptyDateText = null;
  get emptyDateText() {
    return this.#emptyDateText;
  }
  set emptyDateText(text) {
    this.#emptyDateText = text;
    if (!this.#selectedDate) this.#inputComponent.text = text;
  }

  /** @type {Function} */
  #onSelectCallbackFn = null;
  set onSelect(callbackFn) {
    this.#onSelectCallbackFn = callbackFn;
  }

  #backgroundColor = null;
  get backgroundColor() {
    return this.#backgroundColor;
  }

  set backgroundColor(backgroundColor) {
    this.#backgroundColor = backgroundColor;
    this.#inputComponent.backgroundColor = backgroundColor;
  }

  #placeholderColor = null;
  get placeholderColor() {
    return this.#placeholderColor;
  }

  set placeholderColor(placeholderColor) {
    this.#placeholderColor = placeholderColor;
    this.#inputComponent.placeholderColor = placeholderColor;
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(`Element with ID "${parentContainerId}" was not found`);

    const datePickerComponentContainer =
      this.#createDatePickerComponentContainer();
    datePickerComponentContainer.style.display = 'none';
    this.#parentContainerHTMLComponent.appendChild(
      datePickerComponentContainer,
    );
  }

  render() {
    this.#datePickerContainerHTMLComponent.style.display = 'block';
  }

  #createDatePickerComponentContainer() {
    const datePickerContainer = document.createElement('div');
    datePickerContainer.setAttribute(
      'id',
      `${this.#parentContainerHTMLComponent.id}-date-picker-container`,
    );
    datePickerContainer.classList = 'date-picker';
    this.#datePickerContainerHTMLComponent = datePickerContainer;
    this.#parentContainerHTMLComponent.appendChild(datePickerContainer);

    const inputComponent = new InputComponent(
      `${this.#parentContainerHTMLComponent.id}-date-picker-container`,
    );
    inputComponent.backgroundColor =
      this.#backgroundColor ?? 'rgba(25, 48, 129, 0.25)';
    inputComponent.placeholderColor =
      this.#placeholderColor ?? 'rgba(255, 197, 110, 1)';
    inputComponent.placeholder = 'Fecha';
    inputComponent.showResetButton = false;
    inputComponent.HTMLComponents.inputHTMLComponent.readOnly = true;
    inputComponent.HTMLComponents.inputHTMLComponent.tabIndex = -1;
    inputComponent.render();
    this.#inputComponent = inputComponent;

    const currentDate = this.selectedDate ? this.selectedDate : new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const calendarContainer = this.#createCalendarContainerElement();
    calendarContainer.style.display = 'none';
    this.#calendarContainerHTMLComponent = calendarContainer;
    datePickerContainer.appendChild(calendarContainer);

    this.#appendSpecificMonthCalendarToContainer(currentYear, currentMonth);

    inputComponent.onFocusEvent((event) => {
      this.#displayCalendar();
    });
    inputComponent.onResizeEvent((size) => {
      const inputWidth = size.width;
      const calendarWidth = this.#calendarContainerHTMLComponent.offsetWidth;
      const calendarPositionX = inputWidth / 2 - calendarWidth / 2;
      calendarContainer.style.left = `${
        calendarPositionX >= 0 ? calendarPositionX : 0
      }px`;
    });

    document.addEventListener('mousedown', (event) => {
      if (!this.#displayingCalendar) return;

      const shouldCloseCalendar = this.#shouldHideCalendar(event.target);
      if (shouldCloseCalendar) {
        this.#hideCalendar();
      } else {
        event.preventDefault();
      }
    });

    return datePickerContainer;
  }

  #resetCalendarContainer() {
    this.#calendarContainerHTMLComponent.replaceChildren();
  }

  #appendSpecificMonthCalendarToContainer(year, month) {
    const calendarHeader = this.#createCalendarHeaderElement(year, month);
    this.#calendarHeaderHTMLComponent = calendarHeader;
    this.#calendarContainerHTMLComponent.appendChild(calendarHeader);

    const calendarBody = this.#createCalendarBodyElement(year, month);
    this.#calendarBodyHTMLComponent = calendarBody;
    this.#calendarContainerHTMLComponent.appendChild(calendarBody);

    const calendarFooter = this.#createCalendarFooterElement(year, month);
    this.#calendarFooterHTMLComponent = calendarFooter;
    this.#calendarContainerHTMLComponent.appendChild(calendarFooter);
  }

  #createCalendarContainerElement() {
    const calendarContainer = document.createElement('div');
    calendarContainer.setAttribute(
      'id',
      `${this.#parentContainerHTMLComponent.id}-calendar-container`,
    );
    calendarContainer.classList = 'calendar-container';

    return calendarContainer;
  }

  #createCalendarHeaderElement(year, month) {
    const date = new Date(year, month, 1);
    const calendarHeader = document.createElement('section');
    calendarHeader.setAttribute(
      'id',
      `${this.#parentContainerHTMLComponent.id}-calendar-header`,
    );
    calendarHeader.classList = 'calendar-header';

    const previousButtonContainer = document.createElement('span');
    const previousButton = document.createElement('button');
    previousButton.classList = 'previous-month-button';
    previousButton.innerHTML = '‹';
    previousButton.onclick = () => {
      this.#switchToPreviousMonth(year, month);
    };
    previousButtonContainer.appendChild(previousButton);
    calendarHeader.appendChild(previousButtonContainer);

    const actualMonthContainer = document.createElement('span');
    const monthName = `${date.toLocaleString('default', { month: 'long' })}`;
    actualMonthContainer.innerHTML = `${monthName[0].toUpperCase()}${monthName.substring(
      1,
    )} ${year}`;
    calendarHeader.appendChild(actualMonthContainer);

    const nextButtonContainer = document.createElement('span');
    const nextButton = document.createElement('button');
    nextButton.classList = 'next-month-button';
    nextButton.innerHTML = '›';
    nextButton.onclick = () => {
      this.#switchToNextMonth(year, month);
    };
    nextButtonContainer.appendChild(nextButton);
    calendarHeader.appendChild(nextButtonContainer);

    return calendarHeader;
  }

  #createCalendarBodyElement(year, month) {
    const calendarBody = document.createElement('section');
    calendarBody.setAttribute(
      'id',
      `${this.#parentContainerHTMLComponent.id}-calendar-body`,
    );
    calendarBody.classList = 'calendar-body';

    const calendarTable = this.#createCalendarTableForASpecificMonth(
      year,
      month,
    );
    calendarBody.appendChild(calendarTable);

    return calendarBody;
  }

  #createCalendarFooterElement(year, month) {
    const calendarFooter = document.createElement('section');
    calendarFooter.setAttribute(
      'id',
      `${this.#parentContainerHTMLComponent.id}-calendar-footer`,
    );
    calendarFooter.classList = 'calendar-footer';
    const todayButtonContainer = document.createElement('span');
    const todayButton = document.createElement('button');
    todayButton.innerHTML = 'Hoy';
    todayButton.classList = 'today-button';
    todayButton.onclick = () => {
      this.selectedDate = new Date();
      this.#hideCalendar();
      if (this.#onSelectCallbackFn) this.#onSelectCallbackFn(this.selectedDate);
    };
    todayButtonContainer.appendChild(todayButton);
    calendarFooter.appendChild(todayButtonContainer);

    const clearButtonContainer = document.createElement('span');
    const clearButton = document.createElement('button');
    clearButton.innerHTML = 'Limpiar';
    clearButton.classList = 'clear-button';
    clearButton.onclick = () => {
      this.selectedDate = null;
      this.#hideCalendar();
      if (this.#onSelectCallbackFn) this.#onSelectCallbackFn(this.selectedDate);
    };
    clearButtonContainer.appendChild(clearButton);
    calendarFooter.appendChild(clearButtonContainer);

    return calendarFooter;
  }

  #createCalendarTableForASpecificMonth(year, month) {
    const tableElement = document.createElement('table');
    const tableHeaderElement = document.createElement('thead');
    const headerRowElement = document.createElement('tr');
    for (
      let weekdayNumber = 0;
      weekdayNumber < weekdays.length;
      weekdayNumber++
    ) {
      const weekday = weekdays[weekdayNumber];
      const weekdayHeaderColumn = document.createElement('th');
      weekdayHeaderColumn.innerHTML = weekday.shortName;
      headerRowElement.appendChild(weekdayHeaderColumn);
    }

    tableHeaderElement.append(headerRowElement);
    tableElement.append(tableHeaderElement);

    const tableBodyElement = document.createElement('tbody');
    const tableRows = this.#createCalendarRowsOfSpecificMonth(year, month);
    for (const tableRow of tableRows) {
      tableBodyElement.appendChild(tableRow);
    }

    tableElement.appendChild(tableBodyElement);

    return tableElement;
  }

  #createCalendarRowsOfSpecificMonth(year, month) {
    const currentMonthFirstDate = new Date(year, month, 1);
    const monthName = `${currentMonthFirstDate.toLocaleString('default', {
      month: 'long',
    })}`;
    const rows = [];

    const currentMonthCalendarDays = calculateWeekdaysForSpecificMonth(
      year,
      month,
    );

    for (
      let firstWeekDayNumber = 0;
      firstWeekDayNumber < currentMonthCalendarDays.length;
      firstWeekDayNumber += 7
    ) {
      const tableRowElement = document.createElement('tr');
      for (let weekDayNumber = 0; weekDayNumber < 7; weekDayNumber++) {
        const weekDay =
          currentMonthCalendarDays[firstWeekDayNumber + weekDayNumber];
        // console.log(`[${firstWeekDayNumber}][${weekDayNumber}]`, weekDay);
        const tableDataElement = document.createElement('td');
        const tableDayElement = document.createElement('button');
        const classList = [
          ...(this.#isSameDate(this.selectedDate, weekDay)
            ? ['selected-date']
            : []),
          ...(!this.#isSameMonth(currentMonthFirstDate, weekDay)
            ? ['not-current-month']
            : []),
        ];
        tableDayElement.classList = classList;
        tableDayElement.innerHTML = weekDay.getDate();
        tableDayElement.onclick = () => {
          this.selectedDate = weekDay;
          this.#hideCalendar();
          if (this.#onSelectCallbackFn)
            this.#onSelectCallbackFn(this.selectedDate);
        };
        tableDataElement.appendChild(tableDayElement);
        tableRowElement.appendChild(tableDataElement);
      }
      rows.push(tableRowElement);
    }

    return rows;
  }

  #displayCalendar() {
    this.#displayingCalendar = true;
    this.#calendarContainerHTMLComponent.style.display = 'inline-flex';

    const inputWidth =
      this.#inputComponent.HTMLComponents.inputHTMLComponentContainer
        .offsetWidth;
    const calendarWidth = this.#calendarContainerHTMLComponent.offsetWidth;
    this.#calendarContainerHTMLComponent.style.left = `${
      inputWidth / 2 - calendarWidth / 2
    }px`;
  }

  #hideCalendar() {
    this.#calendarContainerHTMLComponent.style.display = 'none';
    this.#displayingCalendar = false;
    this.#inputComponent.HTMLComponents.inputHTMLComponent.blur();
  }

  #shouldHideCalendar(targetClicked) {
    // Only close if the target clicked is not the input or the calendar
    if (
      targetClicked === this.#inputComponent.HTMLComponents.inputHTMLComponent
    )
      return false;
    if (targetClicked === this.#calendarContainerHTMLComponent) return false;
    if (this.#isCalendarChild(targetClicked)) return false;

    return true;
  }

  #isCalendarChild(htmlElement) {
    if (htmlElement === this.#calendarContainerHTMLComponent) return true;
    if (!htmlElement.parentElement) return false;

    return this.#isCalendarChild(htmlElement.parentElement);
  }

  #changeCalendarDate(year, month) {
    this.#resetCalendarContainer();
    this.#appendSpecificMonthCalendarToContainer(year, month);
  }

  #switchToPreviousMonth(currentYear, currentMonth) {
    const previousMonthFirstDay = new Date(currentYear, currentMonth - 1, 1);
    this.#changeCalendarDate(
      previousMonthFirstDay.getFullYear(),
      previousMonthFirstDay.getMonth(),
    );
  }

  #switchToNextMonth(year, month) {
    const nextMonthFirstDay = new Date(year, month + 1, 1);
    this.#resetCalendarContainer();
    this.#changeCalendarDate(
      nextMonthFirstDay.getFullYear(),
      nextMonthFirstDay.getMonth(),
    );
  }

  #isSameDate(date1, date2) {
    if (!date1 || !date2) return false;

    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  #isSameMonth(date1, date2) {
    if (!date1 || !date2) return false;
    return date1.getMonth() === date2.getMonth();
  }
}

const weekdays = [
  { name: 'sunday', shortName: 'D' },
  { name: 'monday', shortName: 'L' },
  { name: 'tuesday', shortName: 'M' },
  { name: 'wednesday', shortName: 'M' },
  { name: 'thursday', shortName: 'J' },
  { name: 'friday', shortName: 'D' },
  { name: 'saturday', shortName: 'S' },
];

/**
 *
 *
 * @param {number} year
 * @param {number} month
 * @returns {Date[]}
 */
function calculateWeekdaysForSpecificMonth(year, month) {
  const currentMonthDays = [];
  const previousMonthDays = [];
  const nextMonthDays = [];

  // Calculate current month days
  const currentMonthFirstDate = new Date(year, month, 1);
  const currentMonthLastDate = new Date(year, month + 1, 0);
  for (
    let date = currentMonthFirstDate.getDate();
    date <= currentMonthLastDate.getDate();
    date++
  ) {
    currentMonthDays.push(new Date(year, month, date));
  }

  // Calculate the previous month remaining days
  const previousMonthLastDate = new Date(year, month, 0);
  let previousMonthRemainingDays = currentMonthFirstDate.getDay() - 0; // Zero --> Sunday weekday number --> First day of the calendar
  const previousMonthFirstRemainingDate = new Date(
    year,
    month,
    previousMonthLastDate.getDate() - previousMonthRemainingDays,
  );
  for (
    let date = previousMonthFirstRemainingDate.getDate() + 1;
    date <= previousMonthLastDate.getDate();
    date++
  ) {
    previousMonthDays.push(new Date(year, month - 1, date));
  }

  // Calculate the next month remaining days
  const nextMonthLastFirstDate = new Date(year, month + 1, 1);
  const nextMonthRemainingDays = 6 - currentMonthLastDate.getDay(); // Six --> Saturday weekday number --> Last day of the calendar
  const previousMonthLastRemainingDate = new Date(
    year,
    month,
    nextMonthLastFirstDate.getDate() + nextMonthRemainingDays,
  );
  for (
    let date = nextMonthLastFirstDate.getDate();
    date < previousMonthLastRemainingDate.getDate();
    date++
  ) {
    nextMonthDays.push(new Date(year, month + 1, date));
  }

  return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
}
