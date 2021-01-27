import { LoginObj } from './../get-data.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataService: GetDataService, private toastr: ToastrService) { }

  email = '';
  password = '';


  checkLogin(loginData: LoginObj) {
    if (loginData.status === 'No') {
      this.toastr.error(loginData.message);
    }
    else if (loginData.status === 'Ok') {
      this.toastr.success(loginData.message);
    }
  }

  doLogin() {
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


