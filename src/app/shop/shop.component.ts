import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand, ICategory, IProduct } from '../shared/model/product';
import { ShopService } from './shop.service';
import { ProductItemComponent } from "./product-item/product-item.component";
import { error } from 'node:console';
import { ShopParams } from '../shared/model/shopparams';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductItemComponent,PaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  @ViewChild("search") searchTerm?:ElementRef;
  products: IProduct[] = [];
  categories:ICategory[] = [];
  brands:IBrand[] = [];
  shopParams: ShopParams;
  totalCount = 0;
  sortOptions=[
    {name: 'Alphabetical', value: 'title'},
    {name: 'Price: Low to high', value:'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'}
  ];
  constructor(private shopService: ShopService){
    this.shopParams = this.shopService.getShopParams();
  }
  
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getBrands();
  }

  getProducts(){
    this.shopService.getProducts().subscribe({
      next: response =>  {
        this.products = response?.productList 
        this.shopParams.pageIndex = response?.pageIndex;
        this.shopParams.pageSize = response?.pageSize;
        this.totalCount= response?.totalCount;
      },
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

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    console.log(params.brandId);
    params.pageIndex= 1;
    //if(params.pageSize ==0) params.pageSize=6;
    this.shopService.setShopParams(params);
    this.shopParams =params;
    this.getProducts();
  }
  onCategorySelected(categoryId: number)  {
    const params = this.shopService.getShopParams();
      params.categoryId = categoryId;
      params.pageIndex=1;
      //if(params.pageSize == 0) params.pageSize=6;
      this.shopService.setShopParams(params);
      this.shopParams =params;
      this.getProducts();
  }

  onSortSelected(event:any){
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if(params.pageIndex!==event.page){
      params.pageIndex = event.page;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm?.nativeElement.value;
    console.log(params.search);
    params.pageIndex=1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

}
