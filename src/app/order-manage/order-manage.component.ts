import { OrderApiService } from './../order-api.service';
import { LoginAPIService } from './../login-api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order, LoginObj, OrderProduct } from '../all-type.service';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css']
})

export class OrderManageComponent implements OnInit {

  constructor(private toastr: ToastrService, private logApi: LoginAPIService, private orderApi: OrderApiService) { }

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
  orderList: Order[] = [];
  temp = sessionStorage.getItem('loginData') || '';
  loginData: LoginObj = JSON.parse(JSON.stringify(this.temp));
  orderProductList: OrderProduct[] = [];
  currentOrderProduct: OrderProduct[] = [];
  myOrder: Order[] = [];
  modifyStatus = '';
  userName = '';
  edit = 0;
  insert = 0;


  // 更新訂單資料並回傳
  updateOrder(): void {

    const newitem =
    {
      name: this.orderNow.name,
      email: this.orderNow.email,
      userName: this.orderNow.userName,
      phoneNumber: this.orderNow.phoneNumber,
      address: this.orderNow.address,
      amount: this.orderNow.amount,
      delStatus: this.modifyStatus,
      oid: this.orderNow.oid
    };

    this.orderApi.updateOrder(JSON.parse(JSON.stringify(newitem))).subscribe(mes => {
      this.toastr.success(mes);
      this.orderApi.searchOrderProduct(this.orderNow.oid, this.orderProductList);
    });
    this.edit = 0;
  }

  // 給值
  setOrder(data: Order[]): void {
    this.orderList = data;
  }

  // 給值
  setorderProduct(data: OrderProduct[]): void {
    this.orderProductList = data;
  }

  // 選擇該筆訂單
  selectOrder(selectOid: string): void {
    this.orderNow = this.orderApi.selectOrder(selectOid, this.orderList);
    this.orderApi.searchOrderProduct(this.orderNow.oid, this.orderProductList);
  }

  // 登出
  logOut(): void {
    this.logApi.logOut();
  }

  ngOnInit(): void {

    this.logApi.checkLogin(this.loginData);
    this.orderApi.getOrderProduct().subscribe(value => {
      this.setorderProduct(value);
      this.orderApi.getOrder().subscribe(res => {
        this.setOrder(res);
      });
    });
  }

}
