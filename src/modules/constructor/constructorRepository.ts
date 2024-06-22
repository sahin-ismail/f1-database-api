import { Constructor } from '@modules/constructor/constructorModel';
import { dbClient } from '@common/db/connection';

export const constructorRepository = {
  findAllAsync: async (name: string | null): Promise<Constructor[]> => {
    let baseQuery = `SELECT * FROM constructors WHERE 1=1 `;
    if (name) {
      baseQuery += `AND name ILIKE '%${name}%' `
    }
    let result = await dbClient().query(baseQuery);     
    return result.rows;
  },

  findByIdAsync: async (id: number): Promise<Constructor | null> => {
    let baseQuery = `SELECT * FROM constructors WHERE constructorId='${id}'`;
    let result = await dbClient().query(baseQuery);     
    return result.rows[0];
  },
};
