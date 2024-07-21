import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IBrand, ICategory, IProduct } from '../shared/model/product';
import { ShopService } from './shop.service';
import { ProductItemComponent } from "./product-item/product-item.component";
import { error } from 'node:console';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  categories:ICategory[] = [];
  brands:IBrand[] = [];
  totalCount = 0;
  constructor(private shopService: ShopService){}
  
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getBrands();
  }

  getProducts(){
    this.shopService.getProducts().subscribe({
      next: response =>  this.products = response.productList,
      error: error => console.log(error)

   })
  }

  getCategories(){
    this.shopService.getCategories().subscribe({
      next:response => this.categories = [{categoryId:0,categoryName:"All"},...response],
      error:error=>console.log(error)
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next:response => this.brands = [{brandId:0,brandName:"All"},...response],
      error:error=>console.log(error)
    })
  }

}
