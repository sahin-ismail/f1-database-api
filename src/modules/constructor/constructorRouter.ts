import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';
import { constructorService } from '@modules/constructor/constructorService';

import { GetConstructorSchema, ConstructorSchema, GetAllConstructorsSchema } from './constructorModel';

export const constructorRegistry = new OpenAPIRegistry();

constructorRegistry.register('Constructor', ConstructorSchema);

export const constructorRouter: Router = (() => {
  const router = express.Router();

  constructorRegistry.registerPath({
    method: 'get',
    path: '/constructors',
    tags: ['Constructor'],
    request: { query: GetAllConstructorsSchema.shape.queryParams },
    responses: createApiResponse(z.array(ConstructorSchema), 'Success'),
  });

  router.get('/', async (req: Request, res: Response) => {
    const name = req.query.name as string || null;
    const serviceResponse = await constructorService.findAll(name);
    handleServiceResponse(serviceResponse, res);
  });

  constructorRegistry.registerPath({
    method: 'get',
    path: '/constructors/{id}',
    tags: ['Constructor'],
    request: { params: GetConstructorSchema.shape.params },
    responses: createApiResponse(ConstructorSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetConstructorSchema), async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await constructorService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
