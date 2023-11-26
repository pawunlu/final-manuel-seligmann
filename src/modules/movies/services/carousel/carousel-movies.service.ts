import { Injectable } from '@nestjs/common';
import { MoviesService } from '..';
import { MovieDto } from '../../dtos';
import { MovieNotFoundException } from '../../errors';
import { In } from 'typeorm';
import { Movie } from '../../../../database/models';

@Injectable()
export class CarouselMoviesService {
  constructor(private moviesService: MoviesService) {}

  async findCarouselMovies(): Promise<MovieDto[]> {
    const { items } = await this.moviesService.findAllBy({
      filters: {
        displayInCarousel: true,
      },
      orderBy: {
        carouselPositionIndex: 'ASC',
      },
      paginated: {
        all: true,
      },
    });
    return items;
  }

  async updateCarouselMoviesOrder(newCarouselMovies: MovieDto[]) {
    const { items: movies } = await this.moviesService.findAllBy({
      filters: {
        id: In(newCarouselMovies.map((movie) => movie.id)),
      },
    });

    // Check if all the newMoviesOrder Ids exists
    if (newCarouselMovies.length !== movies.length) {
      for (const newMovieOrder of newCarouselMovies) {
        const movieExists = Boolean(
          movies.find((movie) => Number(newMovieOrder.id) === Number(movie.id)),
        );

        if (!movieExists) throw new MovieNotFoundException(newMovieOrder.id);
      }
    }

    const currentCarouselMovies = await this.findCarouselMovies();
    const carouselMoviesToBeDropped: Partial<Movie>[] = [];

    // check if a current carousel movie needs to be dropped from the carousel
    for (const currentCarouselMovie of currentCarouselMovies) {
      const shouldBeDropped = !Boolean(
        newCarouselMovies.find(
          (newCarouselMovie) =>
            Number(newCarouselMovie.id) === Number(currentCarouselMovie.id),
        ),
      );
      if (shouldBeDropped) {
        carouselMoviesToBeDropped.push({
          id: currentCarouselMovie.id,
          displayInCarousel: false,
          carouselPositionIndex: null,
        });
      }
    }

    const moviesWithNewCarouselIndex: Partial<Movie>[] = newCarouselMovies.map(
      (movie, index) => ({
        id: movie.id,
        displayInCarousel: true,
        carouselPositionIndex: index,
      }),
    );

    await Promise.all(
      [...carouselMoviesToBeDropped, ...moviesWithNewCarouselIndex].map(
        (movie) =>
          this.moviesService.updateOne(movie.id, {
            displayInCarousel: movie.displayInCarousel,
            carouselPositionIndex: movie.carouselPositionIndex,
          }),
      ),
    );
  }
}
