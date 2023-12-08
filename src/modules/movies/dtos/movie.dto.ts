export class MovieDto {
  id: number;

  name: string;

  genre: string;

  durationInMinutes: number;

  rated: string;

  calification: number;

  sinopsis: string;

  imageName: string;

  bannerName: string;

  trailerUrl: string;

  displayInBillboard: boolean;

  billboardPositionIndex?: number;

  displayInCarousel: boolean;

  carouselPositionIndex?: number;

  isPremiere: boolean;

  // screenings?: ScreeningDto[];

  createdAt: Date;

  updatedAt: Date;
}
