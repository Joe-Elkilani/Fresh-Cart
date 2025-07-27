import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }

  addProductToCart(id:any):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}carts`,{
      "productId": id
    })
  }
getAllCarts(): Observable<any> {
  return this.httpClient.get(`${environment.baseUrl}products`);
}
  removItemFromCart(id:any):Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}carts/${id}`)
  }
}
