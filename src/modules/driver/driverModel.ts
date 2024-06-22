import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Driver = z.infer<typeof DriverSchema>;
export const DriverSchema = z.object({
  driverid: z.number(),
  driverref: z.string(),
  number: z.number(),
  code: z.string(),
  forename: z.string(),
  surname: z.string(),
  dob: z.date(),
  nationality: z.string(),
  url: z.string()
});

// Input Validation for 'GET drivers/' endpoint
export const GetAllDriversSchema = z.object({
  queryParams: z.object({ name: commonValidations.string }),
});

// Input Validation for 'GET drivers/:id' endpoint
export const GetDriverSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
