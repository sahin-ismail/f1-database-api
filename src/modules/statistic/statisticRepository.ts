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
import { dbClient } from '@common/db/connection';

export const statisticRepository = {
  mostPodiumDrivers: async (): Promise<StatisticMostPodiumDrivers[]> => {
    let baseQuery = `
      SELECT 
          season,
          driverName,
          podiums
      FROM (
          SELECT 
              r.year AS season,
              CONCAT(d.forename, ' ', d.surname) AS driverName,
              COUNT(*) AS podiums,
              RANK() OVER (PARTITION BY r.year ORDER BY COUNT(*) DESC) as Rank
          FROM results res
          JOIN drivers d ON res.driverid = d.driverid
          JOIN races r ON res.raceId = r.raceId
          WHERE res.positionOrder < 4
          GROUP BY r.year, d.driverid, d.forename, d.surname
      ) AS SeasonPodiums
      WHERE Rank = 1
      ORDER BY season DESC;
    `;
    
    let result = await dbClient().query(baseQuery);
    return result.rows;
  },
  
  mostWonDrivers: async (): Promise<StatisticMostWonDrivers[]> => {
    let baseQuery = `
      SELECT 
          season,
          drivername,
          wins
      FROM (
          SELECT 
              r.year AS Season,
              CONCAT(d.forename, ' ', d.surname) AS DriverName,
              COUNT(*) AS Wins,
              RANK() OVER (PARTITION BY r.year ORDER BY COUNT(*) DESC) as Rank
          FROM results res
          JOIN drivers d ON res.driverId = d.driverId
          JOIN races r ON res.raceId = r.raceId
          WHERE res.positionOrder = 1
          GROUP BY r.year, d.driverId, d.forename, d.surname
      ) AS SeasonWins
      WHERE Rank = 1
      ORDER BY Season DESC;
    `;
    
    let result = await dbClient().query(baseQuery);
    return result.rows;
  },

  drivers: async (): Promise<StatisticDrivers[]> => {
    let baseQuery = `
      SELECT 
          d.driverid,
          d.forename || ' ' || d.surname AS drivername,
          COUNT(CASE WHEN r.position = 1 THEN 1 END) AS wins,
          COUNT(CASE WHEN r.position = 2 or r.position = 3 THEN 1 END) AS podiums,
          COUNT(CASE WHEN s.status NOT LIKE 'Finished' AND s.status NOT LIKE '+%' THEN 1 END) AS notfinished
      FROM 
          results r
      INNER JOIN 
          drivers d ON r.driverId = d.driverId
      LEFT JOIN 
          status s ON r.statusId = s.statusId
      GROUP BY 
          d.driverId
      ORDER BY 
          wins DESC, podiums DESC;
    `;
    
    let result = await dbClient().query(baseQuery);
    return result.rows;
  },

  constructors: async (): Promise<StatisticConstructors[]> => {
    let baseQuery = `
      SELECT 
          c.constructorid,
          c.name AS teamname,
          COUNT(CASE WHEN r.position = 1 THEN 1 END) AS wins,
          COUNT(CASE WHEN r.position BETWEEN 1 AND 3 THEN 1 END) AS podiums
      FROM 
          results r
      INNER JOIN 
          constructors c ON r.constructorid = c.constructorid
      GROUP BY 
          c.constructorid
      ORDER BY 
          wins DESC, podiums DESC;
    `;
    
    let result = await dbClient().query(baseQuery);
    return result.rows;
  },

  yearRaceDrivers: async (year: number, raceid: number): Promise<StatisticYearRaceDrivers[]> => {
    let baseQuery = `
      SELECT 
          d.driverid, 
          d.forename || ' ' || d.surname AS drivername,
          AVG(lt.milliseconds) / 1000 AS avglaptimeinseconds,
          AVG(CAST(ps.duration AS FLOAT)) AS avgpitstoptimeinseconds,
          COUNT(ps.stop) AS numberofpitstops
      FROM 
          races r
      INNER JOIN 
          results res ON r.raceId = res.raceId
      INNER JOIN 
          drivers d ON res.driverId = d.driverId
      LEFT JOIN 
          lap_times lt ON r.raceId = lt.raceId AND lt.driverId = d.driverId
      LEFT JOIN 
          pit_stops ps ON r.raceId = ps.raceId AND ps.driverId = d.driverId
      WHERE 
          r.year = ${year} AND r.raceId = ${raceid}
      GROUP BY 
          d.driverId
      ORDER BY 
          avglaptimeinseconds ASC, numberofpitstops;
    `;
    
    let result = await dbClient().query(baseQuery);
    return result.rows;
  },

  yearRaceDriversPit: async (year: number, raceid: number): Promise<StatisticYearRaceDriversPit[]> => {
    let baseQuery = `
      SELECT 
          ps.driverid,
          d.forename || ' ' || d.surname AS drivername,
          AVG(CAST(ps.duration AS FLOAT)) AS avgpitstopdurationinseconds,
          STRING_AGG(CAST(ps.lap AS VARCHAR), ', ') AS pitstoplaps
      FROM 
          pit_stops ps
      INNER JOIN 
          races r ON ps.raceId = r.raceId
      INNER JOIN 
          drivers d ON ps.driverId = d.driverId
      WHERE 
          r.year = ${year} AND r.raceId = ${raceid}
      GROUP BY 
          ps.driverId, d.forename, d.surname
      ORDER BY 
          avgpitstopdurationinseconds;
    `;
    
    let result = await dbClient().query(baseQuery);
    return result.rows;
  },

  circuitsFastestLap: async (): Promise<StatisticCircuitsFastestLap[]> => {
    let baseQuery = `
      SELECT
        fl.circuitname,
        fl.drivername,
        fl.laptime
      FROM (
        SELECT
          DISTINCT ON (r.circuitId) 
          r.circuitId,
          c.name AS circuitname,
          lt.driverId,
          d.forename || ' ' || d.surname AS DriverName,
          lt.time AS LapTime,
          lt.milliseconds
        FROM lap_times lt
        JOIN races r ON lt.raceId = r.raceId
        JOIN circuits c ON r.circuitId = c.circuitId
        JOIN drivers d ON lt.driverId = d.driverId
        ORDER BY r.circuitId, lt.milliseconds ASC
      ) as fl
      ORDER BY fl.circuitname;
    `;
    
    let result = await dbClient().query(baseQuery);
    return result.rows;
  },


  circuitsMostWin: async (): Promise<StatisticCircuitsMostWin[]> => {
    let baseQuery = `
      SELECT
        circuitname,
        drivername,
        wins
      FROM(
        SELECT
          cw.*,
          RANK() OVER (PARTITION BY cw.circuitId ORDER BY cw.Wins DESC) AS rank
        FROM(
          SELECT
          c.circuitId,
          c.name AS CircuitName,
          r.driverId,
          d.forename || ' ' || d.surname AS DriverName,
          COUNT(r.raceId) AS Wins
        FROM results r
        JOIN races ra ON r.raceId = ra.raceId AND r.position = 1
        JOIN circuits c ON ra.circuitId = c.circuitId
        JOIN drivers d ON r.driverId = d.driverId
        GROUP BY c.circuitId, c.name, r.driverId, d.forename, d.surname
        ) as cw
      ) as rw
      WHERE rank = 1
      ORDER BY circuitname, wins DESC;
    `;
    
    let result = await dbClient().query(baseQuery);
    return result.rows;
  },
};
