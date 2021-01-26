import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetDataService, Product } from '../get-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private dataService: GetDataService, private toastr: ToastrService) { }

  cartsProduct: CartsProduct[] = [];
  totalAmount = 0;

  getLocalStorage(productList: Product[]): void {
    productList.forEach(element => {
      if (localStorage.getItem(element.productName)) {
        const temp = localStorage.getItem(element.productName) || '';
        this.cartsProduct.push(JSON.parse(temp));
      }
    });
    console.log(this.cartsProduct);
    this.countAmount();
  }

  countAmount(): void {
    this.totalAmount = 0;

    this.cartsProduct.forEach(item => {
      this.totalAmount = this.totalAmount + item.productPrice * item.amount;
    });
  }

  ngOnInit(): void {
    this.dataService.getProductData().subscribe(value => this.getLocalStorage(value));
  }

}

export interface CartsProduct {

  productName: string;
  productPrice: number;
  productPic: string;
  reserve: number;
  amount: 1;
}
