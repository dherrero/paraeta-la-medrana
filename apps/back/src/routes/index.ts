import { Router } from 'express';
import authRouter from './auth.routes';
import healthRouter from './health.routes';
import userCrudRouter from './user-crud.routes';
import categoryCrudRouter from './category-crud.routes';
import productCrudRouter from './product-crud.routes';
import orderRouter from './order.routes';

const api = Router();

/** public api */
api.use('/v1/auth', authRouter);

/** private api */
api.use('/v1/user', userCrudRouter);

/** e-commerce api */
api.use('/v1/category', categoryCrudRouter);
api.use('/v1/product', productCrudRouter);
api.use('/v1/order', orderRouter);

/** health check */
api.use('/v1/health', healthRouter);

export default api;
