import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateOrderDTO, OrderDTO, OrderStatus } from '@dto';
import { env } from '@front/environments/environment';
import { Observable } from 'rxjs';
import { AbstractState } from './abstract-state.class';

interface OrderState {
  loading: boolean;
  orders: OrderDTO[];
  total: number;
}

interface PaginatedOrders {
  rows: OrderDTO[];
  count: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService extends AbstractState<OrderState> {
  #http = inject(HttpClient);
  #api = env.api + 'order/';

  readonly loading = this.select('loading');
  readonly orders = this.select('orders');
  readonly total = this.select('total');

  constructor() {
    super({
      stateName: 'Order',
      defaultState: { loading: false, orders: [], total: 0 },
    });
  }

  createOrder(data: CreateOrderDTO): Observable<OrderDTO> {
    return this.#http.post<OrderDTO>(this.#api, data);
  }

  listOrders(page = 1, limit = 20): void {
    this.update((s) => ({ ...s, loading: true }));
    const params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));
    this.#http.get<PaginatedOrders>(this.#api + 'paged', { params }).subscribe({
      next: (res) =>
        this.update(() => ({
          loading: false,
          orders: res.rows,
          total: res.count,
        })),
      error: () => this.update((s) => ({ ...s, loading: false })),
    });
  }

  getOrderById(id: number): Observable<OrderDTO> {
    return this.#http.get<OrderDTO>(this.#api + id);
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<OrderDTO> {
    return this.#http.patch<OrderDTO>(this.#api + id + '/status', { status });
  }
}
