import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type StatisticMostPodiumDrivers = z.infer<typeof StatisticMostPodiumDriversProjection>;
export const StatisticMostPodiumDriversProjection = z.object({
  season: z.number(),
  drivername: z.string(),
  podiums: z.number()
});

export type StatisticMostWonDrivers = z.infer<typeof StatisticMostWonDriversProjection>;
export const StatisticMostWonDriversProjection = z.object({
  season: z.number(),
  drivername: z.string(),
  wins: z.number()
});

export type StatisticDrivers = z.infer<typeof StatisticDriversProjection>;
export const StatisticDriversProjection = z.object({
  driverid: z.number(),
  drivername: z.string(),
  wins: z.number(),
  podiums: z.number(),
  notfinished: z.number()
});

export type StatisticConstructors = z.infer<typeof StatisticConstructorsProjection>;
export const StatisticConstructorsProjection = z.object({
  constructorid: z.number(),
  teamname: z.string(),
  wins: z.number(),
  podiums: z.number()
});

export type StatisticYearRaceDrivers = z.infer<typeof StatisticYearRaceDriversProjection>;
export const StatisticYearRaceDriversProjection = z.object({
  driverid: z.number(),
  drivername: z.string(),
  avglaptimeinseconds: z.number(),
  avgpitstoptimeinseconds: z.number(),
  numberofpitstops: z.number(),
});

// Input Validation for StatisticYearRaceDrivers
export const StatisticYearRaceDriversSchema = z.object({
  queryParams: z.object({ year: commonValidations.number, raceid: commonValidations.number }),
});

export type StatisticYearRaceDriversPit = z.infer<typeof StatisticYearRaceDriversPitProjection>;
export const StatisticYearRaceDriversPitProjection = z.object({
  driverid: z.number(),
  drivername: z.string(),
  avgpitstopdurationinseconds: z.number(),
  pitstoplaps: z.number()
});

// Input Validation for StatisticYearRaceDriversPit
export const StatisticYearRaceDriversPitSchema = z.object({
  queryParams: z.object({ year: commonValidations.number, raceid: commonValidations.number }),
});


export type StatisticCircuitsFastestLap = z.infer<typeof StatisticCircuitsFastestLapProjection>;
export const StatisticCircuitsFastestLapProjection = z.object({
  circuitname: z.string(),
  drivername: z.string(),
  laptime: z.string()
});

export type StatisticCircuitsMostWin = z.infer<typeof StatisticCircuitsMostWinProjection>;
export const StatisticCircuitsMostWinProjection = z.object({
  circuitname: z.string(),
  drivername: z.string(),
  wins: z.number()
});