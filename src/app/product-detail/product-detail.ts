import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/IProducts';


@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetail {

  productItem = signal<Product | null>(null);

  constructor
  (
    private route: ActivatedRoute,
    private router: Router, 
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
        const id = params['id'];
        this.http.get<Product>(`http://localhost:8090/product/getOne/${id}`, {withCredentials: true}).subscribe({
          next: (response) => {
            this.productItem.set(response);
          },
          error: (error) => {
            this.router.navigate(['/products']);
          }
        });
    })
  }

}
