import { Controller, Get, Render } from '@nestjs/common';
import { AdminViewsService } from '../services/admin-views.service';

@Controller('admin')
export class AdminViewsController {
  constructor(private adminViewsService: AdminViewsService) {}

  @Get('login')
  @Render('auth/login')
  handleHomeView() {
    // return this.adminViewsService.handleHomeView();
  }
}
