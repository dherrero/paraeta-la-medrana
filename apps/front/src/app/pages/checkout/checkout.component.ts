import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '@front/app/services/cart.service';
import { OrderService } from '@front/app/services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckoutComponent {
  #fb = inject(FormBuilder);
  #router = inject(Router);
  protected cartService = inject(CartService);
  #orderService = inject(OrderService);

  loading = signal(false);
  success = signal(false);
  error = signal('');

  form = this.#fb.group({
    customerName: ['', Validators.required],
    customerEmail: ['', [Validators.required, Validators.email]],
    customerPhone: [''],
    customerAddress: [''],
    notes: [''],
  });

  formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',') + ' €';
  }

  submit(): void {
    if (this.form.invalid || this.cartService.items().length === 0) return;
    this.loading.set(true);
    this.error.set('');
    const v = this.form.value;
    this.#orderService
      .createOrder({
        customerName: v.customerName!,
        customerEmail: v.customerEmail!,
        customerPhone: v.customerPhone || undefined,
        customerAddress: v.customerAddress || undefined,
        notes: v.notes || undefined,
        items: this.cartService
          .items()
          .map((i) => ({ productId: i.product.id!, quantity: i.quantity })),
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.success.set(true);
          this.cartService.clear();
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Error al procesar el pedido. Inténtalo de nuevo.');
        },
      });
  }
}
