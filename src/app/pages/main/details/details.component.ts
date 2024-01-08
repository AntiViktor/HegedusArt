import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product } from '../../../shared/models/Product';
import { Image } from '../../../shared/models/Image';
import { ProductService } from 'src/app/shared/services/product.service';
import { ImageService } from '../../../shared/services/image.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  user?: firebase.default.User;
  product?: Product;
  images?: Image[];
  productLoadingSubscription?: Subscription;
  imagesLoadingSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');

    this.user = JSON.parse(localStorage.getItem('user') as string);

    // Load product details
    this.productLoadingSubscription = this.productService
      .loadProducts()
      .subscribe((data: Array<Product>) => {
        this.product = data.find((product) => product.id === productIdFromRoute);
      });

    // Load associated images
    this.imagesLoadingSubscription = this.route.paramMap
      .pipe(
        switchMap((params) => {
          const productId = params.get('productId') || '';
          return this.imageService.getImagesByProductId(productId);
        })
      )
      .subscribe((images: Image[]) => {
        this.images = images;
      });
  }

  ngOnDestroy(): void {
    this.productLoadingSubscription?.unsubscribe();
    this.imagesLoadingSubscription?.unsubscribe();
  }
}
