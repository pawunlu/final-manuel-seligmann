import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: 'Format must be "YYYY-MM-DD"',
      },
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          const datePattern =
            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
          return datePattern.test(value);
        },
      },
    });
  };
}
