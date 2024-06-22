import { z } from 'zod';

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),

  string: z
    .string()
    .min(1, 'Parameter must not be empty')
    .optional(),

  number: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'Parameter must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'Parameter must be a positive number')
};
