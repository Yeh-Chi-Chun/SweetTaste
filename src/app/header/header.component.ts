import { LoginAPIService } from './../login-api.service';
import { Component, OnInit } from '@angular/core';
import { LoginObj } from '../all-type.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  temp = sessionStorage.getItem('loginData') || '';
  loginData: LoginObj = JSON.parse(JSON.stringify(this.temp));
  loginAdmin = 1;
  loginstatus = 0;

  constructor(private logApi: LoginAPIService) { }

  logOut(): void {
    this.logApi.logOut();
  }

  ngOnInit(): void {
    this.logApi.checkLogin(this.loginData);
  }

}
