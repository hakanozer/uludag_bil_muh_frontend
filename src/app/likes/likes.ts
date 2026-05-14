import { Component, signal } from '@angular/core';
import { getLikedProducts } from '../../utils/likeStore';
import { HttpClient } from '@angular/common/http';
import { IJsonProductDetail, JProduct } from '../../models/IJsonProduct';
import { concatMap, from, map } from 'rxjs';
import { ProductItem } from '../inc/product-item/product-item';
import { SHARED_DIRECTIVES } from '../diretives';

@Component({
  selector: 'app-likes',
  imports: [ProductItem,SHARED_DIRECTIVES],
  templateUrl: './likes.html',
  styleUrls: ['./likes.css'],
})
export class Likes {

  productArray = signal<JProduct[]>([]);
  likesArr: number[] = [];

  constructor(private http: HttpClient) {
    this.likesArr = getLikedProducts()
  }

  ngOnInit(): void {
    const arr:JProduct[] = []
    
    from(this.likesArr).pipe(
      concatMap((productID) => 
        this.http.get<IJsonProductDetail>('https://jsonbulut.com/api/products/' + productID))
    ).subscribe({
      next: (product) => {
        arr.push(product.data)
      },
      error: (err) => {
        console.error('Error fetching product data:', err);
      },
      complete: () => {
        this.productArray.set(arr)
      }
    })

  }

}
