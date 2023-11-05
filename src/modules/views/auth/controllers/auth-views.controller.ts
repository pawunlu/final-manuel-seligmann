import { Controller, Get, Render } from '@nestjs/common';

@Controller('auth')
export class AuthViewsController {
  @Get('login')
  @Render('auth/login')
  handleHomeView() {
    // Handle the login view
  }
}
