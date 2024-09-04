import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { Cart } from '../../../cart/model/cart';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent implements OnInit{

  //used to diplay the available products
  products: Product[] = [];

  //used to display the products in the cart
  carts: Cart[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCart();
  }

  executeAction(event: { data: Product; action: string, quantity:number }) {
    switch (event.action) {
      case 'ADD TO CART':
        this.addToCart(event.data, event.quantity);
        break;
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      console.log(`[From Dashboard Page] Get Products Successful!`);
      console.log(this.products);
    });
  }

  getCart() {
    this.cartService.getCarts().subscribe((data: any) => {
      this.carts = data;
      console.log(`[From Dashboard Page] Get Cart Successful!`);
      console.log(this.carts);
    });
  }

  /**
   *export interface Cart {
    id: string,
    userId: string,
    productId: number,
    productName: string,
    description: string,
    category: string,
    quantity: number,
    price: number,
    status: string,
    image: string
}
   */

  addToCart(product: Product, quantity:number): void {
    const cartItem: Cart = {
      id: (this.carts.length + 1).toString(),
      userId: this.cartService.getCurrentUserId(),
      productId: product.id,
      productName: product.name,
      description: product.description,
      category: product.category,
      quantity: quantity,
      price: product.price,
      status: 'added',
      image: product.image,
    };

    this.cartService.addItemToCart(cartItem).subscribe({
      next: (item) => {
        console.log('Item added to cart:', item);
        this.getCart();
      },
    });
  }

  searchQuery: string = ''; // The current search query
  items: string[] = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes']; // Example items
  filteredItems: string[] = [...this.items]; // Initialize with all items

  onSearch() {
    if (this.searchQuery) {
      this.filteredItems = this.items.filter(item =>
        item.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredItems = [...this.items]; // Reset to all items if search query is empty
    }
  }
}
