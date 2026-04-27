import User, { UserModel } from './user.model';
import Category, { CategoryModel } from './category.model';
import Product, { ProductModel } from './product.model';
import Order, { OrderModel } from './order.model';
import OrderItem, { OrderItemModel } from './order-item.model';

// Associations
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });

export {
  User,
  UserModel,
  Category,
  CategoryModel,
  Product,
  ProductModel,
  Order,
  OrderModel,
  OrderItem,
  OrderItemModel,
};
