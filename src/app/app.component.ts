import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  cart: any[] = [];
  cartOpen: boolean = false;
  cartSub: Subscription;
  
  constructor(
    public router: Router,
    private dataService: DataService
  ) {
    
  }

  ngOnInit() {
    this.loadData();
    this.dataService.cart$.subscribe(data => {
      if (data) {
        this.cart = data;
      }
    });
  }

  ngOnDestroy() {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  openCart() {
    this.cartOpen = true;
  }

  closeCart() {
    this.cartOpen = false;
  }

  cancelClose(event: any) {
    event.stopPropagation();
  }

  loadData() {
    if (localStorage.getItem('cart') != null) {
      let data = localStorage.getItem('cart');
      if (data) {
        this.cart = JSON.parse(data);
        this.dataService.cart$.next(this.cart);
      }
    }
  }

  deleteProduct(id) {
    this.cart = this.cart.filter(e => e.id != id );
    this.dataService.cart$.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}