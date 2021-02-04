import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-receipt-info',
  templateUrl: './receipt-info.component.html',
  styleUrls: ['./receipt-info.component.css']
})
export class ReceiptInfoComponent implements OnInit {

  constructor(private toastr: ToastrService,private route: Router) { }

  email = '';

  // 儲存email到localstorage
  saveEmail(): void {

    if (this.email !== '') {
      localStorage.setItem('orderEmail', this.email);
      this.toastr.success('成功');
      this.route.navigateByUrl('front/success');
    }
    else {
      this.toastr.error('email必填喔');
    }
  }

  ngOnInit(): void {
    localStorage.removeItem('orderEmail');
  }

}
