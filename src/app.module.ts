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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
