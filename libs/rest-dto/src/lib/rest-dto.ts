export interface PaginationDTO<T> {
  rows: T[];
  count: number;
}

declare const CreationAttributeBrand: unique symbol;

export type CreationOptional<T> =
  // copied from sequelize's Model
  T extends null | undefined ? T : T & { [CreationAttributeBrand]?: true };

// Permission system types
export enum Permission {
  ADMIN = 'ADMIN',
  WRITE_SOME_ENTITY = 'WRITE_SOME_ENTITY',
  READ_SOME_ENTITY = 'READ_SOME_ENTITY',
}

export interface PermissionOption {
  value: Permission;
  label: string;
  description?: string;
}

export const PERMISSION_OPTIONS: PermissionOption[] = [
  {
    value: Permission.ADMIN,
    label: 'permissions.admin',
    description: 'Full system access and user management',
  },
  {
    value: Permission.WRITE_SOME_ENTITY,
    label: 'permissions.writeEntity',
    description: 'Can create, edit and delete magazines',
  },
  {
    value: Permission.READ_SOME_ENTITY,
    label: 'permissions.readEntity',
    description: 'Can only search and view magazines',
  },
];

export interface UserDTO {
  id: CreationOptional<number>;
  email: string;
  name: string;
  lastName: string;
  permissions: Permission[];
  password: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CategoryDTO {
  id: CreationOptional<number>;
  name: string;
  description?: string;
  slug: string;
  deleted: boolean;
  createdAt: CreationOptional<Date>;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProductDTO {
  id: CreationOptional<number>;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: number;
  active: boolean;
  deleted: boolean;
  createdAt: CreationOptional<Date>;
  updatedAt?: Date;
  deletedAt?: Date;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItemDTO {
  id: CreationOptional<number>;
  orderId: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
  deleted: boolean;
  createdAt: CreationOptional<Date>;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface OrderDTO {
  id: CreationOptional<number>;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  status: OrderStatus;
  total: number;
  notes?: string;
  items?: OrderItemDTO[];
  deleted: boolean;
  createdAt: CreationOptional<Date>;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CreateOrderDTO {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  notes?: string;
  items: {
    productId: number;
    quantity: number;
  }[];
}
