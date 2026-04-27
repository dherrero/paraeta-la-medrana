import { Route } from '@angular/router';
import { canActivateFn } from '@front/app/libs/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'tienda',
    loadComponent: () => import('./pages/shop/shop.component'),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component'),
  },
  {
    path: 'admin/pedidos',
    loadComponent: () => import('./pages/admin/orders/orders.component'),
    canActivate: [canActivateFn],
  },
];
