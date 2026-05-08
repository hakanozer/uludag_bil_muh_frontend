import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { IProducts, Product } from '../../models/IProducts';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products {

  private http = inject(HttpClient);
  productArray = signal<Product[]>([]);
  pages = signal<number[]>([]);
  activePage = signal<number>(0);
  loading = signal<boolean>(false);

  constructor() {
    console.log('Products component initialized');
  }

  ngOnInit() {
    this.allProducts(0);
  }

  allProducts(page: number = 0) {
    this.activePage.set(page);
    this.loading.set(true);
    this.http.get<IProducts>(`http://localhost:8090/product/list?page=${page}`, {withCredentials: true}).subscribe({
      next: (response) => {
        this.productArray.set(response.content);
        const pagesArray = Array.from({ length: response.totalPages }, (_, i) => i);
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
