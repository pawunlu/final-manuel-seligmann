export class PaymentTypeNotSupported extends Error {
  constructor(type: string) {
    super(`Payment Type "${type}" not supported error`);
  }
}
