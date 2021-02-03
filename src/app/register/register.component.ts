import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetDataService } from '../get-data.service';
import { Router } from '@angular/router';
import { LoginObj } from '../all-type.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataService: GetDataService, private toastr: ToastrService, private route: Router) { }

  email = '';
  password = '';
  rUserName = '';
  rEmail = '';
  rPassword = '';


  checkLogin(loginData: LoginObj): void {
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

  doLogin(): void {
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

  doRegister(): void {
    const newitem =
    {
      userName: this.rUserName,
      password: this.rPassword,
      email: this.rEmail,
      admin: '0'
    }

    this.rUserName = '';
    this.rEmail = '';
    this.rPassword = '';

    this.dataService.register(JSON.parse(JSON.stringify(newitem))).subscribe(mes => this.toastr.success('趕快登入看看吧', mes));

  }


  ngOnInit(): void {
  }

}


