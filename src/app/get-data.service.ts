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

  status: string;
  message: string;
}

export class Product {
  constructor(
    public productName: string,
    public productPrice: string,
    public productPic: string,
    public reserve: string,
    public newList: string,
    public popular: string,
    public featured: string,
    public isCake: string,
    public isSweets: string
  ) { }


}
