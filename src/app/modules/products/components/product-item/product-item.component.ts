import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input('productsInput') product:Product|undefined
  @Output() actionEmitter = new EventEmitter()
  
  form:FormGroup

  constructor(private formBuilder:FormBuilder, private toastr:ToastrService){
    this.form = this.formBuilder.group({
      quantity:[1, [Validators.required, Validators.min(1)]]
    })
  }
  executeAction = (data:any, action:string) => {
    switch(action){
      case 'ADD TO CART':
      let quantity = this.form.get('quantity')?.value
      if(!this.form.valid){
        this.toastr.error(
          `Quantity inserted should at least be 1`, 
          'Error!', {
          progressBar: true,
          timeOut: 5000
        });
      }
      else if(quantity > this.product!.quantity){
        this.toastr.error(
          `Quantity exceeds product's stock (${this.product!.name}'s stock: ${this.product!.quantity})`, 
          'Error!', {
          progressBar: true,
          timeOut: 5000
        });
      }
      else{
        this.actionEmitter.emit({data, action, quantity})
      }
      break
    }
  }

  get quantity(){
    return this.form.get('quantity');
  }
}
