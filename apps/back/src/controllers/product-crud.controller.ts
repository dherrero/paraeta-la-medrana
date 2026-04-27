import HttpResponser from '@back/adapters/http/http.responser';
import { productCrudService } from '@back/services';
import { AbstractCrudController } from './abstract-crud.controller';

class ProductCrudController extends AbstractCrudController {
  constructor() {
    super(productCrudService);
  }

  getAll = async (req, res) => {
    try {
      const { search, categoryId } = req.query as Record<string, string>;
      const where: Record<string, unknown> = { deleted: false, active: true };
      if (search) where['search'] = search;
      if (categoryId) where['categoryId'] = Number(categoryId);
      const rows = await productCrudService.getAll(where);
      return HttpResponser.successJson(res, { rows, count: rows.length });
    } catch (error) {
      return HttpResponser.errorJson(res, error);
    }
  };
}

const productCrudController = new ProductCrudController();

export default productCrudController;
