import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, {Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse } from '@common/utils/httpHandlers';
import { statisticService } from '@modules/statistic/statisticService';

import {
  StatisticMostPodiumDriversProjection,
  StatisticMostWonDriversProjection,
  StatisticDriversProjection,
  StatisticConstructorsProjection,
  StatisticYearRaceDriversProjection,
  StatisticYearRaceDriversPitProjection,
  StatisticCircuitsFastestLapProjection,
  StatisticCircuitsMostWinProjection,
  StatisticYearRaceDriversSchema,
  StatisticYearRaceDriversPitSchema
} from './statisticModel';

export const statisticRegistry = new OpenAPIRegistry();

statisticRegistry.register('StatisticMostPodiumDrivers', StatisticMostPodiumDriversProjection);
statisticRegistry.register('StatisticMostWonDrivers', StatisticMostWonDriversProjection);
statisticRegistry.register('StatisticDrivers', StatisticDriversProjection);
statisticRegistry.register('StatisticConstructors', StatisticConstructorsProjection);
statisticRegistry.register('StatisticYearRaceDrivers', StatisticYearRaceDriversProjection);
statisticRegistry.register('StatisticYearRaceDriversPit', StatisticYearRaceDriversPitProjection);
statisticRegistry.register('StatisticCircuitsFastestLap', StatisticCircuitsFastestLapProjection);
statisticRegistry.register('StatisticCircuitsMostWin', StatisticCircuitsMostWinProjection);

export const statisticRouter: Router = (() => {
  const router = express.Router();

  statisticRegistry.registerPath({
    method: 'get',
    path: '/statistics/most-podium-drivers',
    tags: ['StatisticMostPodiumDrivers'],
    responses: createApiResponse(z.array(StatisticMostPodiumDriversProjection), 'Success'),
  });

  router.get('/most-podium-drivers', async (_req: Request, res: Response) => {
    const serviceResponse = await statisticService.mostPodiumDrivers();
    handleServiceResponse(serviceResponse, res);
  });


  statisticRegistry.registerPath({
    method: 'get',
    path: '/statistics/most-won-drivers',
    tags: ['StatisticMostWonDrivers'],
    responses: createApiResponse(z.array(StatisticMostWonDriversProjection), 'Success'),
  });

  router.get('/most-won-drivers', async (_req: Request, res: Response) => {
    const serviceResponse = await statisticService.mostWonDrivers();
    handleServiceResponse(serviceResponse, res);
  });


  statisticRegistry.registerPath({
    method: 'get',
    path: '/statistics/drivers',
    tags: ['StatisticDrivers'],
    responses: createApiResponse(z.array(StatisticDriversProjection), 'Success'),
  });

  router.get('/drivers', async (_req: Request, res: Response) => {
    const serviceResponse = await statisticService.drivers();
    handleServiceResponse(serviceResponse, res);
  });


  statisticRegistry.registerPath({
    method: 'get',
    path: '/statistics/constructors',
    tags: ['StatisticConstructors'],
    responses: createApiResponse(z.array(StatisticConstructorsProjection), 'Success'),
  });

  router.get('/constructors', async (_req: Request, res: Response) => {
    const serviceResponse = await statisticService.constructors();
    handleServiceResponse(serviceResponse, res);
  });


  statisticRegistry.registerPath({
    method: 'get',
    path: '/statistics/year-race-drivers',
    tags: ['StatisticYearRaceDrivers'],
    request: { query: StatisticYearRaceDriversSchema.shape.queryParams },
    responses: createApiResponse(z.array(StatisticYearRaceDriversProjection), 'Success'),
  });

  router.get('/year-race-drivers', async (req: Request, res: Response) => {
    const year = parseInt(req.query.year as string, 10);
    const raceid = parseInt(req.query.raceid as string, 10);
    const serviceResponse = await statisticService.yearRaceDrivers(year, raceid);
    handleServiceResponse(serviceResponse, res);
  });


  statisticRegistry.registerPath({
    method: 'get',
    path: '/statistics/year-race-drivers-pit',
    tags: ['StatisticYearRaceDriversPit'],
    request: { query: StatisticYearRaceDriversPitSchema.shape.queryParams },
    responses: createApiResponse(z.array(StatisticYearRaceDriversPitProjection), 'Success'),
  });

  router.get('/year-race-drivers-pit', async (req: Request, res: Response) => {
    const year = parseInt(req.query.year as string, 10);
    const raceid = parseInt(req.query.raceid as string, 10);
    const serviceResponse = await statisticService.yearRaceDriversPit(year, raceid);
    handleServiceResponse(serviceResponse, res);
  });


  statisticRegistry.registerPath({
    method: 'get',
    path: '/statistics/circuits-fastest-lap',
    tags: ['StatisticCircuitsFastestLap'],
    responses: createApiResponse(z.array(StatisticCircuitsFastestLapProjection), 'Success'),
  });

  router.get('/circuits-fastest-lap', async (_req: Request, res: Response) => {
    const serviceResponse = await statisticService.circuitsFastestLap();
    handleServiceResponse(serviceResponse, res);
  });


  statisticRegistry.registerPath({
    method: 'get',
    path: '/statistics/circuits-most-win',
    tags: ['StatisticCircuitsMostWin'],
    responses: createApiResponse(z.array(StatisticCircuitsMostWinProjection), 'Success'),
  });

  router.get('/circuits-most-win', async (_req: Request, res: Response) => {
    const serviceResponse = await statisticService.circuitsMostWin();
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
