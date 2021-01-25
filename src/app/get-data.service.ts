import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  getProductData() {
    const productUrl = 'http://localhost:8080/product';

    return this.http.get<any>(productUrl);
  }
}

export class Product{
  constructor(
    public productName:string,
    public productPrice:string,
    public productPic:string,
    public reserve:string,
    public newList:string,
    public popular:string,
    public featured:string,
    public isCake:string,
    public isSweets:string
  ){}


}
