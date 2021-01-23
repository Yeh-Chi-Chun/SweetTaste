import { ManageComponent } from './manage/manage.component';
import { SuccessComponent } from './success/success.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { HomePageComponent } from './home-page/home-page.component';
import { Checkout2Component } from './checkout2/checkout2.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Checkout1Component } from './checkout1/checkout1.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartsComponent } from './carts/carts.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'carts', component: CartsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout1', component: Checkout1Component },
  { path: 'checkout2', component: Checkout2Component },
  { path: 'product', component: ProductComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'success', component: SuccessComponent },
  { path: '**',redirectTo: 'home-page',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
