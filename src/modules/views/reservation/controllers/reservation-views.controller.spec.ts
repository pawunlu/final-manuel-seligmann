import { Test, TestingModule } from '@nestjs/testing';
import { ReservationViewsController } from './reservation-views.controller';

describe('ReservationViewsController', () => {
  let controller: ReservationViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationViewsController],
    }).compile();

    controller = module.get<ReservationViewsController>(
      ReservationViewsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
