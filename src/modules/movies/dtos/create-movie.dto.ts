export class CreateMovieDto {
  name: string;
  genre: string;
  durationInMinutes: number;
  rated: string;
  calification: number;
  sinopsis: string;
  imageName: string;
  bannerImage: string;
  trailerUrl: string;
  displayInBillboard: boolean;
  billboardPositionIndex: number;
  displayInCarousel: boolean;
  carouselPositionIndex: number;
  isPremiere: boolean;
}
