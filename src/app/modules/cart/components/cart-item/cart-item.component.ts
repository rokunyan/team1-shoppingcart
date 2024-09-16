import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from '../../model/cart';
import { ProductsPageService } from '../../../products-page/service/products-page.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input(`cart`) cart!: Cart;

  quantity: number = 0;
  productStock: number = 0;

  @Output() edit = new EventEmitter<{ id: string; quantity: number }>();
  @Output() delete = new EventEmitter<string>();
  @Output() increment = new EventEmitter<string>();
  @Output() decrement = new EventEmitter<string>();

  constructor(private productPageService: ProductsPageService) {}

  ngOnInit() {
    if (this.cart) this.quantity = this.cart.quantity;
    this.productPageService
      .getProductById(this.cart.productId)
      .subscribe((product) => {
        this.productStock = product.quantity;
      });
  }

  onEdit(event: Event) {
    const element = event.target as HTMLElement;
    let newQuantity = parseInt(element.textContent || '0', 10);
    if (isNaN(newQuantity) || newQuantity < 0) {
      newQuantity = 0;
    }
    this.quantity = newQuantity;
    this.edit.emit({ id: this.cart.id, quantity: this.quantity });
  }

  onDelete() {
    this.delete.emit(this.cart.id);
  }

  onIncrement() {
    this.increment.emit(this.cart.id);
  }

  onDecrement() {
    this.decrement.emit(this.cart.id);
  }
}
