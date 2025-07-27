import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { log } from 'console';
import { Cart } from '../../shared/interfaces/cart/cart';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  cartDetails:Cart[] | null = null;
  ngOnInit(): void {
    this.getCarts()
  }
  getCarts():void {
    this.cartService.getAllCarts().subscribe({
      next:(res) => {
        console.log(res)
        this.cartDetails = res
      },error:(err) => {
        console.log(err)
      }
    })
  }
  deleteItem(id:any) {
    this.cartService.removItemFromCart(id).subscribe({
      next:(res) => {
        console.log(res)
        this.getCarts()
      },error:(err) => {
        console.log(err)
      }
    })
  }
}
