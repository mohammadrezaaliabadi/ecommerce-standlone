import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/model/product';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product?:IProduct
  constructor(private cartService:CartService){

  }

  addItemToCart(){
      this.product&&this.cartService.addItemToCart(this.product)
  }

}
