import { Component, OnInit } from '@angular/core';
import { GetDataService, Product } from './../get-data.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {


  constructor(private dataService: GetDataService) { }


  cartsProduct: CartsProduct[] = [];


  getLocalStorage(productList: Product[]): void {
    productList.forEach(element => {
      if (localStorage.getItem(element.productName)) {
        const temp = localStorage.getItem(element.productName) || '';
        this.cartsProduct.push(JSON.parse(temp));
      }
    });
    console.log(this.cartsProduct);
  }

  deleteCarts(productName: string): void {
    let delIndex = 0;
    localStorage.removeItem(productName);

    for (let i = 0; i < this.cartsProduct.length; i++) {
      if (this.cartsProduct[i].productName === productName) {
        delIndex = i;
      }
    }
    const removed = this.cartsProduct.splice(delIndex, 1);
    console.log(removed);
  }



  ngOnInit(): void {

    this.dataService.getProductData().subscribe(value => this.getLocalStorage(value));

    // const aaa = localStorage.getItem('馬卡龍') || '';
    // console.log(JSON.parse(aaa));
  }

}

export interface CartsProduct {

  productName: string;
  productPrice: number;
  productPic: string;
  amount: 1;
  totalAmount: 0;
}
