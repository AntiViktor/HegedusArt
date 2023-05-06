import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items : Array<Product> = [];

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    console.log(this.items);
  }

  onSubmit(): void {
    this.cartService.clearCart();
    window.alert("Köszönjük a rendelésed!");
    this.items = this.cartService.getItems();
  }
}
