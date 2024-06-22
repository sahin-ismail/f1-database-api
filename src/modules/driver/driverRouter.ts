import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';
import { driverService } from '@modules/driver/driverService';

import { GetDriverSchema, DriverSchema, GetAllDriversSchema } from './driverModel';

export const driverRegistry = new OpenAPIRegistry();

driverRegistry.register('Driver', DriverSchema);

export const driverRouter: Router = (() => {
  const router = express.Router();

  driverRegistry.registerPath({
    method: 'get',
    path: '/drivers',
    tags: ['Driver'],
    request: { query: GetAllDriversSchema.shape.queryParams },
    responses: createApiResponse(z.array(DriverSchema), 'Success'),
  });

  router.get('/', async (req: Request, res: Response) => {
    const name = req.query.name as string || null;
    const serviceResponse = await driverService.findAll(name);
    handleServiceResponse(serviceResponse, res);
  });

  driverRegistry.registerPath({
    method: 'get',
    path: '/drivers/{id}',
    tags: ['Driver'],
    request: { params: GetDriverSchema.shape.params },
    responses: createApiResponse(DriverSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetDriverSchema), async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await driverService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
