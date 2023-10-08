import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from '.';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
