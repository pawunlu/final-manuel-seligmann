import { Test, TestingModule } from '@nestjs/testing';
import { ReservationScreeningsController } from './reservation-screenings.controller';

describe('ReservationScreeningsController', () => {
  let controller: ReservationScreeningsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationScreeningsController],
    }).compile();

    controller = module.get<ReservationScreeningsController>(ReservationScreeningsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
