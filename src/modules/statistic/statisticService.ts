import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import {
  StatisticMostPodiumDrivers,
  StatisticMostWonDrivers,
  StatisticDrivers,
  StatisticConstructors,
  StatisticYearRaceDrivers,
  StatisticYearRaceDriversPit,
  StatisticCircuitsFastestLap,
  StatisticCircuitsMostWin
} from '@modules/statistic/statisticModel';
import { statisticRepository } from '@modules/statistic/statisticRepository';
import { logger } from '@src/server';

export const statisticService = {
  // Retrieves mostPodiumDrivers statistics from the database
  mostPodiumDrivers: async (): Promise<ServiceResponse<StatisticMostPodiumDrivers[] | null>> => {
    try {
      const statistics = await statisticRepository.mostPodiumDrivers();      
      if (!statistics) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Statistics found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<StatisticMostPodiumDrivers[]>(ResponseStatus.Success, 'Statistics found', statistics, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all statistics: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves mostWonDrivers statistics from the database
  mostWonDrivers: async (): Promise<ServiceResponse<StatisticMostWonDrivers[] | null>> => {
    try {
      const statistics = await statisticRepository.mostWonDrivers();      
      if (!statistics) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Statistics found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<StatisticMostWonDrivers[]>(ResponseStatus.Success, 'Statistics found', statistics, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all statistics: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves drivers statistics from the database
  drivers: async (): Promise<ServiceResponse<StatisticDrivers[] | null>> => {
    try {
      const statistics = await statisticRepository.drivers();      
      if (!statistics) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Statistics found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<StatisticDrivers[]>(ResponseStatus.Success, 'Statistics found', statistics, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all statistics: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves constructors statistics from the database
  constructors: async (): Promise<ServiceResponse<StatisticConstructors[] | null>> => {
    try {
      const statistics = await statisticRepository.constructors();      
      if (!statistics) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Statistics found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<StatisticConstructors[]>(ResponseStatus.Success, 'Statistics found', statistics, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all statistics: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves constructors statistics from the database
  yearRaceDrivers: async (year: number, raceid: number): Promise<ServiceResponse<StatisticYearRaceDrivers[] | null>> => {
    try {
      const statistics = await statisticRepository.yearRaceDrivers(year, raceid);      
      if (!statistics) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Statistics found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<StatisticYearRaceDrivers[]>(ResponseStatus.Success, 'Statistics found', statistics, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all statistics: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves constructors statistics from the database
  yearRaceDriversPit: async (year: number, raceid: number): Promise<ServiceResponse<StatisticYearRaceDriversPit[] | null>> => {
    try {
      const statistics = await statisticRepository.yearRaceDriversPit(year, raceid);      
      if (!statistics) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Statistics found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<StatisticYearRaceDriversPit[]>(ResponseStatus.Success, 'Statistics found', statistics, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all statistics: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves circuitsFastestLap statistics from the database
  circuitsFastestLap: async (): Promise<ServiceResponse<StatisticCircuitsFastestLap[] | null>> => {
    try {
      const statistics = await statisticRepository.circuitsFastestLap();      
      if (!statistics) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Statistics found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<StatisticCircuitsFastestLap[]>(ResponseStatus.Success, 'Statistics found', statistics, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all statistics: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves circuitsMostWin statistics from the database
  circuitsMostWin: async (): Promise<ServiceResponse<StatisticCircuitsMostWin[] | null>> => {
    try {
      const statistics = await statisticRepository.circuitsMostWin();      
      if (!statistics) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Statistics found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<StatisticCircuitsMostWin[]>(ResponseStatus.Success, 'Statistics found', statistics, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all statistics: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};
