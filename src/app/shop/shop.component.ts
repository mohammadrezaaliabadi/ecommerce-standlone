import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/model/product';
import { ShopService } from './shop.service';
import { ProductItemComponent } from "./product-item/product-item.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  response: any;
  totalCount = 0;
  constructor(private shopService: ShopService){}
  
  ngOnInit(): void {
     this.shopService.getProducts().subscribe({
        next: response =>  this.products = response.productList,
        error: error => console.log(error)

     })
  }

}
