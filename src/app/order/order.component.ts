import { GetDataService, LoginObj, Order, OrderProduct } from './../get-data.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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


  constructor(private dataService: GetDataService, private toastr: ToastrService, private route: Router) { }

  setOrder(data: Order[]): void {
    this.orderList = data;
    console.log('all:', this.orderList);
  }

  setorderProduct(data: OrderProduct[]): void {
    this.orderProductList = data;
    console.log('all:', this.orderProductList);
  }

  getUserName() {

    if (this.loginData) {
      this.temp = sessionStorage.getItem('loginData') || '';
      this.loginData = JSON.parse(this.temp);
      this.userName = this.loginData.userName;
      console.log(this.userName);
      this.toastr.info('有登入喔');
      this.searchOrder();
    }
    else {
      this.toastr.info('您還沒登入喔');
      this.route.navigateByUrl('/front/register');
    }
  }

  searchOrder() {
    console.log('My order:', this.myOrder);
    console.log('orderList:', this.orderList);
    this.orderList.forEach(item => {

      console.log(item.userName);
      console.log(this.userName);
      if (item.userName === this.userName) {
        this.myOrder.push(item);
      }
      console.log('My order:', this.myOrder);
    });

  }

  selectOrder(selectOid: string): void {
    this.myOrder.forEach(item => {
      if (item.oid === selectOid) {
        this.orderNow = item;
      }
    });
  }

  searchOrderProduct(selectOid: string): void {

  }



  ngOnInit(): void {

    this.dataService.getOrderProduct().subscribe(value => {
      this.setorderProduct(value);
      this.dataService.getOrder().subscribe(res => {
        this.setOrder(res);
        this.getUserName();
      });
    });



  }

}
