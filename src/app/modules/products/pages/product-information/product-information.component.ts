import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../cart/services/cart.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { get } from 'node:http';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.css',
})
export class ProductInformationComponent implements OnInit {
  productId: string = '';
  product: Product | undefined;
  //used to display the products in the cart

  carts: Cart[] = [];

  form: FormGroup;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId') ?? '-1';
    this.getProduct();
    this.getCart();
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  getProduct() {
    this.productService.getProduct(this.productId).subscribe((data: any) => {
      this.product = data;
      console.log(`[From Product Info Page] Get Product Successful!`);
      console.log(data);
    });
  }

  executeAction(action: string) {
    switch (action) {
      case 'ADD TO CART':
        if (this.form.valid) {
          this.addToCart(this.product!);
        }
        break;
    }
  }

  getCart() {
    this.cartService.getCarts().subscribe((data: any) => {
      this.carts = data;
      console.log(`[From Product Info Page] Get Cart Successful!`);
      console.log(this.carts);
    });
  }

  addToCart(product: Product): void {
    const cartItem: Cart = {
      id: '',
      userId: this.cartService.getCurrentUserId(),
      productId: product.id,
      productName: product.name,
      description: product.description,
      category: product.category,
      quantity: this.quantity?.value,
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

  get quantity() {
    return this.form.get('quantity');
  }
}
