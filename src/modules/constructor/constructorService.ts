import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { Constructor } from '@modules/constructor/constructorModel';
import { constructorRepository } from '@modules/constructor/constructorRepository';
import { logger } from '@src/server';

export const constructorService = {
  // Retrieves all constructors from the database
  findAll: async (name : string | null): Promise<ServiceResponse<Constructor[] | null>> => {
    try {
      const constructors = await constructorRepository.findAllAsync(name);
      if (!constructors) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Constructors found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Constructor[]>(ResponseStatus.Success, 'Constructors found', constructors, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all constructors: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single constructor by their ID
  findById: async (id: number): Promise<ServiceResponse<Constructor | null>> => {
    try {
      const constructor = await constructorRepository.findByIdAsync(id);
      if (!constructor) {
        return new ServiceResponse(ResponseStatus.Failed, 'Constructor not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Constructor>(ResponseStatus.Success, 'Constructor found', constructor, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding constructor with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
