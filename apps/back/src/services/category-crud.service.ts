import { Category } from '@back/models';
import { AbstractCrudService } from './abstract-crud.service';

class CategoryCrudService extends AbstractCrudService {
  constructor() {
    super(Category);
  }
}

export const categoryCrudService = new CategoryCrudService();
