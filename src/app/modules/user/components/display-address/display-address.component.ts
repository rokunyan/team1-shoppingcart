import { Component, Input } from '@angular/core';
import { Deliveryaddress } from '../../models/deliveryaddress';

@Component({
  selector: 'app-display-address',
  templateUrl: './display-address.component.html',
  styleUrl: './display-address.component.css'
})
export class DisplayAddressComponent {
  @Input(`deliveryAddress`) deliveryAddress!: Deliveryaddress;
}
