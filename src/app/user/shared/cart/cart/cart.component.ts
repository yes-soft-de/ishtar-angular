import {Component, OnInit} from '@angular/core';
import {CartService} from '../service/cart.service';
import {PaintingDetails} from 'src/app/user/painting/entity/painting-details';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PaymentRequest} from '../entity/payment-request';
import {UserService} from '../../user-services/service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  paintingList: PaintingDetails[] = null;
  countries: string[];

  selectedCountry = 'country';

  totalPrice = 0;
  subTotalPrice = 0;
  tax = 12.5;
  address = 0;
  clientId = -1;

  paymentForm: FormGroup;

  constructor(private cartService: CartService,
              private httpClient: HttpClient,
              private userService: UserService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.fetchCart();
  }

  fetchCart() {
    this.paintingList = this.cartService.getCart();
    if (!this.paintingList) {
      console.log(this.paintingList);
      return;
    }

    this.httpClient.get('https://restcountries.eu/rest/v2/all').subscribe(
      (data: { name: string }[]) => {
        this.countries = [];
        for (const i of data) {
          this.countries.push(i.name);
        }
      }
    );

    this.paymentForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      country: [''],
      phone: [''],
      zipCode: [''],
      city: ['']
    });

    for (const i of this.paintingList) {
      this.subTotalPrice += +i.price;
    }

    this.tax = Math.round(this.subTotalPrice * 0.125);

    this.totalPrice = this.subTotalPrice + this.tax;

    this.updateCurrentForm();
  }

  selectCountry(country: string) {
    this.selectedCountry = country;
  }

  submitBill() {
    if (this.clientId < 0) {
      console.log('User is Not Logged in or Client Id is not allocated yet');
      return;
    }
    const soldItems = [];
    for (const i of this.paintingList) {
      soldItems.push({
        entity: 1,
        rowId: i.id,
        price: i.price
      });
    }
    const fullAddress = this.paymentForm.get('country').value + ',' + this.paymentForm.get('city').value +
      ',' + this.paymentForm.get('zipCode').value + ',' + this.paymentForm.get('address').value;
    const payment: PaymentRequest = {
      deliveryAddress: fullAddress,
      subtotal: this.subTotalPrice,
      tax: this.tax * this.subTotalPrice,
      total: this.subTotalPrice + this.tax * this.subTotalPrice,
      paymentMethod: 'paypal',
      items: soldItems,
      client: this.clientId
    };

    this.cartService.submitPayment(payment);
  }

  updateCurrentForm() {
    this.userService.getUserInfo().subscribe(
      userInfo => {
        this.clientId = userInfo.id;
        const nameWords = userInfo.fullName.split(' ');
        const firstName = nameWords[0];
        let lastName = '';
        for (let i = 1; i < nameWords.length; i++) {
          lastName = lastName + nameWords[i] + ' ';
        }
        this.paymentForm.patchValue({
          firstName,
          lastName,
          phone: userInfo.phone
        });
      }
    );
  }

  deleteItem(painting: PaintingDetails) {
    this.cartService.removeFromCart(painting.id);
    this.paintingList = this.cartService.getCart();
  }
}
