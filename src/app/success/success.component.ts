import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { threadId } from 'worker_threads';
import { CartsProduct } from '../checkout/checkout.component';
import { GetDataService, LoginObj, Product } from '../get-data.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private dataService: GetDataService, private toastr: ToastrService) { }

  cartsProduct: CartsProduct[] = [];
  orderdelData: OrderDel = JSON.parse(localStorage.getItem('orderDeliver') || '');
  orderEmail: string = localStorage.getItem('orderDeliver') || '';
  loginData: LoginObj = JSON.parse(JSON.stringify(sessionStorage.getItem('loginData')));
  oid = '';

  //拿購物車資訊
  getLocalStorage(productList: Product[]): void {
    productList.forEach(element => {
      if (localStorage.getItem(element.productName)) {
        const temp = localStorage.getItem(element.productName) || '';
        this.cartsProduct.push(JSON.parse(temp));
      }
    });
    console.log(this.cartsProduct);
  }

  sendOrder() {

    const newitem =
    {
      name: this.orderdelData.name,
      email: this.orderEmail,
      phoneNumber: this.orderdelData.phoneNumber,
      userName: this.loginData.userName,
      address: this.orderdelData.address,
      amount: 0,
      delStatus: '訂單處理中',
      oid: this.oid
    }

    this.dataService.sendOrder(JSON.parse(JSON.stringify(newitem)));
    this.toastr.success("成功送出訂單")
  }

  sendOrderProduct() {
    this.cartsProduct.forEach(item => {
      const newitem =
      {
        oid: this.oid,
        product: item.productName,
        amount: item.amount
      }
      this.dataService.sendOrderProduct(JSON.parse(JSON.stringify(newitem)));
    });
    this.toastr.success("成功送出訂單2")
  }

  getOid(): string {
    const oid = Math.floor(Math.random() * 1000000);
    return oid.toString();
  }

  ngOnInit(): void {
    this.orderdelData = JSON.parse(localStorage.getItem('orderDeliver') || '');
    this.orderEmail = localStorage.getItem('orderEmail') || '';
    this.loginData = JSON.parse(JSON.stringify(sessionStorage.getItem('loginData')));
    this.oid = this.getOid();

  }



}

export interface OrderDel {

  name: string;
  address: string;
  phoneNumber: string;
}
