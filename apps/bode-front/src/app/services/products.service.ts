import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  _products = new BehaviorSubject<Product[]>(null);
  products$ = this._products.asObservable();

  loadProducts(){
    return this.http.get<Product[]>('/api/products');
  }

  createProduct(product: Product) {
    return this.http.post<Product>('/api/products', product);
  }

  constructor(private http: HttpClient) { }
}
