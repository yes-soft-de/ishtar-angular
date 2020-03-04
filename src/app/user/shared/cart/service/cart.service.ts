import { Injectable } from '@angular/core';
import { PaintingDetails } from 'src/app/user/painting/entity/painting-details';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
  }

  addPaintingToCart(item: PaintingDetails): void {
    if (sessionStorage.getItem('cart')) {
      const list = JSON.parse(sessionStorage.getItem('cart'));
      list.push(item);
      sessionStorage.setItem('cart', JSON.stringify(list));
    } else {
      sessionStorage.setItem('cart', JSON.stringify([item]));
    }
  }

  removeFromCart(id: number): void {
    if (sessionStorage.getItem('cart')) {
      const list = JSON.parse(sessionStorage.getItem('cart'));
      const newList = [];
      for (const i of list) {
        if (i.id === id) {
          continue;
        }
        newList.push(i);
      }

      sessionStorage.setItem('cart', JSON.stringify(newList));
    }
  }

  getCart(): PaintingDetails[] {
    return JSON.parse('cart');
  }
}
