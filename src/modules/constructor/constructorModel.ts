import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Constructor = z.infer<typeof ConstructorSchema>;
export const ConstructorSchema = z.object({
  constructorId: z.number(),
  constructorRef: z.string(),
  name: z.string(),
  nationality: z.string(),
  url: z.string()
});

// Input Validation for 'GET constructors/' endpoint
export const GetAllConstructorsSchema = z.object({
  queryParams: z.object({ name: commonValidations.string }),
});

// Input Validation for 'GET constructors/:id' endpoint
export const GetConstructorSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
