import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { userGuard } from './core/guards/user.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/products/products.module').then(
        (m) => m.ProductsModule
      ),
    canActivate: [userGuard],
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [adminGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [loginGuard],
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
    canActivate: [userGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart.module').then((m) => m.CartModule),
    canActivate:[userGuard]
  },
  {
    path: 'admin-page',
    loadChildren: () =>
      import('./modules/admin-page/admin-page.module').then(
        (m) => m.AdminPageModule
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'products-page',
    loadChildren: () =>
      import('./modules/products-page/products-page.module').then(
        (m) => m.ProductsPageModule
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'order-history',
    loadChildren: () =>
      import('./modules/transactions/transactions.module').then(
        (m) => m.TransactionsModule
      ),
    canActivate: [userGuard],
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./modules/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
    canActivate: [userGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
