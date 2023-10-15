/**
 * represents a Seat
 * @typedef {Object} Seat
 * @property {string} id - Movie's ID
 * @property {string} coordinateX - Coordinate X
 * @property {string} coordinateY - Coordinate Y
 * @property {string} row - Row
 * @property {string} column - Column
 * @property {boolean} isOccupied
 */

/**
 * represents the Callback function params
 * @typedef {Object} CallbackFnParam
 * @property {"selected" | "unselected"} action
 * @property {Seat} seat
 * @property {Seat[]} selectedSeats
 */

export class RoomSeatsSelectorComponent {
  /** @type {HTMLElement} */
  #parentContainerHTMLComponent = null;

  /** @type {HTMLElement} */
  #roomSeatsSelectorHTMLContainer = null;

  /** @type {Function} */
  #onSeatSelectCallbackFn = null;

  /**
   *
   * @param {function(CallbackFnParam)} callbackFn
   */
  set onSeatClick(callbackFn) {
    this.#onSeatSelectCallbackFn = callbackFn;
  }

  /** @type {number} */
  #numberOfSelectableSeats = null;

  set numberOfSelectableSeats(number) {
    this.#numberOfSelectableSeats = number;
    // TODO: Reset selected seats
  }

  /** @type {Seat[]} */
  #seats = [];

  set seats(seats) {
    this.#seats = seats;

    this.#resetAndAppendSeatsList();
  }

  /** @type {Seat[]} */
  #selectedSeats = [];

  set selectedSeats(seats) {
    this.#selectedSeats = seats;

    this.#resetAndAppendSeatsList();
  }

  /** @type {boolean} */
  #showCoordinates = false;
  set showCoordinates(showCoordinates) {
    this.#showCoordinates = showCoordinates;
    // TODO: Re display seats list
  }

  constructor(parentContainerId) {
    this.#parentContainerHTMLComponent =
      document.getElementById(parentContainerId);
    if (!this.#parentContainerHTMLComponent)
      throw new Error(
        `[RoomSeatsSelectorComponent] Element #${parentContainerId} was not found`,
      );

    this.#roomSeatsSelectorHTMLContainer =
      this.#createRoomSeatsSelectorComponentContainer();
    this.#roomSeatsSelectorHTMLContainer.style.display = 'none';

    this.#parentContainerHTMLComponent.appendChild(
      this.#roomSeatsSelectorHTMLContainer,
    );
  }

  render() {
    this.#roomSeatsSelectorHTMLContainer.style.display = 'block';
  }

  #createRoomSeatsSelectorComponentContainer() {
    const roomContainer = document.createElement('section');
    roomContainer.classList.add('room-container');

    const seatsContainer = this.#createSeatsContainer();
    roomContainer.appendChild(seatsContainer);

    return roomContainer;
  }

  #createSeatsContainer() {
    const htmlContainer = document.createElement('section');
    htmlContainer.classList.add('room-seats');

    const maxColumn = Math.max(...this.#seats.map((seat) => seat.coordinateX));
    const maxRow = Math.max(...this.#seats.map((seat) => seat.coordinateY));

    for (let row = 0; row <= maxRow; row++) {
      const htmlSeatRow = document.createElement('section');

      for (let column = 0; column <= maxColumn; column++) {
        const htmlSeat = document.createElement('button');
        htmlSeatRow.appendChild(htmlSeat);

        // Search for the seat at this coordinate
        const coordinateSeat = this.#seats.find(
          (seat) => seat.coordinateX === column && seat.coordinateY === row,
        );
        // If there is not seat at this coordinate then it's an empty space
        if (!coordinateSeat) htmlSeat.classList.add('empty-room-space');
        if (coordinateSeat) {
          htmlSeat.setAttribute('reservation-seat-id', coordinateSeat.id);
          htmlSeat.setAttribute(
            'reservation-seat-coordinate',
            `${coordinateSeat.coordinateX}-${coordinateSeat.coordinateY}`,
          );
          htmlSeat.classList.add('room-seat');
          htmlSeat.onclick = (event) =>
            this.#onHTMLSeatClick(
              event.target.attributes['reservation-seat-id'].value,
            );

          if (coordinateSeat.isOccupied) {
            htmlSeat.classList.add('occupied-seat');
          } else {
            htmlSeat.classList.add('not-occupied-seat');
          }

          // Check if the coordinate seat is in the select seats Array
          const isSeatSelected = this.#selectedSeats.find(
            (seat) => seat.id === coordinateSeat.id,
          );
          if (isSeatSelected) this.#selectHTMLSeat(htmlSeat);
        }
      }
      htmlContainer.appendChild(htmlSeatRow);
    }

    return htmlContainer;
  }

  #resetAndAppendSeatsList() {
    this.#parentContainerHTMLComponent.innerHTML = '';
    this.#roomSeatsSelectorHTMLContainer =
      this.#createRoomSeatsSelectorComponentContainer();

    this.#parentContainerHTMLComponent.appendChild(
      this.#roomSeatsSelectorHTMLContainer,
    );
  }

  #onHTMLSeatClick(seatId) {
    const htmlSeatElement = this.#parentContainerHTMLComponent.querySelector(
      `[reservation-seat-id="${seatId}"]`,
    );

    const htmlSeatElementSelected = this.#isHTMLSeatSelected(htmlSeatElement);
    if (htmlSeatElementSelected) {
      this.#unselectHTMLSeat(htmlSeatElement);
      this.#selectedSeats = this.#selectedSeats.filter(
        (se) => se.id !== seatId,
      );
    } else {
      this.#selectHTMLSeat(htmlSeatElement);
      this.#selectedSeats.push(this.#seats.find((s) => s.id === seatId));
    }

    if (this.#onSeatSelectCallbackFn)
      this.#onSeatSelectCallbackFn({
        action: htmlSeatElementSelected ? 'unselected' : 'selected',
        seat: this.#seats.find((seat) => seat.id === seatId),
        selectedSeats: this.#selectedSeats,
      });
  }

  #isHTMLSeatSelected(seat) {
    return seat.classList.contains('selected-seat');
  }

  #selectHTMLSeat(seat) {
    seat.classList.add('selected-seat');
  }

  #unselectHTMLSeat(seat) {
    seat.classList.remove('selected-seat');
  }
}
