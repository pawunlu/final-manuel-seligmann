import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsString()
  genre: string;

  @IsNumber()
  durationInMinutes: number;

  @IsString()
  rated: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10)
  calification: number;

  @IsString()
  sinopsis: string;

  @IsString()
  @IsOptional()
  imageName?: string;

  @IsString()
  @IsOptional()
  bannerName?: string;

  @IsString()
  trailerUrl: string;

  @IsBoolean()
  displayInBillboard: boolean;

  @IsNumber()
  @IsOptional()
  billboardPositionIndex?: number;

  @IsBoolean()
  displayInCarousel: boolean;

  @IsNumber()
  @IsOptional()
  carouselPositionIndex: number;

  @IsBoolean()
  isPremiere: boolean;
}
