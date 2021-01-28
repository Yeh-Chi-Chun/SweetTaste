import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  constructor(private toastr: ToastrService, private route: Router) { }

  name = '';
  phone = '';
  address = '';

  saveDeliver(): void {
    const newitem =
    {
      name: this.name,
      phone: this.phone,
      address: this.address
    };

    if (this.name !== '' && this.phone !== '' && this.address !== '') {
      localStorage.setItem('orderDeliver', JSON.stringify(newitem));
      this.toastr.success('成功');
      this.route.navigateByUrl('front/checkout/payment-info');
    }
    else
    {
      this.toastr.error('有欄位沒填喔');
    }


  }

  ngOnInit(): void {
    localStorage.removeItem('orderDeliver');
  }

}
