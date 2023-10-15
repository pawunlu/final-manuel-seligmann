import { Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { RoomTypesModule } from './modules/room-types/room-types.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { ScreeningsModule } from './modules/screenings/screenings.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailsModule } from './modules/mails/mails.module';
import { ViewsModule } from './modules/views/views.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envValidationSchema from './config/env.config';
import { database } from './config/typeorm.config';
import { RoomSeatsModule } from './modules/room-seats/room-seats.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { ReservationSeatsModule } from './modules/reservation-seats/reservation-seats.module';
import { ScreeningSeatsRepository } from './modules/screening-seats/repositories/screening-seats/screening-seats.repository';
import { ScreeningSeatsModule } from './modules/screening-seats/screening-seats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
    }),
    MoviesModule,
    RoomTypesModule,
    RoomsModule,
    ScreeningsModule,
    UsersModule,
    AuthModule,
    MailsModule,
    ViewsModule,
    RoomSeatsModule,
    LanguagesModule,
    ReservationSeatsModule,
    ScreeningSeatsModule,
  ],
  controllers: [],
  providers: [ScreeningSeatsRepository],
})
export class AppModule {}
