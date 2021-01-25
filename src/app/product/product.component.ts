import { GetDataService } from './../get-data.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})



export class ProductComponent implements OnInit {

  constructor(private dataService: GetDataService) { }

  productList: any[] = [];
  currentProductList: any[] = [];
  disPlayProductList: any[] = [];
  pageArray: number[] = [];
  currentClass = '甜點';
  currentPageNum = 1;
  pageSize = 4;
  currentPage = 0;

  // 拿商品資料並設定初始值
  setData(data: any): void {
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
        this.currentClass = '新品上市';
        this.productList.forEach(item => {
          if (item['newList'] === '1') {
            this.currentProductList.push(item);
          }
        });
        this.changePage(1);
        this.setPage();
        break;
      }
      case 'popular': {
        this.currentClass = '人氣推薦';
        this.productList.forEach(item => {
          if (item['popular'] === '1') {
            this.currentProductList.push(item);
          }
        });
        this.changePage(1);
        this.setPage();
        break;
      }
      case 'featured': {
        this.currentClass = '本日精選';
        this.productList.forEach(item => {
          if (item['featured'] === '1') {
            this.currentProductList.push(item);
          }
        });
        this.changePage(1);
        this.setPage();
        break;
      }
      case 'isCake': {
        this.currentClass = '蛋糕';
        this.productList.forEach(item => {
          if (item['isCake'] === '1') {
            console.log(item);
            this.currentProductList.push(item);
          }
        });
        this.changePage(1);
        this.setPage();
        break;
      }
      case 'isSweets': {
        this.currentClass = '點心';
        this.productList.forEach(item => {
          if (item['isSweets'] === '1') {
            this.currentProductList.push(item);
          }
        });
        this.changePage(1);
        this.setPage();
        break;
      }
      case 'all': {
        this.currentClass = '甜點';
        this.currentProductList = this.productList;
        this.changePage(1);
        this.setPage();
        break;
      }


    }
  }

  // 搜尋商品
  searchProduct(beSearch: string): void {
    this.currentProductList = [];
    this.productList.forEach(item => {
      if (item['productName'].indexOf(beSearch) !== -1) {
        this.currentProductList.push(item);
      }
    });

    this.changePage(1);
    this.setPage();
  }


  ngOnInit(): void {
    console.log('start get product data...');
    this.dataService.getProductData().subscribe(value => this.setData(value))
  }

}


