import { Controller, Get, Render, Res } from '@nestjs/common';
import { AdminViewsService } from '../services/admin-views.service';

@Controller('admin')
export class AdminViewsController {
  constructor(private adminViewsService: AdminViewsService) {}

  @Get('')
  handleAdminHomeView(@Res() res) {
    return res.redirect('admin/tablero');
  }

  @Get('tablero')
  @Render('admin/dashboard')
  handleDashboardView() {
    // Handle the login view
  }

  @Get('carousel')
  @Render('admin/carousel-config')
  handleCarouselConfigView() {
    // Handle the carousel config view
  }

  @Get('cartelera')
  @Render('admin/billboard-config')
  handleBillboardConfigView() {
    // Handle the billboard config view
  }

  @Get('peliculas')
  @Render('admin/movies-config')
  handleMoviesConfigView() {
    // Handle the movies config view
  }

  @Get('pelicula/:movieId')
  @Render('admin/movie-config')
  handleMovieConfigView() {
    // Handle the movie config view
  }

  @Get('nueva-pelicula')
  @Render('admin/movie-config')
  handleNewMovieConfigView() {
    // Handle the new movie config view
  }

  // @Get('tipo-salas')
  // @Render('admin/room-types')
  // handleRoomTypesView() {
  //   // Handle the new movie config view
  // }
}
