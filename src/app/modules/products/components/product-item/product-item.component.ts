import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input('productsInput') products:Product[]|undefined
  @Output() actionEmitter = new EventEmitter()
  

  executeAction = (data:Product, action:string) => {
    switch(action){
      case 'ADD TO CART':
      this.actionEmitter.emit({data, action})
      break
    }
  }
}
