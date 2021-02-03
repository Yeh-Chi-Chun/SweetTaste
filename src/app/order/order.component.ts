import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Order, LoginObj, OrderProduct } from '../all-type.service';
import { OrderApiService } from '../order-api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList: Order[] = [];
  temp = sessionStorage.getItem('loginData') || '';
  loginData: LoginObj = JSON.parse(JSON.stringify(this.temp));
  orderProductList: OrderProduct[] = [];
  currentOrderProduct: OrderProduct[] = [];
  myOrder: Order[] = [];

  userName = '';
  edit = 0;
  insert = 0;
  orderNow: Order =
    {
      name: '',
      email: '',
      phoneNumber: '',
      userName: '',
      address: '',
      amount: '',
      delStatus: '',
      oid: ''
    };


  constructor(private toastr: ToastrService, private route: Router, private orderApi: OrderApiService) { }

  // 給值
  setOrder(data: Order[]): void {
    this.orderList = data;
  }

  // 給值
  setorderProduct(data: OrderProduct[]): void {
    this.orderProductList = data;
  }

  // 從session讀取使用者名稱，並確認是否登入
  getUserName(): void {
    if (this.loginData) {
      this.temp = sessionStorage.getItem('loginData') || '';
      this.loginData = JSON.parse(this.temp);
      this.userName = this.loginData.userName;
      this.toastr.info('不錯喔~有記得登入喔');
      this.searchMyOrder();
    }
    else {
      this.toastr.info('趕快去登入吧', '您還沒登入喔');
      this.route.navigateByUrl('/front/register');
    }
  }

  // 搜尋自己的訂單
  searchMyOrder(): void {
    this.orderList.forEach(item => {
      if (item.userName === this.userName) {
        this.myOrder.push(item);
      }
    });
  }

  // 選擇該筆訂單
  selectOrder(selectOid: string): void {
    this.orderNow = this.orderApi.selectOrder(selectOid, this.myOrder);
    this.orderApi.searchOrderProduct(this.orderNow.oid, this.orderProductList);
  }

  ngOnInit(): void {

    this.orderApi.getOrderProduct().subscribe(value => {
      this.setorderProduct(value);
      this.orderApi.getOrder().subscribe(res => {
        this.setOrder(res);
        this.getUserName();
      });
    });



  }

}
