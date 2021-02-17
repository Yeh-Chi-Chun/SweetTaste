import { ProductApiService } from './../product-api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginObj, Product } from '../all-type.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {


  constructor(private productAPi: ProductApiService, private toastr: ToastrService, private route: Router) { }

  temp = sessionStorage.getItem('loginData') || '';
  loginData: LoginObj = JSON.parse(JSON.stringify(this.temp));
  cartsProduct: CartsProduct[] = [];
  totalAmount = 0;

  // 拿購物車資料
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

  // 刪除購物車商品
  deleteCarts(productName: string): void {
    let delIndex = 0;
    localStorage.removeItem(productName);

    for (let i = 0; i < this.cartsProduct.length; i++) {
      if (this.cartsProduct[i].productName === productName) {
        delIndex = i;
      }
    }
    const removed = this.cartsProduct.splice(delIndex, 1);
    console.log(removed);
  }

  // 增加購物車商品數量
  addAmount(productName: string): void {
    let addIndex = 0;
    localStorage.removeItem(productName);

    for (let i = 0; i < this.cartsProduct.length; i++) {
      if (this.cartsProduct[i].productName === productName) {
        addIndex = i;
      }
    }
    if (this.cartsProduct[addIndex].amount < this.cartsProduct[addIndex].reserve) {
      this.cartsProduct[addIndex].amount++;
    }
    else {
      this.toastr.info('已達到庫存上限');
    }

    localStorage.setItem(productName, JSON.stringify(this.cartsProduct[addIndex]));
    this.countAmount();
  }

  // 減少購物車商品數量
  reduceAmount(productName: string): void {
    let reduceIndex = 0;
    localStorage.removeItem(productName);

    for (let i = 0; i < this.cartsProduct.length; i++) {
      if (this.cartsProduct[i].productName === productName) {
        reduceIndex = i;
      }
    }
    if (this.cartsProduct[reduceIndex].amount > 0) {
      this.cartsProduct[reduceIndex].amount--;
    }

    localStorage.setItem(productName, JSON.stringify(this.cartsProduct[reduceIndex]));
    this.countAmount();

  }
  checkLogin(){

  }

  countAmount(): void {
    this.totalAmount = 0;

    this.cartsProduct.forEach(item => {
      this.totalAmount = this.totalAmount + item.productPrice * item.amount;

    });

  }

  ngOnInit(): void {
    this.productAPi.getProductData().subscribe(value => this.getLocalStorage(value));
  }

}

export interface CartsProduct {

  productName: string;
  productPrice: number;
  productPic: string;
  reserve: number;
  amount: 1;
}
