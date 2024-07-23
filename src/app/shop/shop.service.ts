import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/model/pagination';
import { IBrand, ICategory, IProduct } from '../shared/model/product';
import { environment } from '../../environments/environment';
import { ShopParams } from '../shared/model/shopparams';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  shopParams = new ShopParams();
  pagination?:IPagination<IProduct[]>;

  constructor(private  http: HttpClient) { }
  
  getProducts() {
    let params = new HttpParams();
    console.log("page size:");
    console.log(this.shopParams.pageSize);

    // sort param
    params = params.append('sort', this.shopParams.sort);


    if(this.shopParams.brandId > 0) params = params.append('brandId', this.shopParams.brandId);
    if(this.shopParams.categoryId > 0) params = params.append('categoryId', this.shopParams.categoryId);
    params = params.append('pageIndex', this.shopParams.pageIndex);
    // if(this.shopParams?.pageSize === 'undefined')  this.shopParams.pageSize=environment.pageSize;
     params = params.append('pageSize', environment.pageSize);

     if(this.shopParams.search) params = params.append('search',this.shopParams.search.trim());
     
    return this.http.get<IPagination<IProduct[]>>(environment.apiUrl +'shop/products?pageSize=10',{params}).pipe(
      map(response=>{
        this.pagination = response;
        return response;
      })
    );
  }

  getCategories() {
    return this.http.get<ICategory[]>(environment.apiUrl +'shop/categories');
  }
  getBrands() {
    return this.http.get<IBrand[]>(environment.apiUrl +'shop/brands');
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }
  getShopParams() {
    return this.shopParams;
  }

}