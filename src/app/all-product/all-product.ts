import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { IJsonProduct, JProduct } from '../../models/IJsonProduct';
import { ProductItem } from '../inc/product-item/product-item';

@Component({
  selector: 'app-all-product',
  imports: [ ProductItem],
  templateUrl: './all-product.html',
  styleUrls: ['./all-product.css'],
})
export class AllProduct {

  productArray = signal<JProduct[]>([]);
  pages = signal<number[]>([]);
  activePage = signal<number>(0);
  loading = signal<boolean>(false);

  constructor( private http: HttpClient) {}

  ngOnInit() {
    this.allProducts(0);
  }

  allProducts(page: number = 0) {
    this.activePage.set(page);
    this.loading.set(true);
    const url = `https://jsonbulut.com/api/products?page=${page + 1}&per_page=10`;
    this.http.get<IJsonProduct>(url).subscribe({
      next: (response) => {
        this.productArray.set(response.data);
        const pagesArray = Array.from({ length: response.meta.pagination.total_pages }, (_, i) => i)
        this.pages.set(pagesArray);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.loading.set(false);
      }
    });
  }

}
