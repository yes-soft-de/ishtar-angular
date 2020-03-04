import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { PaintingDetails } from 'src/app/user/painting/entity/painting-details';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  paintingList: PaintingDetails[];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.paintingList = this.cartService.getCart();
  }
}
