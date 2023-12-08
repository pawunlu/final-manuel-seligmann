import { NotFoundException } from '@nestjs/common';

export class ScreeningNotFoundException extends NotFoundException {
  constructor(screeningId?: number) {
    super({
      message: `Screening ${
        screeningId ? `ID '${screeningId}' ` : ''
      }not found error`,
      code: 'ERROR:SCREENING_NOT_FOUND',
    });
  }
}
