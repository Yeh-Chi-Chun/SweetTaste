import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { CheckoutComponent } from './checkout.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { ReceiptInfoComponent } from './receipt-info/receipt-info.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'customer-info',
        pathMatch: 'full'
      },
      {
        path: 'customer-info',
        component: CustomerInfoComponent
      },
      {
        path: 'payment-info',
        component: PaymentInfoComponent
      },
      {
        path: 'receipt-info',
        component: ReceiptInfoComponent
      },
      {
        path: '**',
        redirectTo: 'customer-info',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
