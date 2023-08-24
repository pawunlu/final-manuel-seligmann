import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicViewsService {
  handleRoomTypesViewData() {
    return {
      roomTypes: [
        {
          id: 1,
          name: 'Sala normal',
          unitPrice: 1000,
        },
        {
          id: 2,
          name: 'Sala 3D',
          unitPrice: 1500,
        },
        {
          id: 3,
          name: 'Sala 4D',
          unitPrice: 2000,
        },
        {
          id: 4,
          name: 'Monster screen',
          unitPrice: 2000,
        },
      ],
    };
  }
}
