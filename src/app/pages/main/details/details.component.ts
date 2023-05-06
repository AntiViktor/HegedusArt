import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../../shared/services/image.service';

import { Product } from '../../../shared/models/Product';
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  user?: firebase.default.User;
  products?: Array<Product>;

  product?: Product;

  productLoadingSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private imageService: ImageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    // First get the product id from the current route.
  const routeParams = this.route.snapshot.paramMap;
  const productIdFromRoute = routeParams.get('productId');

  this.user = JSON.parse(localStorage.getItem('user') as string);

  this.productLoadingSubscription = this.productService.loadProducts().subscribe((data: Array<Product>) => {
    this.products = data;
    // Find the product that correspond with the id provided in route.
    this.product = this.products?.find(product => product.id === productIdFromRoute);
  })

  
  }

  ngOnDestroy(): void {
      this.productLoadingSubscription?.unsubscribe();
  }

  addToCart(product: Product) {
    if(this.user){
      this.cartService.addToCart(product);
      window.alert('A termék hozzá lett adva a kosaradhoz!');
    }
    else{
      window.alert('Előbb be kell jelentkezned!');
      this.router.navigateByUrl('/login');
    }
  }

}
