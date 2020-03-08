import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { PaintingDetails } from 'src/app/user/painting/entity/painting-details';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {PaymentRequest} from '../entity/payment-request';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  paintingList: PaintingDetails[];
  countries: string[];

  selectedCountry = 'country';

  totalPrice = 0;
  subTotalPrice = 0;
  tax = 0;
  address = 0;

  paymentForm: FormGroup;

  constructor(private cartService: CartService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.paintingList = this.cartService.getCart();

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

    this.tax = this.subTotalPrice * 0.125;

    this.totalPrice = this.subTotalPrice + this.tax;
  }

  selectCountry(country: string) {
    this.selectedCountry = country;
  }

  submitBill() {
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
      items: soldItems
    };

    this.cartService.submitPayment(payment);
  }
}
