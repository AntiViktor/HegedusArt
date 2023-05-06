import { Injectable } from '@angular/core';

import { Product } from '../../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product: Product) {
    if(this.getItems() === null || this.getItems() === undefined){
      // let cartList = [];
      // cartList.push(product);
      // localStorage.setItem('cart', JSON.stringify(cartList));
      localStorage.setItem('cart', JSON.stringify([product]));
    }
    else{
      let cartList = this.getItems();
      cartList.push(product);
      localStorage.setItem('cart', JSON.stringify(cartList));
    }
  }

  getItems() {
    return JSON.parse(localStorage.getItem('cart') as string);
  }

  clearCart() {
    localStorage.removeItem('cart');
  }
}
