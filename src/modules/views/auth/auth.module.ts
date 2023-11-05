import { Module } from '@nestjs/common';
import { AuthViewsController } from './controllers/auth-views.controller';

@Module({
  controllers: [AuthViewsController]
})
export class AuthModule {}
