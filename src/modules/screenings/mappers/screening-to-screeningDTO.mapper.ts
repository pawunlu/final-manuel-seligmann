import { Screening } from '../../../database/models';
import { movieToMovieDtoMapper } from '../../movies/mappers';
import { ScreeningDto } from '../dtos';

type ScreeningMapperOptions = {
  includeMovieInfo: boolean;
};

export function screeningToScreeningDtoMapper(
  screening: Screening,
  config?: ScreeningMapperOptions,
): ScreeningDto {
  const { includeMovieInfo } = config || {};

  return {
    id: screening.id,
    startsAt: screening.startsAt,
    isVisible: screening.isVisible,
    cancelledAt: screening.cancelledAt,
    movieId: screening.movieId,
    ...(includeMovieInfo && {
      movie: movieToMovieDtoMapper(screening.movie),
    }),
    languageId: screening.languageId,
    // TODO: Language DTO
    roomId: screening.roomId,
    // TODO: Room DTO
    roomTypeId: screening.roomTypeId,
    // TODO: Room Type DTO
    createdAt: screening.createdAt,
    updatedAt: screening.updatedAt,
  };
}
