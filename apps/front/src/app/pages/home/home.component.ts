import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IfLoggedInDirective } from '@front/app/libs/auth';

export interface Product {
  name: string;
  description: string;
  price: string;
  icon: string;
  category: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, IfLoggedInDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  readonly products: Product[] = [
    {
      name: 'Quesos Artesanos',
      description:
        'Selección de quesos curados de pequeños productores de la zona',
      price: 'desde 4,50€/100g',
      icon: '🧀',
      category: 'Lácteos',
      highlight: true,
    },
    {
      name: 'Embutidos Ibéricos',
      description:
        'Jamón ibérico de bellota, lomo y chorizo de crianza tradicional',
      price: 'desde 8,90€/100g',
      icon: '🥩',
      category: 'Charcutería',
    },
    {
      name: 'Aceite de Oliva Virgen Extra',
      description:
        'Variedades premium de la Comunitat Valenciana — Picual, Arbequina',
      price: 'desde 12,50€/500ml',
      icon: '🫒',
      category: 'Aceites',
    },
    {
      name: 'Vinos Seleccionados',
      description:
        'DOC Valencia, Utiel-Requena y Alicante — tintos, blancos y rosados',
      price: 'desde 8,00€/botella',
      icon: '🍷',
      category: 'Vinos',
    },
    {
      name: 'Conservas y Mermeladas',
      description:
        'Elaboradas artesanalmente con frutas y verduras de temporada',
      price: 'desde 3,50€/tarro',
      icon: '🫙',
      category: 'Conservas',
    },
    {
      name: 'Turrones y Dulces',
      description:
        'Turrones de Jijona, pasteles de gloria y dulces típicos valencianos',
      price: 'desde 5,00€/tableta',
      icon: '🍯',
      category: 'Dulces',
    },
  ];

  readonly currentYear = new Date().getFullYear();

  readonly galleryItems = [
    { label: 'Mostrador de quesos', emoji: '🧀' },
    { label: 'Bodega de vinos', emoji: '🍷' },
    { label: 'Rincón de aceites', emoji: '🫒' },
    { label: 'Embutidos ibéricos', emoji: '🥩' },
    { label: 'Conservas artesanas', emoji: '🫙' },
    { label: 'Dulces valencianos', emoji: '🍬' },
  ];
}
