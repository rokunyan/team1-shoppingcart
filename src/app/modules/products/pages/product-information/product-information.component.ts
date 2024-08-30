import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.css'
})
export class ProductInformationComponent implements OnInit {
  productId:string = ''
  product:Product[] = []
  //used to display the products in the cart
  cart:Cart|undefined
  
  ngOnInit(): void {
      this.productId = this.route.snapshot.paramMap.get('productId')?? '-1'
      this.getProduct()
      this.getCart()
  }
   
  constructor(private productService:ProductService, private cartService:CartService, private route:ActivatedRoute){
  }
  getProduct(){
    this.productService.getProduct(this.productId).subscribe(
      (data: any) => {
        this.product.push(data);
        console.log(`[From Product Info Page] Get Product Successful!`)
        console.log(data)
      })
  }

  executeAction(event: {data: Product, action: string }) {
    switch(event.action){
      case 'ADD TO CART':
        this.addToCart(event.data)
      break;
    }
  }


  getCart(){
    this.cartService.getCart().subscribe(
      (data: any) => {
        this.cart = data;
        console.log(`[From Product Info Page] Get Cart Successful!`)
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
        console.log(`[From Product Info Page] Update Cart Successful!`)
        console.log(data);
      });
      this.getCart()
    } else {
      console.error('Cart is not defined.');
    }
  }

}
