import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full", title: "Products" },
  { path: "home", loadComponent: () => import("./pages/home/home.component").then(c => c.HomeComponent), title: "Home" },
  { path: "products", loadComponent: () => import("./pages/products/products.component").then(c => c.ProductsComponent), title: "Products" },
  { path: "cart", loadComponent: () => import("./pages/cart/cart.component").then(c => c.CartComponent), title: "Cart" },
  {
    path: 'details/:id',
    loadComponent: () => import('./pages/datails/datails/datails.component').then(m => m.DatailsComponent),
    title: 'Details'
  },
  { path: "**", loadComponent: () => import("./pages/not-found/not-found.component").then(c => c.NotFoundComponent), title: "Not found !!!" },
];
