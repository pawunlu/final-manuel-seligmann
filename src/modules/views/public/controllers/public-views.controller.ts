import { Controller, Get, Render } from '@nestjs/common';
import { PublicViewsService } from '../services/public-views.service';

@Controller()
export class PublicViewsController {
  constructor(private publicViewsService: PublicViewsService) {}

  @Get()
  @Render('public/home')
  handleHomeView() {} // Inicio

  handleMovieScheduleView() {} // Cartelera

  handleMovieInformationView() {} // Mas informacion de una pelicula

  @Get('salas')
  @Render('public/room-types')
  handleRoomTypesView() {
    return this.publicViewsService.handleRoomTypesViewData();
  }

  handleAboutUsView() {} // Sobre nosotros
}
