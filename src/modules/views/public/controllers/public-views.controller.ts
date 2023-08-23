import { Controller } from '@nestjs/common';
import { PublicViewsService } from '../services/public-views.service';

@Controller('')
export class PublicViewsController {
  constructor(private publicViewsService: PublicViewsService) {}

  handleHomeView() {} // Inicio
  handleMovieScheduleView() {} // Cartelera
  handleMovieInformationView() {} // Mas informacion de una pelicula
  handleRoomTypesView() {} // Salas
  handleAboutUsView() {} // Sobre nosotros
}
