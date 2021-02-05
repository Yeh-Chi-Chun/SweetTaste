import { ProductApiService } from './../product-api.service';
import { LoginAPIService } from './../login-api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginObj, Product } from '../all-type.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private productApi: ProductApiService, private toastr: ToastrService, private loginApi: LoginAPIService) { }

  temp = sessionStorage.getItem('loginData') || '';
  filesToUpload: File[] = [];
  loginData: LoginObj = JSON.parse(JSON.stringify(this.temp));
  productList: Product[] = [];
  insert = 0;
  edit = 0;
  sentName = '';
  sentPrice = '';
  sentPic = '';
  sentReserve = '';
  sentnewList = '0';
  sentpopular = '0';
  sentfeatured = '0';
  sentisCake = '0';
  sentisSweets = '0';
  selectedFile = null;
  picture = '';

  // 設置選項開關
  setProperty(property: string): void {

    switch (property) {
      case 'newList':
        if (this.sentnewList === '1') {
          this.sentnewList = '0';
        }
        else {
          this.sentnewList = '1';
        }
        break;
      case 'popular':
        if (this.sentpopular === '1') {
          this.sentpopular = '0';
        }
        else {
          this.sentpopular = '1';
        }
        break;
      case 'featured':
        if (this.sentfeatured === '1') {
          this.sentfeatured = '0';
        }
        else {
          this.sentfeatured = '1';
        }
        break;
      case 'isCake':
        if (this.sentisCake === '1') {
          this.sentisCake = '0';
        }
        else {
          this.sentisCake = '1';
        }
        break;
      case 'isSweets':
        if (this.sentisSweets === '1') {
          this.sentisSweets = '0';
        }
        else {
          this.sentisSweets = '1';
        }
        break;
      default:
        break;
    }

  }

  // 初始化變數
  init(): void {
    this.insert = 0;
    this.edit = 0;
    this.sentName = '';
    this.sentPrice = '';
    this.sentReserve = '';
    this.sentnewList = '0';
    this.sentpopular = '0';
    this.sentfeatured = '0';
    this.sentisCake = '0';
    this.sentisSweets = '0';
  }

  // 打開新增欄位
  openInsert(): void {
    this.init();
    this.insert = 1;
    this.edit = 1;
  }
  // 打開修改欄位
  openUpdate(name: string): void {
    this.init();
    this.sentName = name;
    this.insert = 0;
    this.edit = 1;
  }

  setData(data: Product[]): void {
    this.productList = data;
  }

  // 新增物品傳到後端
  insertProduct(): void {
    if (this.sentName !== '' && this.sentPrice !== '' && this.sentReserve !== '') {
      const newitem =
      {
        productName: this.sentName || '',
        productPrice: this.sentPrice || '',
        productPic: 'https://cdn.pixabay.com/photo/2017/01/07/20/40/candy-1961536_1280.jpg',
        reserve: this.sentReserve || '',
        newList: this.sentnewList,
        popular: this.sentpopular,
        featured: this.sentfeatured,
        isCake: this.sentisCake,
        isSweets: this.sentisSweets
      };

      console.log(newitem);
      this.productApi.sentProductData(JSON.parse(JSON.stringify(newitem)));
      this.init();
      this.toastr.success('成功新增');
      this.productApi.getProductData().subscribe(value => this.setData(value));
    }
    else {
      this.toastr.error('有欄位沒有填喔');
    }

  }

  // 刪除物品
  delProduct(productName: string): void {
    this.productApi.delProductData(productName);
    this.toastr.success('成功刪除');
    this.productApi.getProductData().subscribe(value => this.setData(value));
  }

  // 修改物品
  updateProduct(): void {
    if (this.sentName !== '' && this.sentPrice !== '' && this.sentReserve !== '') {
      const newitem =
      {
        productName: this.sentName || '',
        productPrice: this.sentPrice || '',
        productPic: 'https://cdn.pixabay.com/photo/2017/01/07/20/40/candy-1961536_1280.jpg',
        reserve: this.sentReserve || '',
        newList: this.sentnewList,
        popular: this.sentpopular,
        featured: this.sentfeatured,
        isCake: this.sentisCake,
        isSweets: this.sentisSweets
      };

      console.log(newitem);
      this.productApi.updateProductData(JSON.parse(JSON.stringify(newitem)));
      this.init();
      this.toastr.success('成功修改');
      this.productApi.getProductData().subscribe(value => this.setData(value));
    }
    else {
      this.toastr.error('有欄位沒有填喔');
    }




  }

  ngOnInit(): void {
    this.temp = sessionStorage.getItem('loginData') || '';
    this.loginData = JSON.parse(JSON.stringify(this.temp));
    this.loginApi.checkAdmin(this.loginData);
    this.productApi.getProductData().subscribe(value => this.setData(value));
  }
}
