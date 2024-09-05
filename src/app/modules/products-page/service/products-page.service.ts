import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Product } from '../../products/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsPageService {
  private serverUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.serverUrl)
      .pipe(tap((products) => console.log('Fetched products:', products)));
  }

  getProductById(id: string): Observable<Product> {
    const url = `${this.serverUrl}/${id}`;
    return this.http
      .get<Product>(url)
      .pipe(tap((product) => console.log('Fetched product:', product)));
  }

  deleteItemFromProducts(id: string): Observable<Product> {
    const url = `${this.serverUrl}/${id}`;
    return this.http
      .delete<Product>(url)
      .pipe(tap(() => console.log(`Deleted cart ${id}`)));
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    const url = `${this.serverUrl}/${updatedProduct.id}`;
    return this.http
      .put<Product>(url, updatedProduct)
      .pipe(
        tap((product: Product) =>
          console.log(`Updated product ${updatedProduct.id} `, product)
        )
      );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.serverUrl, product)
      .pipe(
        tap((newProduct: Product) =>
          console.log('Adding a product ', newProduct)
        )
      );
  }

  getMaxId(): Observable<number> {
    return this.getProducts().pipe(
      map((products) => {
        if (products.length === 0) return 0;
        return Math.max(...products.map((product) => parseInt(product.id, 10)));
      })
    );
  }
}
