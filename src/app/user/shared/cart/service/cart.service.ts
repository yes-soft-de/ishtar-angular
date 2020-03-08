import { Injectable } from '@angular/core';
import { PaintingDetails } from 'src/app/user/painting/entity/painting-details';
import { MatDialog } from '@angular/material';
import { CartComponent } from '../cart/cart.component';
import { CheckOutManagerService } from '../manager/check-out-manager.service';
import { Subject } from 'rxjs';
import {PaymentRequest} from '../entity/payment-request';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(protected dialog: MatDialog,
              protected chackoutManager: CheckOutManagerService) {
  }

  addPaintingToCart(item: PaintingDetails): void {
    console.log('Adding Item to Cart!');
    if (sessionStorage.getItem('cart')) {
      const list = JSON.parse(sessionStorage.getItem('cart'));
      for (const i of list) {
        if (i.id === item.id) {
          console.log('Already Added!');
          return;
        }
      }
      list.push(item);
      sessionStorage.setItem('cart', JSON.stringify(list));
    } else {
      const arr = [];
      arr.push(item);
      sessionStorage.setItem('cart', JSON.stringify(arr));
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
    const paintingList = JSON.parse(sessionStorage.getItem('cart')) as PaintingDetails[];
    return paintingList;
  }

  submitPayment(paymentData: PaymentRequest) {
    const subject = new Subject<boolean>();
    this.chackoutManager.submitPayment(paymentData).subscribe(
      data => {
        subject.next(data.success);
      }
    );
  }
}
