import { Component, OnInit } from '@angular/core';
import { GetDataService, Product } from '../get-data.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private dataService: GetDataService) { }

  productList: Product[] = [];
  sentName = '';
  sentPrice = '';
  sentReserve = '';

  setData(data: Product[]): void {
    this.productList = data;
  }

  sendData(): void {
    const newitem =
    {
      productName: this.sentName || '',
      productPrice: this.sentPrice || '',
      productPic: '',
      reserve: this.sentReserve || '',
      newList: '1',
      popular: '1',
      featured: '1',
      isCake: '0',
      isSweets: '0'
    };

    console.log(newitem);
    this.dataService.sentProductData(JSON.stringify(newitem));
  }

  ngOnInit(): void {
    this.dataService.getProductData().subscribe(value => this.setData(value));
  }

}
