import { ScreeningSeat } from '../../../database/models';
import { ScreeningSeatDto } from '../dtos';

export function screeningSeatToScreeningSeatDtoMapper(
  screeningSeat: ScreeningSeat,
  isOccupied?: boolean,
): ScreeningSeatDto {
  return {
    id: screeningSeat.id,
    coordinateX: screeningSeat.coordinateX,
    coordinateY: screeningSeat.coordinateY,
    row: screeningSeat.row,
    column: screeningSeat.column,
    isVisible: screeningSeat.isVisible,
    reservationId: screeningSeat.screeningId,
    isOccupied: isOccupied,
  };
}
