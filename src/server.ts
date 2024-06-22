import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import path from 'path';
import { pino } from 'pino';

import { openAPIRouter } from '@api-docs/openAPIRouter';
import errorHandler from '@common/middleware/errorHandler';
import rateLimiter from '@common/middleware/rateLimiter';
import requestLogger from '@common/middleware/requestLogger';
import { getCorsOrigin } from '@common/utils/envConfig';
import { healthCheckRouter } from '@modules/healthCheck/healthCheckRouter';
import { connection } from '@common/db/connection';
import { driverRouter } from '@modules/driver/driverRouter';
import { constructorRouter } from '@modules/constructor/constructorRouter';
import { statisticRouter } from '@modules/statistic/statisticRouter';
import { getBasicAuthPass } from '@common/utils/envConfig';
import basicAuth from 'express-basic-auth';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const logger = pino({ name: 'server start' });
const app: Express = express();
const corsOrigin = getCorsOrigin();

// Middlewares
app.use(cors({ origin: [corsOrigin], credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Swagger UI
app.use(openAPIRouter);

// Health-check route
app.use('/health-check', healthCheckRouter);

// Basic Auth
app.use(basicAuth({
  users: { 'admin' : getBasicAuthPass() }
}))

// Request logging
app.use(requestLogger());

// Routes
app.use('/drivers', driverRouter);
app.use('/constructors', constructorRouter);
app.use('/statistics', statisticRouter);

// Error handlers
app.use(errorHandler());

// db conneciton
connection()
.then(()=>{
  console.log('DB connected');
})
.catch((err)=>{
  console.log('err', err);
})

export { app, logger };
