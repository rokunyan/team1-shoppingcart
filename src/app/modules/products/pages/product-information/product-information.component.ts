import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../cart/services/cart.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.css'
})
export class ProductInformationComponent implements OnInit {
  productId:string = ''
  product:Product|undefined
  //used to display the products in the cart
  carts:Cart[] = []
  
  form = new FormGroup({
    quantity: new FormControl(1) // Initialize with a default value
  })

  ngOnInit(): void {
      this.productId = this.route.snapshot.paramMap.get('productId')?? '-1'
      this.getProduct()
      this.getCart()
  }
   
  constructor(private productService:ProductService, private cartService:CartService, private route:ActivatedRoute){
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
        this.addToCart(this.product!);
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
      id: (this.carts.length + 1).toString(),
      userId: '1',
      productId: product.id,
      productName: product.name,
      description: product.description,
      category: product.category,
      quantity: 1,
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

}
