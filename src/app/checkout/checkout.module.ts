import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { ReceiptInfoComponent } from './receipt-info/receipt-info.component';
import { CheckoutComponent } from './checkout.component';


@NgModule({
  declarations: [
    CustomerInfoComponent,
    PaymentInfoComponent,
    ReceiptInfoComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class CheckoutModule { }
