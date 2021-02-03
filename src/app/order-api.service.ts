import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Order, OrderProduct } from './all-type.service';


@Injectable({
  providedIn: 'root'
})

export class OrderApiService {

  constructor(private http: HttpClient) { }

  sendOrder(body: string): Subscription {

    const productUrl = 'http://localhost:8080/insertOrder';

    return this.http.post(productUrl, body, { responseType: 'text' }).subscribe();
  }
  sendOrderProduct(body: string): Subscription {

    const productUrl = 'http://localhost:8080/insertOrderProduct';

    return this.http.post(productUrl, body, { responseType: 'text' }).subscribe();
  }

  getOrder(): Observable<Order[]> {
    const productUrl = 'http://localhost:8080/getOrder';

    return this.http.get<Order[]>(productUrl);
  }

  getOrderProduct(): Observable<OrderProduct[]> {
    const productUrl = 'http://localhost:8080/getOrderProduct';

    return this.http.get<OrderProduct[]>(productUrl);
  }

  updateOrder(body: string): Observable<string> {

    const productUrl = 'http://localhost:8080/updateOrder';

    return this.http.post(productUrl, body, { responseType: 'text' });
  }

  // 選擇該筆訂單
  selectOrder(selectOid: string, orderList: Order[]): Order {
    let orderNow: Order =
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
    orderList.forEach(item => {
      if (item.oid === selectOid) {
        orderNow = item;
      }
    });
    return orderNow;
  }

  // 搜尋訂單商品數量
  searchOrderProduct(selectOid: string, orderProductList: OrderProduct[]): OrderProduct[] {
    const currentOrderProduct: OrderProduct[] = [];
    orderProductList.forEach(item => {
      if (item.oid === selectOid) {
        currentOrderProduct.push(item);
      }
    });
    return currentOrderProduct;
  }

}
