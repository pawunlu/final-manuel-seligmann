import { NotFoundException } from '@nestjs/common';

export class MovieNotFoundException extends NotFoundException {
  constructor() {
    super({ message: 'Movie not found error', code: 'ERROR:MOVIE_NOT_FOUND' });
  }
}
