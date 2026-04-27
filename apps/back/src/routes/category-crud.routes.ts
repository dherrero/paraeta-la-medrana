import { authController, categoryCrudController } from '@back/controllers';
import { Permission } from '@dto';
import { Router } from 'express';

const categoryCrudRouter = Router();

categoryCrudRouter.get('/', categoryCrudController.getAll);

categoryCrudRouter.post(
  '/',
  authController.hasPermission(Permission.ADMIN),
  categoryCrudController.post,
);

categoryCrudRouter.put(
  '/:id',
  authController.hasPermission(Permission.ADMIN),
  categoryCrudController.put,
);

categoryCrudRouter.delete(
  '/:id',
  authController.hasPermission(Permission.ADMIN),
  categoryCrudController.delete,
);

export default categoryCrudRouter;
