import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { IssuerComponent } from './issuer/issuer.component';
import { ItemDetailsComponent } from './item/item-details/item-details.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "issuer",
        component: IssuerComponent
      },
      {
        path: "user",
        component: AddUserComponent
      },

      { path: "item/list", component: ItemListComponent },
      { path: "item/add", component: ItemDetailsComponent },
      { path: "item/update/:id", component: ItemDetailsComponent },

      { path: "invoice/list", component: InvoiceListComponent },
      { path: "invoice/add", component: InvoiceDetailsComponent },
      { path: "invoice/update/:id", component: InvoiceDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
