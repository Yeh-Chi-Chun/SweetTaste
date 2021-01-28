import { LoginObj } from './../get-data.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetDataService } from '../get-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataService: GetDataService, private toastr: ToastrService, private route: Router) { }

  email = '';
  password = '';


  checkLogin(loginData: LoginObj) {
    if (loginData.status === '0') {
      this.toastr.error(loginData.message);
    }
    else if (loginData.status === '1') {

      if (loginData.admin === '1') {
        this.toastr.success('loginData.message', '管理員登入');
        this.route.navigateByUrl('/manage');
      }
      else {
        this.toastr.success(loginData.message, loginData.userName + ' 您好');
        this.route.navigateByUrl('/front/home');
      }

      sessionStorage.setItem('loginData', JSON.stringify(loginData));

    }
  }

  doLogin() {
    sessionStorage.removeItem('loginData');

    const newitem =
    {
      userName: '我誰~',
      password: this.password,
      email: this.email
    }

    this.email = '';
    this.password = '';

    this.dataService.loginApi(JSON.parse(JSON.stringify(newitem))).subscribe(
      res => this.checkLogin(JSON.parse(JSON.stringify(res))));
  }


  ngOnInit(): void {
  }

}


