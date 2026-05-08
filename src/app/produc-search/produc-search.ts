import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IProducts, Product } from '../../models/IProducts';

@Component({
  selector: 'app-produc-search',
  imports: [RouterModule],
  templateUrl: './produc-search.html',
  styleUrls: ['./produc-search.css'],
})
export class ProducSearch {

    searchQuery = signal('');
    productArray = signal<Product[]>([]);
    pages = signal<number[]>([]);
    activePage = signal<number>(0);
    loading = signal<boolean>(false);
    totalElements = signal<number>(0);

  constructor( private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      this.searchQuery.set(query);
      console.log('Search query:', query);
    });
  }

  ngOnInit() {
    this.searchProducts(0);
  }

  searchProducts(page: number = 0) {
    const query = this.searchQuery();
    this.activePage.set(page);
    this.loading.set(true);
    const url = `http://localhost:8090/product/search?page=${page}&q=${query}&price=asc`;
    this.http.get<IProducts>(url, {withCredentials: true}).subscribe({
      next: (response) => {
        this.productArray.set(response.content);
        const pagesArray = Array.from({ length: response.totalPages }, (_, i) => i);
        this.pages.set(pagesArray);
        this.totalElements.set(response.totalElements);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
      }
    })
  }


}
