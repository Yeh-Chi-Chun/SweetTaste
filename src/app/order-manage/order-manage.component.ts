import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetDataService, LoginObj, Order, OrderProduct } from '../get-data.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css']
})
export class OrderManageComponent implements OnInit {

  constructor(private dataService: GetDataService, private toastr: ToastrService, private route: Router) { }

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
    }

    this.dataService.updateOrder(JSON.parse(JSON.stringify(newitem))).subscribe(mes => {
      this.toastr.success(mes);
      this.searchOrderProduct(this.orderNow.oid);
    });
    this.edit = 0;

  }



  setOrder(data: Order[]): void {
    this.orderList = data;
    console.log('all:', this.orderList);
  }

  setorderProduct(data: OrderProduct[]): void {
    this.orderProductList = data;
    console.log('all:', this.orderProductList);
  }

  getUserName(): void {

    if (this.loginData) {
      this.temp = sessionStorage.getItem('loginData') || '';
      this.loginData = JSON.parse(this.temp);
      this.userName = this.loginData.userName;
      console.log(this.userName);
      this.toastr.info('不錯喔~有記得登入喔');
      this.searchOrder();
    }
    else {
      this.toastr.info('趕快去登入吧', '您還沒登入喔');
      this.route.navigateByUrl('/front/register');
    }
  }

  searchOrder(): void {
    console.log('My order:', this.myOrder);
    console.log('orderList:', this.orderList);
    this.orderList.forEach(item => {
      this.myOrder.push(item);
    });

  }

  selectOrder(selectOid: string): void {
    this.myOrder.forEach(item => {
      if (item.oid === selectOid) {
        this.orderNow = item;
      }
    });

    this.searchOrderProduct(this.orderNow.oid);
  }

  searchOrderProduct(selectOid: string): void {
    this.currentOrderProduct = [];
    this.orderProductList.forEach(item => {
      if (item.oid === selectOid) {
        this.currentOrderProduct.push(item);
      }

    });

    console.log(this.currentOrderProduct);

  }

  logOut(): void {
    this.dataService.logOut();
  }

  checkAdmin(): void {
    if (this.loginData) {
      this.temp = sessionStorage.getItem('loginData') || '';
      this.loginData = JSON.parse(this.temp);
      if (this.loginData.admin === '1') {
        this.toastr.info('管理員你回來啦');
      }
      else {
        this.toastr.info('可惜你不是管理員~');
        this.route.navigateByUrl('/front/register');
      }

    }
    else {
      this.toastr.info('您還沒登入喔', '趕快去登入吧');
      this.route.navigateByUrl('/front/register');

    }
  }



  ngOnInit(): void {

    this.checkAdmin();

    this.dataService.getOrderProduct().subscribe(value => {
      this.setorderProduct(value);
      this.dataService.getOrder().subscribe(res => {
        this.setOrder(res);
        this.getUserName();
      });
    });
  }

}
