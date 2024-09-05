import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { Cart } from '../../../cart/model/cart';
import { filter } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { numericValidator } from '../../validators/custom.validator';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent implements OnInit{

  productForm:FormGroup;

  //used to diplay the available products
  products: Product[] = [];

  //used to display the products in the cart
  carts: Cart[] = [];

  //used for search filters
  searchModel = {
      productNameQuery: '',
      productCategoryQuery: '',
      productMinCost: 0,
      productMaxCost: 0,
      sortByType: ''
  }
  
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      productNameQuery: '',
      productCategoryQuery: '',
      productMinCost: [0, numericValidator()],
      productMaxCost: [0, numericValidator()],
    })
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCart();
  }

  executeAction(event: { data: Product; action: string, quantity:number }) {
    switch (event.action) {
      case 'ADD TO CART':
        this.addToCart(event.data, event.quantity);
        break;
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = data;
      console.log(`[From Dashboard Page] Get Products Successful!`);
      console.log(this.products);
    });
  }

  getCart() {
    this.cartService.getCarts().subscribe((data: any) => {
      this.carts = data;
      console.log(`[From Dashboard Page] Get Cart Successful!`);
      console.log(this.carts);
    });
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

  addToCart(product: Product, quantity:number): void {
    const cartItem: Cart = {
      id: (this.carts.length + 1).toString(),
      userId: this.cartService.getCurrentUserId(),
      productId: product.id,
      productName: product.name,
      description: product.description,
      category: product.category,
      quantity: quantity,
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

  onSearch(searchType: String) {
    switch(searchType){
      case "NAME":
        if (this.searchModel.productNameQuery) {
          this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(this.searchModel.productNameQuery.toLowerCase())
          );
        } else {
          this.filteredProducts = [...this.products]; // Reset to all items if search query is empty
        }
        break;
      case "CATEGORY":
        if (this.searchModel.productCategoryQuery) {
          this.filteredProducts = this.products.filter(product =>
            product.category.toLowerCase().includes(this.searchModel.productCategoryQuery.toLowerCase())
          );
        } else {
          this.filteredProducts = [...this.products]; // Reset to all items if search query is empty
        }
        break;
      case "COST":
        if((this.searchModel.productMinCost || this.searchModel.productMaxCost) && 
        this.searchModel.productMinCost <= this.searchModel.productMaxCost){
          const min = this.searchModel.productMinCost
          const max = this.searchModel.productMaxCost
          this.filteredProducts = this.products.filter(product =>
            min <= product.price && product.price <= max 
          );
        }
        else{
          this.filteredProducts = [...this.products]; // Reset to all items if price range filter is empty
        }
        break;
    }
    this.checkForExistingFilters()
  }

  onSortBy(){
    switch(this.searchModel.sortByType){
      case 'ASCENDING NAME':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
        break;
      case 'DESCENDING NAME':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }))
        break;
      case 'ASCENDING PRICE':
        this.filteredProducts.sort((a,b) =>  a.price - b.price)
        break;
      case 'DESCENDING PRICE':
        this.filteredProducts.sort((a,b) =>  b.price - a.price)
        break;
      default:
        this.filteredProducts.sort((a,b) =>  parseInt(a.id) - parseInt(b.id))
        break;
    }
    this.checkForExistingFilters()
  }

  checkForExistingFilters() {
    
    if (this.searchModel.productNameQuery) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchModel.productNameQuery.toLowerCase())
      );
    } 
    if (this.searchModel.productCategoryQuery) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.category.toLowerCase().includes(this.searchModel.productCategoryQuery.toLowerCase())
      );
    } 
    if((this.searchModel.productMinCost || this.searchModel.productMaxCost) && 
    this.searchModel.productMinCost <= this.searchModel.productMaxCost){
      const min = this.searchModel.productMinCost
      const max = this.searchModel.productMaxCost
      this.filteredProducts = this.filteredProducts.filter(product =>
        min <= product.price && product.price <= max 
      );
    }  
    switch(this.searchModel.sortByType){
      case 'ASCENDING NAME':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
        break;
      case 'DESCENDING NAME':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }))
        break;
      case 'ASCENDING PRICE':
        this.filteredProducts.sort((a,b) =>  a.price - b.price)
        break;
      case 'DESCENDING PRICE':
        this.filteredProducts.sort((a,b) =>  b.price - a.price)
        break;
      default:
        this.filteredProducts.sort((a,b) =>  parseInt(a.id) - parseInt(b.id))
        break;
    }
  }

  /**
   * function searchEmployee(empList, employeeName){
    let employee  = empList.find(obj => obj['employee']  && obj['employee'].includes(employeeName));
    if(employee){
        return true;
    }
    return false;
  }
   */
}
