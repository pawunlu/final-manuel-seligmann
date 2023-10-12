import { NotFoundException } from '@nestjs/common';

export class ScreeningNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: 'Screening not found error',
      code: 'ERROR:SCREENING_NOT_FOUND',
    });
  }
}
