import { Injectable, computed, signal } from '@angular/core';
import { ProductDTO } from '@dto';

export interface CartItem {
  product: ProductDTO;
  quantity: number;
}

const STORAGE_KEY = 'plm_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>(this.#loadFromStorage());

  readonly totalItems = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0),
  );

  readonly totalPrice = computed(() =>
    this.items().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ),
  );

  addItem(product: ProductDTO, qty = 1): void {
    this.items.update((current) => {
      const existing = current.find((i) => i.product.id === product.id);
      if (existing) {
        return current.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + qty }
            : i,
        );
      }
      return [...current, { product, quantity: qty }];
    });
    this.#saveToStorage();
  }

  removeItem(productId: number): void {
    this.items.update((current) =>
      current.filter((i) => i.product.id !== productId),
    );
    this.#saveToStorage();
  }

  updateQuantity(productId: number, qty: number): void {
    const clamped = Math.max(1, qty);
    this.items.update((current) =>
      current.map((i) =>
        i.product.id === productId ? { ...i, quantity: clamped } : i,
      ),
    );
    this.#saveToStorage();
  }

  clear(): void {
    this.items.set([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  #loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  #saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
  }
}
