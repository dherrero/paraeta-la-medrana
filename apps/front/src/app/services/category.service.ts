import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CategoryDTO } from '@dto';
import { env } from '@front/environments/environment';
import { AbstractState } from './abstract-state.class';

interface CategoryState {
  loading: boolean;
  categories: CategoryDTO[];
}

@Injectable({ providedIn: 'root' })
export class CategoryService extends AbstractState<CategoryState> {
  #http = inject(HttpClient);
  #api = env.api + 'category/';

  readonly loading = this.select('loading');
  readonly categories = this.select('categories');

  constructor() {
    super({
      stateName: 'Category',
      defaultState: { loading: false, categories: [] },
    });
  }

  listCategories(): void {
    this.update((s) => ({ ...s, loading: true }));
    this.#http.get<CategoryDTO[]>(this.#api).subscribe({
      next: (categories) => this.update(() => ({ loading: false, categories })),
      error: () => this.update((s) => ({ ...s, loading: false })),
    });
  }
}
