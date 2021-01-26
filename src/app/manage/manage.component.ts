import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetDataService, Product } from '../get-data.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private dataService: GetDataService,private toastr: ToastrService) { }

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
    this.sentName = '';
    this.sentPrice = '';
    this.sentReserve = '';
    this.toastr.success('成功傳送');
  }

  ngOnInit(): void {
    this.dataService.getProductData().subscribe(value => this.setData(value));
  }

}
