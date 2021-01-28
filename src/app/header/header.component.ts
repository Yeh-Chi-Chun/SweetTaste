import { logging } from 'protractor';
import { GetDataService, LoginObj } from './../get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  temp = sessionStorage.getItem('loginData') || '';
  loginData: LoginObj = JSON.parse(JSON.stringify(this.temp));
  loginAdmin = 0;
  loginstatus = 0;

  constructor(private dataService: GetDataService) { }

  logOut() {
    this.dataService.logOut();
  }

  ngOnInit(): void {
    console.log(this.loginData.admin);
    console.log(this.loginData.status);

    if (this.loginData.admin === '1') {
      this.loginAdmin = 1;
    }
    else {
      this.loginAdmin = 0;
    }
    console.log(this.loginstatus);
    console.log(this.loginAdmin);
  }

}
