import { authController, productCrudController } from '@back/controllers';
import { Permission } from '@dto';
import { Router } from 'express';

const productCrudRouter = Router();

productCrudRouter.get('/', productCrudController.getAll);

productCrudRouter.get('/:id', productCrudController.getById);

productCrudRouter.post(
  '/',
  authController.hasPermission(Permission.ADMIN),
  productCrudController.post,
);

productCrudRouter.put(
  '/:id',
  authController.hasPermission(Permission.ADMIN),
  productCrudController.put,
);

productCrudRouter.delete(
  '/:id',
  authController.hasPermission(Permission.ADMIN),
  productCrudController.delete,
);

export default productCrudRouter;
