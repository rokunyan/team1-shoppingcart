import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../products/models/product';

@Component({
  selector: 'app-products-page-item',
  templateUrl: './products-page-item.component.html',
  styleUrl: './products-page-item.component.css',
})
export class ProductsPageItemComponent {
  @Input(`product`) product!: Product;

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit(this.product.id);
  }

  onDelete() {
    this.delete.emit(this.product.id);
  }
}
