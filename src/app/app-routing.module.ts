import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './@pages/categories/category-list/category-list.component';
import { CategoryAddComponent } from './@pages/categories/category-add/category-add.component';
import { CategoryEditComponent } from './@pages/categories/category-edit/category-edit.component';
import { ProductListComponent } from './@pages/products/product-list/product-list.component';
import { ProductAddComponent } from './@pages/products/product-add/product-add.component';
import { ProductEditComponent } from './@pages/products/product-edit/product-edit.component';

const routes: Routes = [
  { path: '', component:ProductListComponent },
  { path: 'add-product', component: ProductAddComponent },
  { path: 'edit-product/:id', component: ProductEditComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'add-category', component: CategoryAddComponent },
  { path: 'edit-category/:id', component: CategoryEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
