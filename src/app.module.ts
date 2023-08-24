import { Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { RoomTypesModule } from './modules/room-types/room-types.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { ScreeningsModule } from './modules/screenings/screenings.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailsModule } from './modules/mails/mails.module';
import { ViewsModule } from './modules/views/views.module';

@Module({
  imports: [
    MoviesModule,
    RoomTypesModule,
    RoomsModule,
    ScreeningsModule,
    UsersModule,
    AuthModule,
    MailsModule,
    ViewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
