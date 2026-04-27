import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '@front/app/services/order.service';
import { OrderDTO, OrderStatus } from '@dto';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrdersComponent implements OnInit {
  #orderService = inject(OrderService);

  orders = this.#orderService.select('orders');
  total = this.#orderService.select('total');
  loading = this.#orderService.select('loading');

  page = signal(1);
  limit = 20;
  expandedOrderId = signal<number | null>(null);

  readonly statusOptions = Object.values(OrderStatus);

  readonly statusLabels: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'Pendiente',
    [OrderStatus.CONFIRMED]: 'Confirmado',
    [OrderStatus.SHIPPED]: 'Enviado',
    [OrderStatus.DELIVERED]: 'Entregado',
    [OrderStatus.CANCELLED]: 'Cancelado',
  };

  readonly statusBadge: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'warning',
    [OrderStatus.CONFIRMED]: 'primary',
    [OrderStatus.SHIPPED]: 'info',
    [OrderStatus.DELIVERED]: 'success',
    [OrderStatus.CANCELLED]: 'danger',
  };

  ngOnInit(): void {
    this.#loadOrders();
  }

  #loadOrders(): void {
    this.#orderService.listOrders(this.page(), this.limit);
  }

  toggleExpand(id: number): void {
    this.expandedOrderId.set(this.expandedOrderId() === id ? null : id);
  }

  changeStatus(order: OrderDTO, status: string): void {
    this.#orderService
      .updateOrderStatus(order.id!, status as OrderStatus)
      .subscribe({
        next: () => this.#loadOrders(),
      });
  }

  nextPage(): void {
    if (this.page() * this.limit < this.total()) {
      this.page.update((p) => p + 1);
      this.#loadOrders();
    }
  }

  prevPage(): void {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.#loadOrders();
    }
  }

  formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',') + ' €';
  }

  formatDate(d: Date | string): string {
    return new Date(d).toLocaleDateString('es-ES');
  }
}
