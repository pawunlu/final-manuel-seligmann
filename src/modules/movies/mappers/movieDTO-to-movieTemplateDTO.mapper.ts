import { MovieDto, MovieTemplateDto } from '../dtos';

export function movieDtoToMovieTemplate(movieDto: MovieDto): MovieTemplateDto {
  return {
    ...movieDto,
    showRibbon: movieDto.isPremiere === true,
  };
}
