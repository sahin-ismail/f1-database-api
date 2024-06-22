import { Driver } from '@modules/driver/driverModel';
import { dbClient } from '@common/db/connection';

export const driverRepository = {
  findAllAsync: async (name: string | null): Promise<Driver[]> => {
    let baseQuery = `SELECT * FROM drivers WHERE 1=1 `;
    if (name) {
      baseQuery += `AND CONCAT(forename, ' ', surname) ILIKE '%${name}%' `
    }
    let result = await dbClient().query(baseQuery);     
    return result.rows;
  },

  findByIdAsync: async (id: number): Promise<Driver | null> => {
    let baseQuery = `SELECT * FROM drivers WHERE driverid='${id}'`;
    let result = await dbClient().query(baseQuery);     
    return result.rows[0];
  },
};
