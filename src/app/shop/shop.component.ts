import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/model/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  response: any;
  constructor(private shopService: ShopService){}
  
  ngOnInit(): void {
     this.shopService.getProducts().subscribe({
        next: response =>  this.products = response.productList,
        error: error => console.log(error)

     })
  }

}
