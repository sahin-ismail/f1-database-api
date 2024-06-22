import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { Driver } from '@modules/driver/driverModel';
import { driverRepository } from '@modules/driver/driverRepository';
import { logger } from '@src/server';

export const driverService = {
  // Retrieves all drivers from the database
  findAll: async (name : string | null): Promise<ServiceResponse<Driver[] | null>> => {
    try {
      const drivers = await driverRepository.findAllAsync(name);
      if (!drivers) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Drivers found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Driver[]>(ResponseStatus.Success, 'Drivers found', drivers, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all drivers: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single driver by their ID
  findById: async (id: number): Promise<ServiceResponse<Driver | null>> => {
    try {
      const driver = await driverRepository.findByIdAsync(id);
      if (!driver) {
        return new ServiceResponse(ResponseStatus.Failed, 'Driver not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Driver>(ResponseStatus.Success, 'Driver found', driver, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding driver with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
