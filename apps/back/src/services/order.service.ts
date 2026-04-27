/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, OrderItem, Product } from '@back/models';
import { CreateOrderDTO, OrderStatus } from '@dto';
import { Transaction } from 'sequelize';
import { AbstractCrudService } from './abstract-crud.service';

class OrderService extends AbstractCrudService {
  constructor() {
    super(Order);
  }

  getAll = async (
    where: Record<string, any> = { deleted: false },
    excludeColumns?: string[],
  ) =>
    await this.model.findAll({
      attributes: {
        exclude: excludeColumns ?? ['password'],
      },
      where,
      include: [
        {
          model: OrderItem,
          as: 'items',
          where: { deleted: false },
          required: false,
        },
      ],
    });

  getById = async (
    where: Record<string, any> = { deleted: false },
    excludeColumns?: string[],
  ) =>
    await this.model.findOne({
      attributes: {
        exclude: excludeColumns ?? ['password'],
      },
      where,
      include: [
        {
          model: OrderItem,
          as: 'items',
          where: { deleted: false },
          required: false,
        },
      ],
    });

  post = async (createOrderData: CreateOrderDTO) => {
    const sequelizeInstance = this.model.sequelize!;

    return await sequelizeInstance.transaction(async (t: Transaction) => {
      let total = 0;
      const itemsToCreate: {
        productId: number;
        productName: string;
        productPrice: number;
        quantity: number;
        subtotal: number;
      }[] = [];

      for (const item of createOrderData.items) {
        const product = await Product.findOne({
          where: { id: item.productId, deleted: false, active: true },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        if (!product) {
          throw new Error(
            `Product with id ${item.productId} not found or unavailable`,
          );
        }

        if (product.stock < item.quantity) {
          throw new Error(
            `Insufficient stock for product "${product.name}". Available: ${product.stock}, requested: ${item.quantity}`,
          );
        }

        const price = Number(product.price);
        const subtotal = price * item.quantity;
        total += subtotal;

        itemsToCreate.push({
          productId: product.id as number,
          productName: product.name,
          productPrice: price,
          quantity: item.quantity,
          subtotal,
        });

        await product.update(
          { stock: product.stock - item.quantity },
          { transaction: t },
        );
      }

      const order = await Order.create(
        {
          customerName: createOrderData.customerName,
          customerEmail: createOrderData.customerEmail,
          customerPhone: createOrderData.customerPhone,
          customerAddress: createOrderData.customerAddress,
          notes: createOrderData.notes,
          status: OrderStatus.PENDING,
          total,
          deleted: false,
        } as any,
        { transaction: t },
      );

      const orderId = (order as any).id as number;

      await OrderItem.bulkCreate(
        itemsToCreate.map((item) => ({
          ...item,
          orderId,
          deleted: false,
        })) as any,
        { transaction: t },
      );

      return await Order.findOne({
        where: { id: orderId },
        include: [
          {
            model: OrderItem,
            as: 'items',
            where: { deleted: false },
            required: false,
          },
        ],
        transaction: t,
      });
    });
  };

  updateStatus = async (id: number, status: OrderStatus) => {
    const order = await this.model.findOne({
      where: { id, deleted: false },
    });

    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    await this.model.update({ status }, { where: { id } });

    return await this.model.findOne({
      where: { id },
      include: [
        {
          model: OrderItem,
          as: 'items',
          where: { deleted: false },
          required: false,
        },
      ],
    });
  };
}

export const orderService = new OrderService();
