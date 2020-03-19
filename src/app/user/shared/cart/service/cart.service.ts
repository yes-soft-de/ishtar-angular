import {Inject, Injectable} from '@angular/core';
import {PaintingDetails} from 'src/app/user/painting/entity/painting-details';
import {MatDialog} from '@angular/material/dialog';
import {DOCUMENT} from '@angular/common';
import {CheckOutManagerService} from '../manager/check-out-manager.service';
import {Observable, Subject} from 'rxjs';
import {PaymentRequest} from '../entity/payment-request';
import {UserService} from '../../user/service/user.service';
import {LoginPageComponent} from 'src/app/user/ui/Pages/login-page/login-page.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(protected dialog: MatDialog,
              protected userService: UserService,
              @Inject(DOCUMENT) private document: Document,
              protected checkOutManagerService: CheckOutManagerService) {
  }

  addPaintingToCart(item: PaintingDetails): void {
    if (!this.userService.isLoggedIn()) {
      this.dialog.open(LoginPageComponent, {
        height: '100vh'
      });
      return;
    }
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
    return JSON.parse(sessionStorage.getItem('cart')) as PaintingDetails[];
  }

  submitPayment(paymentData: PaymentRequest): Observable<boolean> {
    const subject = new Subject<boolean>();
    if (!this.userService.isLoggedIn()) {
      console.log('User is Not Logged On!');
      this.dialog.open(LoginPageComponent, {
        height: '100vh'
      });
      subject.error('User is Not Logged On!');
    } else {
      this.checkOutManagerService.submitPayment(paymentData).subscribe(
        data => {
          console.log(data.Data.redirectUrl);
          this.document.location.href = data.Data.redirectUrl;
          subject.next(data.Data.success);
        }
      );
    }
    return subject.asObservable();
  }
}
