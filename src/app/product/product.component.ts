import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})



export class ProductComponent implements OnInit {

  constructor(private http: HttpClient) { }

  productList: any[] = [];
  pageProductList: any[] = [];
  pageArray: number[] = [];
  currentPageNum = 1;
  pageSize = 4;
  totalPage = 0;

  // 拿商品資料並設定初始值
  getProductData(): void {
    const productUrl = 'http://localhost:8080/product';

    this.http.get<any>(productUrl).subscribe(res => {
      this.productList = res;
      this.totalPage = Math.floor(this.productList.length / this.pageSize + 1);
      this.changePage(this.currentPageNum);
      this.setPage();
      console.log(this.totalPage);
      console.log(this.pageArray);
    });
  }

  // 設定分頁數
  setPage(): void {
    for (let i = 1; i <= this.totalPage; i++) {
      this.pageArray.push(i);
    }
  }

  // 換頁
  changePage(currentPage: number): void {
    this.pageProductList = this.productList.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize);
  }

  // 商品分類
  productSort(classification: string): void {
    this.pageProductList.length = 0;
    switch (classification) {
      case 'newList': {
        this.productList.forEach(item => {
          if (item['newList'] === '1') {
            this.pageProductList.push(item);
          }
        });
        break;
      }
      case 'popular': {
        //statements;
        break;
      }
      case 'featured': {
        //statements;
        break;
      }
    }
  }


  ngOnInit(): void {
    console.log('start get product data...');
    this.getProductData();

  }

}


