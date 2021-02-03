import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllTypeService {

  constructor() { }
}

// 其他component都能用
export interface Product {

  productName: string;
  productPrice: string;
  productPic: string;
  reserve: string;
  newList: string;
  popular: string;
  featured: string;
  isCake: string;
  isSweets: string;
}

export interface LoginObj {

  admin: string;
  userName: string;
  status: string;
  message: string;
}

export interface Order {

  name: string;
  email: string;
  phoneNumber: string;
  userName: string;
  address: string;
  amount: string;
  delStatus: string;
  oid: string;

}

export interface OrderProduct {

  oid: string;
  productName: string;
  amount: string;

}

export interface OrderDel {

  name: string;
  address: string;
  phone: string;
}
