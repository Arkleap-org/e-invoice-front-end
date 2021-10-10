import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemRoutedComponents, ItemRouting } from './item-routing.module';



@NgModule({
  declarations: [
    ItemComponent,
    ItemRoutedComponents,
    ItemListComponent,
    ItemDetailsComponent
  ],
  imports: [
    CommonModule,
    ItemRouting
  ]
})
export class ItemModule { }
