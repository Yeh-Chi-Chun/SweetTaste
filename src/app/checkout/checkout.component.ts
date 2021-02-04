import { ProductApiService } from './../product-api.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../all-type.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private productApi: ProductApiService) { }

  cartsProduct: CartsProduct[] = [];
  totalAmount = 0;

  getLocalStorage(productList: Product[]): void {
    productList.forEach(element => {
      if (localStorage.getItem(element.productName)) {
        const temp = localStorage.getItem(element.productName) || '';
        this.cartsProduct.push(JSON.parse(temp));
      }
    });
    console.log(this.cartsProduct);
    this.countAmount();
  }

  countAmount(): void {
    this.totalAmount = 0;

    this.cartsProduct.forEach(item => {
      this.totalAmount = this.totalAmount + item.productPrice * item.amount;
    });
  }

  ngOnInit(): void {
    this.productApi.getProductData().subscribe(value => this.getLocalStorage(value));
  }

}

export interface CartsProduct {

  productName: string;
  productPrice: number;
  productPic: string;
  reserve: number;
  amount: 1;
}
