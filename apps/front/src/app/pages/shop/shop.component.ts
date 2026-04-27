import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '@front/app/services/category.service';
import { ProductService } from '@front/app/services/product.service';
import { CartService } from '@front/app/services/cart.service';
import { CartDrawerComponent } from '@front/app/components/cart-drawer/cart-drawer.component';
import { ProductDTO } from '@dto';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CartDrawerComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShopComponent implements OnInit {
  #categoryService = inject(CategoryService);
  #productService = inject(ProductService);
  protected cartService = inject(CartService);

  categories = this.#categoryService.select('categories');
  products = this.#productService.select('products');
  loading = this.#productService.select('loading');

  searchTerm = signal('');
  selectedCategoryId = signal<number | undefined>(undefined);
  cartOpen = signal(false);
  #searchTimer: ReturnType<typeof setTimeout> | null = null;

  readonly categoryEmojis: Record<string, string> = {
    Quesos: '🧀',
    'Embutidos Ibéricos': '🥩',
    'Aceites y Conservas': '🫒',
    'Vinos y Licores': '🍷',
    'Dulces y Turrones': '🍯',
    'Cestas Gourmet': '🎁',
  };

  ngOnInit(): void {
    this.#categoryService.listCategories();
    this.#productService.listProducts();
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    if (this.#searchTimer) clearTimeout(this.#searchTimer);
    this.#searchTimer = setTimeout(() => this.#loadProducts(), 300);
  }

  selectCategory(id: number | undefined): void {
    this.selectedCategoryId.set(id);
    this.#loadProducts();
  }

  addToCart(product: ProductDTO): void {
    this.cartService.addItem(product);
  }

  getEmoji(categoryName: string): string {
    return this.categoryEmojis[categoryName] ?? '🛒';
  }

  formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',') + ' €';
  }

  #loadProducts(): void {
    this.#productService.listProducts({
      search: this.searchTerm() || undefined,
      categoryId: this.selectedCategoryId(),
    });
  }
}
