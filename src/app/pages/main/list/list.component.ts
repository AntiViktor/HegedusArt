import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';

import { Product } from '../../../shared/models/Product';
import { Image } from '../../../shared/models/Image';
import { Subscription } from 'rxjs';
import { ImageService } from '../../../shared/services/image.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  products : Array<Product>= new Array<Product>();
  images : Array<Image> = new Array<Image>();

  productsLoadingSubscription?: Subscription;
  imagesLoadingSubscription?: Subscription;

  constructor(
    private productService : ProductService,
    private imageService : ImageService
  ) { }

  ngOnInit(): void {
    this.productsLoadingSubscription = this.productService.loadProducts().subscribe((data: Array<Product>) => {
      this.products = data;
    });
    this.imagesLoadingSubscription = this.imageService.loadImageMeta().subscribe((data: Array<Image>) => {
      this.images = data;
      this.images.forEach(e => {
        this.imageService.loadImage(e.image_url).subscribe(data => {
          e.download_url = data;
        });
      });
    })
  }

  ngOnDestroy(): void {
      this.productsLoadingSubscription?.unsubscribe();
      this.imagesLoadingSubscription?.unsubscribe();
  }

  getImageDownloadLink(product : Product) : string | undefined {
      return this.images.find(e => e.product_id === product.id)?.download_url;
  }

}
