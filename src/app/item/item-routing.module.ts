import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item.component';

const routes: Routes = [
  {
    path: "",
    component: ItemComponent,
    children: [
      { path: "list", component: ItemListComponent },
      { path: "add", component: ItemDetailsComponent },
      { path: "update/:id", component: ItemDetailsComponent },
    ]
  }


];

export const ItemRoutedComponents = [
  ItemComponent
];

export const ItemRouting = RouterModule.forChild(routes);
