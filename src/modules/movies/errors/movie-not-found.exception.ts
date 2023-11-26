import { NotFoundException } from '@nestjs/common';

export class MovieNotFoundException extends NotFoundException {
  constructor(movieId?: number) {
    super({
      message: `Movie ${movieId ? `ID '${movieId}' ` : ''}not found error`,
      code: 'ERROR:MOVIE_NOT_FOUND',
    });
  }
}
