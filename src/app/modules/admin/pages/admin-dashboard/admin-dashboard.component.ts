import { Component, OnInit } from '@angular/core';
import { Product } from '../../../products/models/product';
import { ProductService } from '../../../products/services/product.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{



  products:Product[] = []
  topSales:Product[] = []
  constructor(private productService:ProductService){}

  ngOnInit(): void {
    console.log(`[From Admin Dashboard] Getting Products...`)
    this.productService.getProducts().subscribe((data:any) =>{
      this.products = data;
      console.log('[From Adming Dashboard] Get Products Complete!')
      console.log(`${this.products}`)
      this.setTopProductSales()
    })
  }

  setTopProductSales(){
    let filteredProducts = this.products.sort((a, b) => {
      let multipleB = b.price * b.itemsSold;
      let multipleA = a.price * a.itemsSold;
    
      return multipleB - multipleA;
    });
    
    this.topSales = filteredProducts
    console.log(filteredProducts)
  }
}
