import { MercadoPagoPaymentDto } from './../../dtos/mercado-pago-payment.dto';
import { Injectable } from '@nestjs/common';
import { MercadoPagoRepository } from '../../repositories';
import { MercadoPagoPayment } from '../../../../database/models';
import { MercadoPagoPaymentDtoToMercadoPagoPayment } from '../../mappers/MercadoPagoPaymentDTO-to-MercadoPagoPayment.mapper';
import { MercadoPagoPaymentToMercadoPagoPaymentDTOMapper } from '../../mappers';
import { CreateMercadoPagoPaymentDto } from '../../dtos';

@Injectable()
export class MercadoPagoService {
  constructor(private mercadoPagoRepository: MercadoPagoRepository) {}

  async createOne(values: CreateMercadoPagoPaymentDto) {
    const paymentToCreate: MercadoPagoPayment = Object.assign(
      new MercadoPagoPayment(),
      MercadoPagoPaymentDtoToMercadoPagoPayment(
        values as MercadoPagoPaymentDto,
      ),
    );
    const createdPayment: MercadoPagoPayment =
      await this.mercadoPagoRepository.save(paymentToCreate);

    return MercadoPagoPaymentToMercadoPagoPaymentDTOMapper(createdPayment);
  }
}
