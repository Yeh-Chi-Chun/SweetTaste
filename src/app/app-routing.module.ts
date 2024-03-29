import { OrderManageComponent } from './order-manage/order-manage.component';
import { OrderComponent } from './order/order.component';
import { FrontComponent } from './front/front.component';
import { ManageComponent } from './manage/manage.component';
import { SuccessComponent } from './success/success.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule} from '@angular/core';
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
      { path: 'order', component: OrderComponent },
      { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) }
    ]
  },

  { path: 'manage', component: ManageComponent },
  { path: 'orderManage', component: OrderManageComponent },

  { path: '**', redirectTo: 'front/home-page', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
