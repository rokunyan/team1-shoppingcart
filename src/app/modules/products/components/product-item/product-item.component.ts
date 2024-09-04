import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input('productsInput') product:Product|undefined
  @Output() actionEmitter = new EventEmitter()
  
  form = new FormGroup({
    quantity: new FormControl(1) // Initialize with a default value
  });

  executeAction = (data:any, action:string) => {
    switch(action){
      case 'ADD TO CART':
      let quantity = this.form.get('quantity')?.value
      this.actionEmitter.emit({data, action, quantity})
      break
    }
  }
}
