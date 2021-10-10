import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceComponent } from './invoice.component';

export const routes: Routes = [
  {
    path: "",
    component: InvoiceComponent,
    children: [
      { path: "list", component: InvoiceListComponent },
      { path: "add", component: InvoiceDetailsComponent },
      { path: "update/:id", component: InvoiceDetailsComponent },
    ]
  }

];

export const InvoiceRoutedComponents = [
  InvoiceComponent
];

export const InvoiceRouting = RouterModule.forChild(routes);
