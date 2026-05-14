import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IJsonProduct, IJsonProductDetail, JProduct } from '../../models/IJsonProduct';
import { isLiked, toggleLike } from '../../utils/likeStore';
import { SHARED_DIRECTIVES } from '../diretives';

@Component({
  selector: 'app-all-product-deail',
  imports: [SHARED_DIRECTIVES],
  templateUrl: './all-product-deail.html',
  styleUrls: ['./all-product-deail.css'],
})
export class AllProductDeail {

  product = signal<JProduct | null>(null);
  bigImage = signal<string>("");
  isLike = signal<boolean>(false);

  constructor
  (
    private route: ActivatedRoute,
    private router: Router, 
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
        const id = params['id'];
        this.http.get<IJsonProductDetail>(`https://jsonbulut.com/api/products/${id}`).subscribe({
          next: (response) => {
            this.product.set(response.data);
            if (response.data.images && response.data.images.length > 0) {
              this.bigImage.set(response.data.images[0]);
            }
            const productId = this.product()!.id;
            this.isLike.set(isLiked(productId));
          },
          error: (error) => {
            this.router.navigate(['/all-products']);
          }
        });
    })

  }


  toggleLike() {
    this.isLike.set(!this.isLike());
    if (this.product()) {
      toggleLike(this.product()!.id);
    }
  }

}
