import { FrontComponent } from './front/front.component';
import { ReceiptInfoComponent } from './checkout/receipt-info/receipt-info.component';
import { PaymentInfoComponent } from './checkout/payment-info/payment-info.component';
import { CustomerInfoComponent } from './checkout/customer-info/customer-info.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage/manage.component';
import { SuccessComponent } from './success/success.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartsComponent } from './carts/carts.component';


const routes: Routes = [

  { path: '', redirectTo: 'front/home-page', pathMatch: 'full' },
  {
    path: 'front', component: FrontComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home-page', component: HomePageComponent },
      { path: 'carts', component: CartsComponent },
      { path: 'product', component: ProductComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) }
    ]
  },

  { path: 'manage', component: ManageComponent },

  { path: '**', redirectTo: 'front/home-page', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
