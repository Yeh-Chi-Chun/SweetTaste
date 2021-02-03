import { LoginAPIService } from './../login-api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private toastr: ToastrService, private loginApi: LoginAPIService) { }

  email = '';
  password = '';
  rUserName = '';
  rEmail = '';
  rPassword = '';

  // 執行登入-將使用者輸入回傳後端
  doLogin(): void {
    sessionStorage.removeItem('loginData');

    const newitem =
    {
      userName: '我誰~',
      password: this.password,
      email: this.email
    };
    this.email = '';
    this.password = '';

    this.loginApi.login(JSON.parse(JSON.stringify(newitem))).subscribe(
      res => this.loginApi.checkLogin(JSON.parse(JSON.stringify(res))));
  }

  // 註冊功能
  doRegister(): void {
    const newitem =
    {
      userName: this.rUserName,
      password: this.rPassword,
      email: this.rEmail,
      admin: '0'
    };

    this.rUserName = '';
    this.rEmail = '';
    this.rPassword = '';
    this.loginApi.register(JSON.parse(JSON.stringify(newitem))).subscribe(mes => this.toastr.success('趕快登入看看吧', mes));
  }


  ngOnInit(): void {
  }

}


