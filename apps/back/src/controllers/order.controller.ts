import HttpResponser from '@back/adapters/http/http.responser';
import { orderService } from '@back/services';
import { OrderStatus } from '@dto';
import { AbstractCrudController } from './abstract-crud.controller';

class OrderController extends AbstractCrudController {
  constructor() {
    super(orderService);
  }

  getAll = async (_req, res) => {
    try {
      const data = await orderService.getAll({ deleted: false });
      return HttpResponser.successJson(res, data);
    } catch (error) {
      return HttpResponser.errorJson(res, error);
    }
  };

  getById = async (req, res) => {
    try {
      const data = await orderService.getById({
        id: req.params.id,
        deleted: false,
      });
      if (!data) {
        return HttpResponser.errorJson(
          res,
          { message: 'Order not found' },
          404,
        );
      }
      return HttpResponser.successJson(res, data);
    } catch (error) {
      return HttpResponser.errorJson(res, error);
    }
  };

  post = async (req, res) => {
    try {
      const data = await orderService.post(req.body);
      return HttpResponser.successJson(res, data, 201);
    } catch (error) {
      return HttpResponser.errorJson(res, error);
    }
  };

  updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body as { status: OrderStatus };

      if (!Object.values(OrderStatus).includes(status)) {
        return HttpResponser.errorJson(
          res,
          {
            message: `Invalid status. Valid values: ${Object.values(OrderStatus).join(', ')}`,
          },
          400,
        );
      }

      const data = await orderService.updateStatus(Number(id), status);
      return HttpResponser.successJson(res, data);
    } catch (error) {
      return HttpResponser.errorJson(res, error);
    }
  };
}

const orderController = new OrderController();

export default orderController;
