import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { Product } from 'src/app/shared/model';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit, OnDestroy {

  currentImage: any;
  currentIndex: number = 0;
  counter: number = 0;
  product: Product = {
    id: 1,
    companyName: 'Sneaker company',
    productName: 'Fall Limited Edition Sneakers',
    description: "These low-profile sneakers are your perfect  casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    currency: "$",
    price: 124.99,
    discount: true,
    discountPercentage: 50,
    originalPrice: 249.99,
    images: [
      { id: 1, name: "one", imageUrl: "assets/images/image-product-1.jpg", imageUrlThumb: "assets/images/image-product-1-thumbnail.jpg" },
      { id: 2, name: "two", imageUrl: "assets/images/image-product-2.jpg", imageUrlThumb: "assets/images/image-product-2-thumbnail.jpg" },
      { id: 3, name: "three", imageUrl: "assets/images/image-product-3.jpg", imageUrlThumb: "assets/images/image-product-3-thumbnail.jpg" },
      { id: 4, name: "four", imageUrl: "assets/images/image-product-4.jpg", imageUrlThumb: "assets/images/image-product-4-thumbnail.jpg" }
    ]
  };
  pictureOpen: boolean = false;
  cart: any[] = [];
  cartSub: Subscription;

  constructor(
    private dataService: DataService
  ) {

  }

  ngOnInit(): void {
    this.currentIndex = 0;
    this.currentImage = this.product.images[this.currentIndex];
    this.dataService.cart$.subscribe(data => {
      if (data) {
        this.cart = data;
      }
    });
  }

  ngOnDestroy() {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  getImage(id: number, event?) {
    if (event) event.stopPropagation();
    this.product.images.forEach(e => {
      if (e.id == id) {
        this.currentImage = e;
      }
    });
  }

  openPicture() {
    document.body.style.overflowY = 'hidden';
    this.pictureOpen = true;
  }

  closePicture(event) {
    event.stopPropagation();
    document.body.style.overflowY = 'auto';
    this.pictureOpen = false;
  }
  
  nextPicture(event, next: boolean) {
    event.stopPropagation();
    if (next == true) {
      this.currentImage = this.product.images[this.currentIndex + 1];
      this.currentIndex += 1;
    } else {
      this.currentImage = this.product.images[this.currentIndex - 1];
      this.currentIndex -= 1;
    }
  }

  stop(event) {
    event.stopPropagation();
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }

  addToCart() {
    let data: any[] = [];
    data.push({
      ...this.product,
      count: this.counter,
      sum: this.product.price * this.counter
    });
    this.counter = 0;
    this.dataService.cart$.next(data);
    localStorage.setItem('cart', JSON.stringify(data));
  }
}