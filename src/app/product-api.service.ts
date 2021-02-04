import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from './all-type.service';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient) { }

  getProductData(): Observable<Product[]> {
    const productUrl = 'http://localhost:8080/product';

    return this.http.get<Product[]>(productUrl);
  }

  sentProductData(body: string): Subscription {

    const productUrl = 'http://localhost:8080/insertProduct';

    return this.http.post(productUrl, body, { responseType: 'text' }).subscribe();
  }

  delProductData(body: string): Subscription {

    const productUrl = 'http://localhost:8080/delProduct';

    return this.http.post(productUrl, body, { responseType: 'text' }).subscribe();
  }
  updateProductData(body: string): Subscription {

    const productUrl = 'http://localhost:8080/updateProduct';

    return this.http.post(productUrl, body, { responseType: 'text' }).subscribe();
  }
}
