import { AutoGenerateSeatDto } from '../../dtos';

const possibleLettersForRows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getRowLettersForIndex(index: number) {
  if (index < possibleLettersForRows.length)
    return possibleLettersForRows.charAt(index);

  let result = '';

  while (index >= 0) {
    result =
      possibleLettersForRows.charAt(index % possibleLettersForRows.length) +
      result;
    index = Math.floor(index / possibleLettersForRows.length) - 1;
  }
  return result;
}

export function createListByColumnsAndRows(
  numberOfColumns: number,
  numberOfRows: number,
): AutoGenerateSeatDto[] {
  const seats: AutoGenerateSeatDto[] = [];

  for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      seats.push({
        coordinateX: columnIndex,
        coordinateY: rowIndex,
        column: `${columnIndex + 1}`,
        row: getRowLettersForIndex(rowIndex),
      });
    }
  }

  return seats;
}

export function logAutoGeneratedSeats(seats: AutoGenerateSeatDto[]) {
  const maxColumn = Math.max(...seats.map((seat) => seat.coordinateX));

  for (let columnIndex = 0; columnIndex <= maxColumn; columnIndex++) {
    const rowSeats = seats.filter((seat) => seat.coordinateX === columnIndex);
    const sortedSeats = rowSeats.sort((a, b) => a.coordinateY - b.coordinateY);
    const rowToPrint = sortedSeats.map((seat) => `${seat.column}-${seat.row}`);
    console.log(JSON.stringify(rowToPrint));
  }
}
