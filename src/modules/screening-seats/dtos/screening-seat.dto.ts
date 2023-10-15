export class ScreeningSeatDto {
  id: number;
  coordinateX: number;
  coordinateY: number;
  column: string;
  row: string;
  reservationId: number;
  isVisible: boolean;
  isOccupied?: boolean;
}
