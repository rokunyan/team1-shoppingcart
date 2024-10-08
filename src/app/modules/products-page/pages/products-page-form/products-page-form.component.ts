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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-page-form',
  templateUrl: './products-page-form.component.html',
  styleUrls: ['./products-page-form.component.css'],
})
export class ProductsPageFormComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  productId?: string;
  sub: Subscription | undefined;
  imageSrc: string | null = null;
  selectedFile: File | null = null;
  fileName: string | null = null;

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

  statuses = [
    {
      value: 'Available',
      label: 'Available',
    },
    {
      value: 'Out of Stock',
      label: 'Out of Stock',
    },
  ];
  constructor(
    private fb: FormBuilder,
    private productsPageService: ProductsPageService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
      category: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      status: new FormControl('', Validators.required),
      itemsSold: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.productId) {
      this.sub = this.productsPageService
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
              itemsSold: product.itemsSold,
            });
            this.imageSrc = product.image;
            this.productForm.get('itemsSold')?.enable();
          },
        });
    } else {
      this.productForm.patchValue({
        itemsSold: 0,
      });
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
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
        image: this.imageSrc || '',
        itemsSold: formValue.itemsSold,
      };

      if (this.productId) {
        this.productsPageService.updateProduct(product).subscribe({
          next: () => this.router.navigate(['/products-page']),
          error: (err) => console.error('Update failed', err),
        });
        this.toastr.success(
          `${product.name} has been updated.`,
          'Updated Product!',
          {
            progressBar: true,
            timeOut: 5000,
          }
        );
      } else {
        this.productsPageService.getMaxId().subscribe({
          next: (maxId: number) => {
            const newId: string = (maxId + 1).toString();
            product.id = newId;
            this.productsPageService.addProduct(product).subscribe({
              next: () => this.router.navigate(['/products-page']),
              error: (err) => console.error('Add failed', err),
            });
          },
          error: (err) => console.error('Failed to get max ID', err),
        });
        this.toastr.success(
          `${product.name} has been added to product list.`,
          'Added to Product List!',
          {
            progressBar: true,
            timeOut: 5000,
          }
        );
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
      itemsSold: '',
    });
    this.imageSrc = null;
    this.selectedFile = null;
    this.fileName = null;
  }

  onCancel(): void {
    this.router.navigate(['/products-page']);
  }
}
