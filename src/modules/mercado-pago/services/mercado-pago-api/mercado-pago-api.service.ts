import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';
import { ReservationDto } from '../../../reservations/dtos';
import { MercadoPagoPaymentDto } from '../../dtos';
import { getReadableDateFormat } from '../../../../common/utils';

@Injectable()
export class MercadoPagoApiService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
  }

  async getPayment(id: string) {
    const payment = new Payment(this.client);

    return payment.get({
      id,
    });
  }

  async createPayment(reservation: ReservationDto) {
    const preference = new Preference(this.client);
    return preference.create({
      body: {
        back_urls: {
          success: `${process.env.BASE_URL}/reservas/${reservation.uuid}`,
        },
        payer: {
          email: reservation.client.email,
          name: reservation.client.name,
        },
        notification_url: `${process.env.BASE_URL}/api/mercado-pago-webhooks`,
        items: [
          {
            id: '1',
            title: `Entradas x${reservation.seats.length} - ${
              reservation.screening.movie.name
            } - ${reservation.screening.language.name} - ${
              reservation.screening.roomType.name
            } - ${getReadableDateFormat(reservation.screening.startsAt)}`,
            quantity: 1,
            unit_price:
              Number(reservation.screening.roomType.price) *
              reservation.seats.length,
          },
        ],
        metadata: {
          reservation,
        },
      },
    });
  }
}
