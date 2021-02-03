import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderDel, LoginObj, Product } from '../all-type.service';
import { CartsProduct } from '../checkout/checkout.component';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private dataService: GetDataService, private toastr: ToastrService, private route: Router) { }

  cartsProduct: CartsProduct[] = [];
  orderdelData: OrderDel = JSON.parse(localStorage.getItem('orderDeliver') || '');
  orderEmail: string = localStorage.getItem('orderDeliver') || '';
  loginData: LoginObj = JSON.parse(JSON.stringify(sessionStorage.getItem('loginData')));
  totalAmount = 0;
  oid = '';

  // 拿購物車資訊
  getLocalStorage(productList: Product[]): void {
    productList.forEach(element => {
      if (localStorage.getItem(element.productName)) {
        const temp = localStorage.getItem(element.productName) || '';
        this.cartsProduct.push(JSON.parse(temp));
      }
    });
    console.log(this.cartsProduct);
  }

  sendOrder(): void {
    this.countAmount();
    const newitem =
    {
      name: this.orderdelData.name,
      email: this.orderEmail,
      userName: this.loginData.userName,
      phoneNumber: this.orderdelData.phone,
      address: this.orderdelData.address,
      amount: this.totalAmount,
      delStatus: '訂單處理中',
      oid: this.oid
    }

    this.dataService.sendOrder(JSON.parse(JSON.stringify(newitem)));
    this.toastr.success('成功送出訂單')
  }

  sendOrderProduct(): void {

    this.cartsProduct.forEach(item => {
      const newitem =
      {
        oid: this.oid,
        productName: item.productName,
        amount: item.amount
      }
      console.log(newitem);
      this.dataService.sendOrderProduct(JSON.parse(JSON.stringify(newitem)));
    });

  }

  checkOrder(): void {
    this.sendOrder();
    this.sendOrderProduct();
    this.route.navigateByUrl('/front/home');

  }

  countAmount(): void {
    this.totalAmount = 0;

    this.cartsProduct.forEach(item => {
      this.totalAmount = this.totalAmount + item.productPrice * item.amount;

    });

  }

  getOid(): string {
    const oid = Math.floor(Math.random() * 1000000);
    return oid.toString();
  }

  ngOnInit(): void {
    this.dataService.getProductData().subscribe(value => this.getLocalStorage(value));
    this.orderdelData = JSON.parse(localStorage.getItem('orderDeliver') || '');
    this.orderEmail = localStorage.getItem('orderEmail') || '';
    const temp = sessionStorage.getItem('loginData') || '';
    this.loginData = JSON.parse(temp);
    this.oid = this.getOid();


  }



}


