import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceRoutedComponents, InvoiceRouting } from './invoice-routing.module';



@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceRoutedComponents,
    InvoiceListComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    CommonModule,
    InvoiceRouting
  ]
})
export class InvoiceModule { }
