import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartsProduct } from '../carts/carts.component';
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
    for (let i = 0; i < this.cartsProduct.length; i++) {
      console.log(typeof (this.totalAmount));
      console.log(typeof (this.cartsProduct[i].productPrice));

      this.totalAmount = this.totalAmount + parseInt(this.cartsProduct[i].productPrice) * this.cartsProduct[i].amount;

    }
  }

  ngOnInit(): void {
    this.dataService.getProductData().subscribe(value => this.getLocalStorage(value));
  }

}
