import { Movie } from '../../../database/models';
import { MovieDto } from '../dtos';

type MovieMapperOptions = {
  includeScreenings: boolean;
};

export function movieToMovieDtoMapper(
  movie: Movie,
  config?: MovieMapperOptions,
): MovieDto {
  const { includeScreenings } = config || {};
  return {
    id: movie.id,
    name: movie.name,
    genre: movie.genre,
    durationInMinutes: movie.durationInMinutes,
    rated: movie.rated,
    calification: movie.calification,
    sinopsis: movie.sinopsis,
    imageName: movie.imageName,
    bannerName: movie.bannerName,
    trailerUrl: movie.trailerUrl,
    displayInBillboard: movie.displayInBillboard,
    billboardPositionIndex: movie.billboardPositionIndex,
    displayInCarousel: movie.displayInCarousel,
    carouselPositionIndex: movie.carouselPositionIndex,
    isPremiere: movie.isPremiere,
    ...(includeScreenings && { screenings: movie.screenings }),
    createdAt: movie.createdAt,
    updatedAt: movie.updatedAt,
  };
}
