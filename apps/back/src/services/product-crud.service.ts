/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, Product } from '@back/models';
import { Op } from 'sequelize';
import { AbstractCrudService } from './abstract-crud.service';

class ProductCrudService extends AbstractCrudService {
  constructor() {
    super(Product);
  }

  getAll = async (
    where: Record<string, any> = { deleted: false },
    excludeColumns?: string[],
  ) => {
    const { search, categoryId, ...restWhere } = where as any;

    const queryWhere: Record<string, any> = { ...restWhere };

    if (search) {
      queryWhere['name'] = { [Op.iLike]: `%${search}%` };
    }

    if (categoryId) {
      queryWhere['categoryId'] = categoryId;
    }

    return await this.model.findAll({
      attributes: {
        exclude: excludeColumns ?? ['password'],
      },
      where: queryWhere,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug'],
        },
      ],
    });
  };
}

export const productCrudService = new ProductCrudService();
