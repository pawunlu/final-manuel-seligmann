import { CreateMercadoPagoPaymentDto } from '../../../mercado-pago/dtos';
import { MercadoPagoApiService } from '../../../mercado-pago/services';
import { ReservationDto } from '../../../reservations/dtos';
import { CreatePaymentByTypeDto, CreatePaymentDto } from '../../dtos';
import { PaymentTypeNotSupported as PaymentTypeNotSupportedException } from '../../errors';
import { CreatePaymentByType } from '../../types';
import { MercadoPagoService } from './../../../mercado-pago/services/mercado-pago/mercado-pago.service';
import { PaymentTypes } from './../../enums/payments.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  constructor(
    private mercadoPagoService: MercadoPagoService,
    private mercadoPagoApiService: MercadoPagoApiService,
  ) {}

  async createOneByType(
    type: string,
    values: CreatePaymentByTypeDto,
    reservation: ReservationDto,
  ): Promise<CreatePaymentByType> {
    const createPaymentDto: CreatePaymentDto = {
      type,
      reservationId: reservation.id,
      ...values,
    };

    switch (type) {
      case PaymentTypes.MERCADO_PAGO:
        return this.createMercadoPagoPayment(createPaymentDto, reservation);
      default:
        throw new PaymentTypeNotSupportedException(type);
    }
  }

  private async createMercadoPagoPayment(
    values: CreatePaymentDto,
    reservation: ReservationDto,
  ) {
    const mercadoPagoApiPayment =
      await this.mercadoPagoApiService.createPayment(reservation);

    const mercadoPagoPaymentDto: CreateMercadoPagoPaymentDto = {
      ...values,
      externalId: mercadoPagoApiPayment.id,
      url: mercadoPagoApiPayment.sandbox_init_point,
    };

    const mercadoPagoPayment = await this.mercadoPagoService.createOne(
      mercadoPagoPaymentDto,
    );

    delete mercadoPagoPayment.externalId;

    return mercadoPagoPayment;
  }
}
