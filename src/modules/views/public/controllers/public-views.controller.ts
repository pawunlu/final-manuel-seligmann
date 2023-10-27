import { Controller, Get, Render } from '@nestjs/common';
import { PublicViewsService } from '../services/public-views.service';

@Controller()
export class PublicViewsController {
  constructor(private publicViewsService: PublicViewsService) {}

  @Get()
  @Render('public/home')
  handleHomeView() {
    return this.publicViewsService.handleHomeView();
  }

  @Get('cartelera')
  @Render('public/movies')
  handleMovieBillboardView() {
    return this.publicViewsService.handleMovieBillboardViewData();
  }

  @Get('pelicula/:movieId')
  @Render('public/movie-info')
  handleMovieInformationView() {
    // Mas informacion de una pelicula
  }

  @Get('salas')
  @Render('public/room-types')
  handleRoomTypesView() {
    return this.publicViewsService.handleRoomTypesViewData();
  }

  @Get('sobre-nosotros')
  @Render('public/about-us')
  handleAboutUsView() {
    // Sobre nosotros
  }
}
