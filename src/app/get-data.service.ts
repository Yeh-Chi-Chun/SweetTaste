import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  loginApi(body: string) {
    const productUrl = 'http://localhost:8080/login';

    return this.http.post(productUrl, body, { responseType: 'json' });
  }

  getProductData() {
    const productUrl = 'http://localhost:8080/product';

    return this.http.get<Product[]>(productUrl);
  }

  sentProductData(body: string) {

    const productUrl = 'http://localhost:8080/insertProduct';

    return this.http.post(productUrl, body, { responseType: 'text' }).subscribe();
  }

  delProductData(body: string) {

    const productUrl = 'http://localhost:8080/delProduct';

    return this.http.post(productUrl, body, { responseType: 'text' }).subscribe();
  }
  updateProductData(body: string) {

    const productUrl = 'http://localhost:8080/updateProduct';

    return this.http.post(productUrl, body, { responseType: 'text' }).subscribe();
  }

  sendOrder(body: string) {

    const productUrl = 'http://localhost:8080/order';

    return this.http.post(productUrl, body, { responseType: 'text' }).subscribe();
  }
  sendOrderProduct(body: string) {

    const productUrl = 'http://localhost:8080/orderProduct';

    return this.http.post(productUrl, body, { responseType: 'text' }).subscribe();
  }

}

// 其他component都能用
export interface Product {

  productName: string;
  productPrice: string;
  productPic: string;
  reserve: string;
  newList: string;
  popular: string;
  featured: string;
  isCake: string;
  isSweets: string;
}

export interface LoginObj {

  admin: string;
  userName: string;
  status: string;
  message: string;
}

export interface Order {

  name: string;
  email: string;
  phoneNumber: string;
  userName: string;
  address: string;
  amount: string;
  delStatus: string;
  oid: string;

}

export interface OrderProduct {

  oid: string;
  product: string;
  productAmount: string;

}




