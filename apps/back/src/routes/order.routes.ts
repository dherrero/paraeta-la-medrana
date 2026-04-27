import { authController, orderController } from '@back/controllers';
import { Permission } from '@dto';
import { Router } from 'express';

const orderRouter = Router();

orderRouter.post('/', orderController.post);

orderRouter.get(
  '/',
  authController.hasPermission(Permission.ADMIN),
  orderController.getAll,
);

orderRouter.get(
  '/paged',
  authController.hasPermission(Permission.ADMIN),
  orderController.getAllPaged,
);

orderRouter.get(
  '/:id',
  authController.hasPermission(Permission.ADMIN),
  orderController.getById,
);

orderRouter.patch(
  '/:id/status',
  authController.hasPermission(Permission.ADMIN),
  orderController.updateStatus,
);

export default orderRouter;
