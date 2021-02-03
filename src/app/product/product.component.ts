import { ToastrService } from 'ngx-toastr';
import { GetDataService } from './../get-data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../all-type.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  constructor(private dataService: GetDataService, private toastr: ToastrService) { }

  productList: Product[] = [];
  currentProductList: Product[] = [];
  disPlayProductList: Product[] = [];
  pageArray: number[] = [];
  currentClass = '甜點';
  currentPageNum = 1;
  pageSize = 4;
  currentPage = 0;

  // 加入購物車
  addProduct(product: Product): void {
    const newitem =
    {
      productName: product.productName,
      productPrice: product.productPrice,
      productPic: product.productPic,
      reserve: product.reserve,
      amount: 1
    };
    localStorage.setItem(product.productName, JSON.stringify(newitem));
    this.toastr.success('成功加入購物車');
  }

  // 拿商品資料並設定初始值
  setData(data: Product[]): void {
    this.productList = data;
    this.currentPage = Math.floor(this.productList.length / this.pageSize + 1);
    this.currentProductList = this.productList;
    console.log(this.productList);
    this.changePage(this.currentPageNum);
    this.setPage();
  }


  // 設定分頁數
  setPage(): void {
    this.pageArray = [];
    this.currentPage = Math.floor((this.currentProductList.length - 1) / this.pageSize + 1);
    for (let i = 1; i <= this.currentPage; i++) {
      this.pageArray.push(i);
    }
  }

  // 換頁
  changePage(currentPageNum: number): void {
    this.disPlayProductList = this.currentProductList.slice((currentPageNum - 1) * this.pageSize, currentPageNum * this.pageSize);
    console.log(this.currentProductList);
  }

  // 商品分類
  productSort(classification: string): void {
    this.currentProductList = [];
    console.log(this.productList);

    switch (classification) {
      case 'newList': {
        this.productList.forEach(item => {
          if (item.newList === '1') {
            this.currentProductList.push(item);
          }
        });
        this.productC('新品上市');
        break;
      }
      case 'popular': {
        this.productList.forEach(item => {
          if (item.popular === '1') {
            this.currentProductList.push(item);
          }
        });
        this.productC('人氣推薦');
        break;
      }
      case 'featured': {

        this.productList.forEach(item => {
          if (item.featured === '1') {
            this.currentProductList.push(item);
          }
        });
        this.productC('本日精選');
        break;
      }
      case 'isCake': {
        this.productList.forEach(item => {
          if (item.isCake === '1') {
            console.log(item);
            this.currentProductList.push(item);
          }
        });
        this.productC('蛋糕');
        break;
      }
      case 'isSweets': {
        this.productList.forEach(item => {
          if (item.isSweets === '1') {
            this.currentProductList.push(item);
          }
        });
        this.productC('點心');
        break;
      }
      case 'all': {
        this.currentProductList = this.productList;
        this.productC('甜點');
        break;
      }
    }
  }

  // 商品分類小功能
  productC(name: string): void {
    this.currentClass = name;
    this.changePage(1);
    this.setPage();
  }

  // 搜尋商品
  searchProduct(beSearch: string): void {
    this.currentProductList = [];
    this.productList.forEach(item => {
      if (item.productName.indexOf(beSearch) !== -1) {
        this.currentProductList.push(item);
      }
    });

    this.changePage(1);
    this.setPage();
  }


  ngOnInit(): void {
    console.log('start get product data...');
    this.dataService.getProductData().subscribe(value => this.setData(value));
  }
}


