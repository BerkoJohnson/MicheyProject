import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'tail-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.products$ = this.productService.loadProducts();
  }
}
