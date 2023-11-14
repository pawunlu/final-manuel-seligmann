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

  @Get('tipo-salas')
  @Render('admin/room-types-config')
  handleRoomTypesView() {
    // Handle the room-types config view
  }

  @Get('tipo-salas/nueva')
  @Render('admin/room-type-config')
  handleNewRoomTypeView() {
    // Handle the new room-type config view
  }

  @Get('tipo-sala/:roomTypeId')
  @Render('admin/room-type-config')
  handleRoomTypeConfigView() {
    // Handle the room-type config view
  }

  @Get('salas')
  @Render('admin/rooms-config')
  handleRoomsView() {
    // Handle the rooms-config view
  }

  @Get('sala/:roomId')
  @Render('admin/room-config')
  handleNewRoomConfigView() {
    // Handle the new room-config view
  }

  @Get('salas/:roomId')
  @Render('admin/room-config')
  handleRoomConfigView() {
    // Handle the room-config view
  }

  @Get('funciones')
  @Render('admin/screenings-config')
  handleScreeningsConfigView() {
    // Handle the screenings-config view
  }

  @Get('funciones/:screeningId')
  @Render('admin/screening-config')
  handleScreeningConfigView() {
    // Handle the screening-config view
  }

  @Get('reservas')
  @Render('admin/reservations')
  handleReservationsView() {
    // Handle the reservations view
  }

  @Get('reservas/:reservationId')
  @Render('admin/reservation')
  handleReservationView() {
    // Handle the reservation view
  }
}
