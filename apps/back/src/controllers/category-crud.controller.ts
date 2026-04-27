import { categoryCrudService } from '@back/services';
import { AbstractCrudController } from './abstract-crud.controller';

class CategoryCrudController extends AbstractCrudController {
  constructor() {
    super(categoryCrudService);
  }
}

const categoryCrudController = new CategoryCrudController();

export default categoryCrudController;
