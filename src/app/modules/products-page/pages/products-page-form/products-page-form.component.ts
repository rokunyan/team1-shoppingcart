import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsPageService } from '../../service/products-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../products/models/product';

@Component({
  selector: 'app-products-page-form',
  templateUrl: './products-page-form.component.html',
  styleUrl: './products-page-form.component.css',
})
export class ProductsPageFormComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  productId?: string;
  sub: Subscription | undefined;
  imageSrc: string | null = null;

  categories = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Fiction Book', label: 'Books' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Beauty', label: 'Beauty' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Toys', label: 'Toys' },
    { value: 'Accessories', label: 'Accessories' },
    { value: 'Automotive', label: 'Automotive' },
    { value: 'Jewelry', label: 'Jewelry' },
  ];

  constructor(
    private fb: FormBuilder,
    private productsPageService: ProductsPageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      status: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      itemsSold: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.productId) {
      const product = this.productsPageService
        .getProductById(this.productId)
        .subscribe({
          next: (product: Product) => {
            this.productForm.patchValue({
              name: product.name,
              description: product.description,
              category: product.category,
              quantity: product.quantity,
              price: product.price,
              status: product.status,
              image: product.image,
              itemsSold: product.itemsSold,
            });
            this.imageSrc = product.image;
          },
        });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const product: Product = {
        id: this.productId || '',
        name: formValue.name,
        description: formValue.description,
        category: formValue.category,
        quantity: formValue.quantity,
        price: formValue.price,
        status: formValue.status,
        image: formValue.image,
        itemsSold: formValue.itemsSold,
      };

      if (this.productId) {
        const request = this.productsPageService.updateProduct(product);
        request.subscribe({
          next: () => {
            this.router.navigate(['/products-page']);
          },
        });
      } else {
        this.productsPageService.getMaxId().subscribe({
          next: (maxId: number) => {
            const newId: string = (maxId + 1).toString();
            product.id = newId;
            this.productsPageService.addProduct(product).subscribe({
              next: () => {
                this.router.navigate(['/products-page']);
              },
            });
          },
        });
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onClear(): void {
    this.productForm.reset({
      name: '',
      description: '',
      category: '',
      quantity: '',
      price: '',
      status: '',
      image: '',
      itemsSold: '',
    });
  }

  onCancel(): void {
    this.router.navigate(['/products-page']);
  }
}
