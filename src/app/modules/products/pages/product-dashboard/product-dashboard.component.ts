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
  products:Product[] = []

  //used to display the products in the cart
  carts:Cart[] = []

  constructor(private productService:ProductService, private cartService: CartService){
    
  }
  ngOnInit(): void {
    this.getProducts()
    this.getCart()
  }
  
  executeAction(event: {data: Product, action: string }) {
    switch(event.action){
      case 'ADD TO CART':
        this.addToCart(event.data)
      break;
    }
  }
  
  getProducts(){
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        console.log(`[From Dashboard Page] Get Products Successful!`)
        console.log(this.products)
      })
  }

  getCart(){
    this.cartService.getCarts().subscribe(
      (data: any) => {
        this.carts = data;
        console.log(`[From Dashboard Page] Get Cart Successful!`)
        console.log(this.carts)
      }
    )
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
  
    addToCart(product: Product): void {
      let cartSize =  this.carts.length + 1;
      
      const cartItem = {
        id: cartSize.toString(),
         userId: "1", 
         productId: product.id,
         productName: product.name,
         description: product.description,
         category: product.category, 
         quantity: product.quantity, 
         price: product.price,
         status: "added", 
         image: product.image,
         };
      this.cartService.addItemToCart(cartItem).subscribe(
        item => {
          console.log('Item added to cart:', item);
        },
      )
    }

}
