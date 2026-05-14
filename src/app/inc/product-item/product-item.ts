import { Component, Input } from '@angular/core';
import { JProduct } from '../../../models/IJsonProduct';
import { RouterModule } from '@angular/router';
import { TitlePipe } from '../../pipes/title-pipe';

@Component({
  selector: 'app-product-item',
  imports: [RouterModule, TitlePipe],
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css'],
})
export class ProductItem {

  @Input() itemData: JProduct | null = null;

}
