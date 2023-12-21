class MercadoPagoPaymentCreatedDataDto {
  id: number;
}

export class MercadoPagoPaymentCreatedWebhookPayloadDTO {
  action: string;
  api_version: string;
  data: MercadoPagoPaymentCreatedDataDto;
  date_created: Date;
  id: number;
  live_mode: false;
  type: string;
  user_id: string;
}
