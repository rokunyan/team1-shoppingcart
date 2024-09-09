import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input('productsInput') product:Product|undefined
  @Output() actionEmitter = new EventEmitter()
  
  form:FormGroup

  constructor(private formBuilder:FormBuilder){
    this.form = this.formBuilder.group({
      quantity:[1, [Validators.required, Validators.min(1)]]
    })
  }
  executeAction = (data:any, action:string) => {
    switch(action){
      case 'ADD TO CART':
      let quantity = this.form.get('quantity')?.value
      if(this.form.valid){
        this.actionEmitter.emit({data, action, quantity})
      }
      break
    }
  }

  get quantity(){
    return this.form.get('quantity');
  }
}
