import { MercadoPagoApiService } from './../mercado-pago-api/mercado-pago-api.service';
import { Injectable } from '@nestjs/common';
import { ReservationsService } from '../../../reservations/services';
import { MERCADO_PAGO_WEBHOOK_EVENT_TYPES } from '../../enums';
import { MercadoPagoPaymentCreatedWebhookPayloadDTO } from '../../dtos';
import { ReservationDto } from '../../../reservations/dtos';

@Injectable()
export class MercadoPagoWebhooksService {
  constructor(
    private mercadoPagoApiService: MercadoPagoApiService,
    private reservationsService: ReservationsService,
  ) {}

  async handleWebhook(type: MERCADO_PAGO_WEBHOOK_EVENT_TYPES, payload: any) {
    console.log(
      `Procesing MP Webhook with Type: ${type} - Body: ${JSON.stringify(
        payload,
      )}`,
    );
    switch (type) {
      case MERCADO_PAGO_WEBHOOK_EVENT_TYPES.PAYMENT_CREATED:
        return this.handlePaymentCreated(payload);
      default:
        console.warn(`[WARNING] MP Webhook type not supported: "${type}"`);
    }
  }

  async handlePaymentCreated(
    payload: MercadoPagoPaymentCreatedWebhookPayloadDTO,
  ) {
    try {
      const payment = await this.mercadoPagoApiService.getPayment(
        `${payload.data.id}`,
      );

      if (!payment)
        throw new Error(
          `Failed to handle MP payment creation. Payment with ID ${payload.data.id} was not found!`,
        );

      const reservation = payment.metadata['reservation'] as ReservationDto;

      await this.reservationsService.confirmOneById(reservation.id);

      console.log(
        `[SUCESS] Reservation ID ${reservation.id} confirmed throught MP Payment`,
      );
    } catch (error) {
      console.error(
        `[ERROR] Reservation failed to be confirmed throught MP Payment`,
      );
      console.error(error);
    }
  }
}
