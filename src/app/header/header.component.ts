import { GetDataService} from './../get-data.service';
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
  loginAdmin = 0;
  loginstatus = 0;

  constructor(private dataService: GetDataService) { }

  logOut(): void {
    this.dataService.logOut();
  }

  checkAdmin(): void {
    if (this.loginData) {
      this.temp = sessionStorage.getItem('loginData') || '';
      this.loginData = JSON.parse(this.temp);
      if (this.loginData.admin === '1') {
        this.loginAdmin = 1;
      }
      else {
        this.loginAdmin = 0;
      }
    }

  }

  ngOnInit(): void {
    this.checkAdmin();



  }

}
