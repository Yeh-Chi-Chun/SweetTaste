import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartsComponent } from './carts/carts.component';
import { Checkout1Component } from './checkout1/checkout1.component';
import { Checkout2Component } from './checkout2/checkout2.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { SuccessComponent } from './success/success.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    CartsComponent,
    Checkout1Component,
    Checkout2Component,
    CheckoutComponent,
    ProductComponent,
    RegisterComponent,
    SuccessComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
