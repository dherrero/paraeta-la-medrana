import { db } from '@back/adapters/db/pg.connector';
import { OrderDTO, OrderStatus } from '@dto';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface OrderModel
  extends
    Omit<OrderDTO, 'items'>,
    Model<InferAttributes<OrderModel>, InferCreationAttributes<OrderModel>> {}

const Order = db.define<OrderModel>(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'customer_name',
    },
    customerEmail: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'customer_email',
    },
    customerPhone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'customer_phone',
    },
    customerAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'customer_address',
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: OrderStatus.PENDING,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdat',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedat',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deletedat',
    },
  },
  { tableName: 'order' },
);

export default Order;
