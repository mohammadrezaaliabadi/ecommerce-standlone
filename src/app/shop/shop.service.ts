import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/model/pagination';
import { IProduct } from '../shared/model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private  http: HttpClient) { }
  
  getProducts() {
    return this.http.get<IPagination<IProduct[]>>(environment.apiUrl +'shop/products?pageSize=10');
  }

}