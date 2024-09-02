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
  cart:Cart|undefined

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
    this.cartService.getCart().subscribe(
      (data: any) => {
        this.cart = data;
        console.log(`[From Dashboard Page] Get Cart Successful!`)
        console.log(this.cart)
      }
    )
  }

  addToCart(product:Product){
    if(product.status === "Added"){
      //If add to cart pero nasa cart na siya, add nalang ung quantity of the product in the cart.
    }
    else{
      product.status = "Added"
      //I was thinking add the product once lang sa cart
    }
    //For now, just adding just 1 product sa cart every click even if duplicate.
    this.cart?.products.push(product);
    console.log(product)
    this.updateCart()
  }

  updateCart(){
    if (this.cart) {
      this.cartService.updateCart(this.cart).subscribe((data) => {
        console.log(`[From Dashboard Page] Update Cart Successful!`)
        console.log(data);
      });
      this.getCart()
    } else {
      console.error('Cart is not defined.');
    }
  }

}
