import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginObj } from './all-type.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {

  constructor(private http: HttpClient, private toastr: ToastrService, private route: Router) { }

  logOut(): void {
    sessionStorage.removeItem('loginData');
    this.route.navigateByUrl('/front/home');
    this.toastr.info('已登出');
  }

  login(body: string) {
    const productUrl = 'http://localhost:8080/login';

    return this.http.post(productUrl, body, { responseType: 'json' });
  }

  register(body: string): Observable<string> {

    const productUrl = 'http://localhost:8080/register';

    return this.http.post(productUrl, body, { responseType: 'text' });
  }

  // 檢查登入身分
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

  checkAdmin(loginData: LoginObj): void {
    if (loginData) {
      const temp = sessionStorage.getItem('loginData') || '';
      loginData = JSON.parse(temp);
      if (loginData.admin === '1') {
        this.toastr.info('管理員你回來啦');
      }
      else {
        this.toastr.info('可惜你不是管理員~');
        this.route.navigateByUrl('/front/register');
      }

    }
    else {
      this.toastr.info('您還沒登入喔', '趕快去登入吧');
      this.route.navigateByUrl('/front/register');

    }


  }

}
