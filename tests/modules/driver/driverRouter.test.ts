import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@common/models/serviceResponse';
import { Driver } from '@modules/driver/driverModel';
import { app } from '@src/server';

describe('Driver API Endpoints', () => {
  describe('GET /drivers', () => {
    it('should return a list of drivers', async () => {
      // Act
      const response = await request(app).get('/drivers').auth('admin', 'supersecret');
      const responseBody: ServiceResponse<Driver[]> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Drivers found');
      expect(responseBody.responseObject.length).toEqual(858);
      expect(responseBody.responseObject[0]?.surname).toEqual('Hamilton');
      expect(responseBody.responseObject[1]?.surname).toEqual('Heidfeld');
      expect(responseBody.responseObject[2]?.surname).toEqual('Rosberg');
    });
  });

  describe('GET /drivers/:id', () => {
    it('should return a driver for a valid ID', async () => {
      // Arrange
      const testId = 1;
      const expectedDriver: Driver = {
        driverid: 1,
        driverref: "hamilton",
        number: 44,
        code: "HAM",
        forename: "Lewis",
        surname: "Hamilton",
        dob: new Date("1985-01-06T22:00:00.000Z"),
        nationality: "British",
        url: "http://en.wikipedia.org/wiki/Lewis_Hamilton"
      };

      // Act
      const response = await request(app).get(`/drivers/${testId}`).auth('admin', 'supersecret');
      const responseBody: ServiceResponse<Driver> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Driver found');
      if (!expectedDriver) fail('Expected driver not found in test data');
      compareDrivers(expectedDriver, responseBody.responseObject);
    });

    it('should return a not found error for non-existent ID', async () => {
      // Arrange
      const testId = 9999;

      // Act
      const response = await request(app).get(`/drivers/${testId}`).auth('admin', 'supersecret');
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('Driver not found');
      expect(responseBody.responseObject).toEqual(null);
    });

    it('should return a bad request for invalid ID format', async () => {
      // Act
      const invalidInput = 'abc';
      const response = await request(app).get(`/drivers/${invalidInput}`).auth('admin', 'supersecret');
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('Invalid input');
      expect(responseBody.responseObject).toEqual(null);
    });
  });
});

function compareDrivers(mockDriver: Driver, responseDriver: Driver) {
  if (!mockDriver || !responseDriver) {
    fail('Invalid test data: mockDriver or responseDriver is undefined');
  }

  expect(responseDriver.driverid).toEqual(mockDriver.driverid);
  expect(responseDriver.driverref).toEqual(mockDriver.driverref);
  expect(responseDriver.number).toEqual(mockDriver.number);
  expect(responseDriver.code).toEqual(mockDriver.code);
  expect(responseDriver.forename).toEqual(mockDriver.forename);
  expect(responseDriver.surname).toEqual(mockDriver.surname);
  expect(new Date(responseDriver.dob)).toEqual(mockDriver.dob);
  expect(responseDriver.nationality).toEqual(mockDriver.nationality);
  expect(responseDriver.url).toEqual(mockDriver.url);
}
