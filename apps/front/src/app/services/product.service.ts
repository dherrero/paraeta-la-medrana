import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PaginationDTO, ProductDTO } from '@dto';
import { env } from '@front/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AbstractState } from './abstract-state.class';

interface ProductState {
  loading: boolean;
  products: ProductDTO[];
  total: number;
}

export interface ProductListParams {
  search?: string;
  categoryId?: number;
  page?: number;
  limit?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService extends AbstractState<ProductState> {
  #http = inject(HttpClient);
  #api = env.api + 'product/';

  readonly loading = this.select('loading');
  readonly products = this.select('products');
  readonly total = this.select('total');

  constructor() {
    super({
      stateName: 'Product',
      defaultState: { loading: false, products: [], total: 0 },
    });
  }

  listProducts(params?: ProductListParams): void {
    this.update((s) => ({ ...s, loading: true }));

    const httpParams: Record<string, string | number> = {};
    if (params?.search) httpParams['search'] = params.search;
    if (params?.categoryId) httpParams['categoryId'] = params.categoryId;
    if (params?.page) httpParams['page'] = params.page;
    if (params?.limit) httpParams['limit'] = params.limit;

    this.#http
      .get<PaginationDTO<ProductDTO>>(this.#api, { params: httpParams })
      .pipe(
        tap((res) => {
          this.update(() => ({
            loading: false,
            products: res.rows,
            total: res.count,
          }));
        }),
      )
      .subscribe({
        error: () => this.update((s) => ({ ...s, loading: false })),
      });
  }

  getProductById(id: number): Observable<ProductDTO> {
    return this.#http.get<ProductDTO>(this.#api + id);
  }
}
